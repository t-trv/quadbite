# Food Ordering App 🍕

Ứng dụng đặt món ăn trực tuyến với đầy đủ tính năng quản lý menu, đặt hàng và quản trị viên.

## 🛠 Công nghệ

### Backend

- Node.js + Express.js
- Prisma ORM + MySQL
- JWT Authentication

### Frontend

- React 19 + Vite
- React Router DOM
- TanStack Query
- Tailwind CSS

## 🚀 Cài đặt

### Backend

```bash
cd backend
npm install
# Tạo file .env và cấu hình DATABASE_URL, JWT_SECRET
npx prisma generate
npx prisma db push
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## 📝 Tính năng

- Đăng ký/Đăng nhập
- Duyệt món ăn theo danh mục
- Xem chi tiết món ăn với biến thể
- Thêm vào giỏ hàng và đặt hàng
- Quản trị viên: Quản lý menu, đơn hàng, người dùng
