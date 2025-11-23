import prisma from "../libs/prisma.js";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export const chatWithChatbot = async (req) => {
  const { message, historyMessages } = req.body;

  // lấy dữ liệu history messages
  const historyMessagesData = historyMessages?.map((message) => `${message.role}: ${message.content}`);
  const historyMessagesString = historyMessagesData?.join("\n");

  // lấy dữ liệu món ăn
  const foodData = await prisma.foods.findMany({
    select: {
      name: true,
      price: true,
      preparation_time: true,
      description: true,
      image_url: true,
      slug: true,
      short_description: true,
      side_categories: {
        include: {
          main_categories: true,
        },
      },
      food_variants: {
        include: {
          variants: true,
        },
      },
    },
  });
  const foodDataString = foodData
    .map(
      (food) =>
        `
      Tên món: ${food.name}
      Giá: ${food.price} VNĐ
      Mô tả ngắn: ${food.short_description}
      Thời gian chuẩn bị: ${food.preparation_time} phút
      Mô tả: ${food.description}
      Ảnh: ${food.image_url}
      Danh mục: ${food.side_categories.main_categories.id}
      Biến thể(size): ${food.food_variants
        .map((variant) => `${variant.variants.name} - ${variant.variants.price_adjust} VNĐ`)
        .join(", ")}`
    )
    .join("\n");

  console.log(foodDataString);

  // lấy dữ liệu đơn hàng
  const orderData = await prisma.orders.findMany({
    where: {
      user_id: req.token_userId,
    },
    include: {
      order_items: {
        include: {
          foods: true,
          variants: true,
        },
      },
      order_statuses: true,
      payment_statuses: true,
      payment_method: true,
      addresses: true,
      users: true,
    },
  });
  const orderDataString = orderData
    .map(
      (order) =>
        `
      ID đơn hàng: ${order.id}
      Tổng tiền: ${order.total_price} VNĐ
      Trạng thái đơn hàng: ${order.order_statuses.name}
      Phương thức thanh toán: ${order.payment_method.name}
      Địa chỉ: ${order.addresses.address_name}
      Tên nhận: ${order.addresses.receiption_name}
      Số điện thoại: ${order.addresses.phone}
      Đường: ${order.addresses.address_line}
      Thành phố: ${order.addresses.city}
      Quận: ${order.addresses.district}
      Người dùng: ${order.users.name}
      Username: ${order.users.username}
      Món ăn: ${order.order_items
        .map(
          (item) => `${item.foods.name} - ${item.variants.name} - Số lượng: ${item.quantity} - Giá: ${item.price} VNĐ`
        )
        .join("\n")}`
    )
    .join("\n");

  // lấy dữ liệu người dùng
  const userData = await prisma.users.findFirst({
    where: {
      id: req.token_userId,
    },
  });
  const userDataString = `
  ID người dùng: ${req.token_userId}
  Tên: ${userData.name}
  Username: ${userData.username}
  Email: ${userData.email}
  Số điện thoại: ${userData.phone}`;

  // Xử lý call API của Google và chèn RAG
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
  Bạn là nhân viên tư vấn bán hàng cho QuadBite - một cửa hàng bán món ăn ngon và chất lượng - Tên của bạn là Huỳnh Phương Nhi.
  Yêu cầu: 
  1. Bạn hãy trả lời giống như một người con gái, nhí nhảy, đáng yêu, vui vẻ.
  2. Luôn dựa vào lịch sử trò chuyện để trả lời câu hỏi của khách hàng, chỉ chào lần đầu tiên khi dữ liệu lịch sử chat rỗng.
  3. Luôn dự vào dữ liệu về người dùng để trả lời câu hỏi của khách hàng.
  4. Không chèn emoji chỉ dùng ^^, :3, =)), và các loại giống như thế
  5. LIÊN KẾT TOÀN BỘ CÁC DỮ LIỆU ĐƯỢC GỬI VÌ NÓ CÓ LIÊN QUAN ĐẾN NHAU, NGƯỜI DÙNG, ĐƠN HÀNG, MÓN ĂN, VÀ TRẢ LỜI THÔNG MINH.
  
  Trường hợp:
  1. Khách hàng hỏi về món ăn: Bạn hãy trả lời đúng với dữ liệu và độ dài vừa đủ, cho khách xem 3 món ăn nếu khách hỏi chung chung.
  2. Khách hàng muốn đặt món: Hãy hướng dẫn cho khách: Chọn danh mục món ở thanh điều hướng, chọn vào món ăn khách muốn đặt, sau đó nhấn vào nút "Đặt món" ở góc phải màn hình, khách sẽ được chuyển đến trang xác nhận, khách ấn xác nhận và theo dõi đơn hàng trong trang cá nhân của khách (Bạn hãy trả lời giống con gái, ngữ điệu tốt, vui vẻ, và hướng dẫn khách đặt món một cách dễ hiểu và dễ thực hiện.)
  3. Khách hàng muốn hỏi về đơn hàng của mình: Bạn hãy trả lời đúng với dữ liệu và độ dài vừa đủ.
  4. Khách xem đơn hàng, có thể render ảnh về món khách đặt

  Quy tắc format:
  1. Không cần dùng ký tự gì để xuống dòng, vì trong thẻ p setup bên dưới đã có (tailwind)
  1.1: List class bạn có thể tự chèn
  - text-sm cho tất cả đoạn văn
  - mb-2 cho khoảng cách dưới mỗi đoạn nếu có từ 2 phần trở lên (ví dụ: nếu có 1 đoạn ăn và 1 ảnh thì vẫn mb-2)
  - font-semibold cho từ muốn in đậm nếu có
  - text-primary cho từ muốn in màu của chính quadbite
  - text-gray-500 cho từ muốn in màu xám
  1.2: List thẻ bạn có thể tự render
  - p cho tất cả các dòng
  - thẻ span bọc những phần cần in đậm, in màu
  - thẻ img bọc những phần cần hiển thị ảnh (Khi ý của khách hàng hỏi về món ăn)
  1.3: Xử lý ảnh
  - Luôn luôn cho ảnh xuống cuối đoạn chat của bạn
  - Cấu trúc khi render ảnh
  - Đảm bảo đúng cấu trúc, kiểm tra lại trước khi phản hồi đến tôi
  - pathname sẽ là /{danh mục}/{slug}
  <div class="flex items-center gap-2 p-2 mb-2 bg-white rounded-xl border border-gray-200">
    <img src="url ảnh" alt="tên món" pathname="pathname" class="w-20 h-20 rounded-xl object-cover cursor-pointer" />
    <div class=="flex flex-col text-sm">
      <p class="font-semibold text-primary">Tên món ăn (không dài quá 20 chữ)</p>
      <p class="text-gray-500">Giá (theo format tiền Việt)</p>
      <p class="text-gray-500">Mô tả (ngắn gọn 10 chữ, nếu dài hơn 10 chữ thì không hiển thị hết)</p>
    </div>
  </div>
  Lưu ý: Không chèn ký tự xuống dòng thật (\n), Tuyệt đối chỉ trả về string HTML

  Dữ liệu về người dùng:
  ${userDataString}

  Lịch sử trò chuyện:
  ${historyMessagesString}

  Dữ liệu món ăn được lưu trữ trong cơ sở dữ liệu:
  ${foodDataString}

  Dữ liệu về đơn hàng của khách hàng:
  ${orderDataString}

  Câu hỏi của khách:
  ${message}
  `,
  });

  return response.text;
};
