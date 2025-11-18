import Title from "../../components/ui/Title";
import Button from "../../components/ui/Button";
import Table from "../../components/table/Table";
import TablePagination from "../../components/table/TablePagination";
import Modal from "../../components/modal/Modal";
import ConfirmModal from "../../components/modal/ConfirmModal";

import { useQueryClient } from "@tanstack/react-query";
import { useTableData } from "../../hooks/useTableData";
import { useState } from "react";
import useModalForm from "../../hooks/useModalForm";
import apiRequest from "../../utils/apiRequest.js";
import useSideCategories from "../../hooks/useSideCategories";
import toast from "react-hot-toast";
import { PlusIcon } from "lucide-react";

const AdminFoodPage = () => {
  const queryClient = useQueryClient();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [foodIdToDelete, setFoodIdToDelete] = useState(null);

  const handleDeleteFood = async (id) => {
    try {
      const res = await apiRequest.delete(`/foods/${id}`);
      if (res.data.status === true) {
        toast.success("Xóa món ăn thành công");
        queryClient.invalidateQueries({ queryKey: ["/foods"] });
        setOpenConfirmModal(false);
        setFoodIdToDelete(null);
      }
    } catch (error) {
      toast.error("Xóa món ăn thất bại");
      console.log(error);
      setOpenConfirmModal(false);
      setFoodIdToDelete(null);
    }
  };

  // Setup table
  const {
    data: foods,
    isLoading,
    isError,
    error,

    page,
    setPage,
    totalPages,

    search,
    setSearch,

    handleSort,
    sortColumn,
    sortDirection,
  } = useTableData("/foods");
  const columns = [
    { key: "id", label: "ID" },
    {
      key: "image_url",
      label: "Ảnh",
      render: (item) => <img src={item.image_url} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />,
    },
    { key: "name", label: "Tên món ăn" },
    { key: "side_category", label: "Danh mục", render: (item) => item.side_category.name },
    { key: "price", label: "Giá" },
    { key: "discount", label: "Giảm" },
    { key: "preparation_time", label: "Thời gian" },
    { key: "short_description", label: "Mô tả ngắn" },
    {
      key: "action",
      label: "Hành động",
      render: (item) => {
        return (
          <div className="flex gap-2">
            <Button
              variant="update-btn"
              size="small"
              onClick={() =>
                editFoodModal.openModal({
                  id: item.id,
                  name: item.name,
                  slug: item.slug,
                  sideCategoryId: item.side_category.id,
                  imageUrl: item.image_url,
                  preparationTime: item.preparation_time,
                  price: item.price,
                  discount: item.discount,
                  description: item.description,
                  shortDescription: item.short_description,
                  variantIds: item.variant_ids,
                })
              }
            >
              Sửa
            </Button>
            <Button
              variant="delete-btn"
              size="small"
              onClick={() => {
                setFoodIdToDelete(item.id);
                setOpenConfirmModal(true);
              }}
            >
              Xóa
            </Button>
          </div>
        );
      },
    },
  ];

  // Get side categories
  const { sideCategories, isLoading: isLoadingSideCategories } = useSideCategories({});

  // Setup add food modal
  const addFoodModal = useModalForm({
    submitFn: async (data) => {
      try {
        const res = await apiRequest.post("/foods", data);
        if (res.data.status === true) {
          toast.success("Thêm món ăn thành công");
          queryClient.invalidateQueries({ queryKey: ["/foods"] });
        } else {
          toast.error("Thêm món ăn thất bại");
        }
      } catch (error) {
        toast.error("Thêm món ăn thất bại");
        console.log(error);
      }
    },
  });

  // Setup edit food modal
  const editFoodModal = useModalForm({
    submitFn: async (data) => {
      try {
        const res = await apiRequest.put(`/foods/${data.id}`, data);
        if (res.data.status === true) {
          toast.success("Sửa món ăn thành công");
          queryClient.invalidateQueries({ queryKey: ["/foods"] });
        } else {
          toast.error("Sửa món ăn thất bại");
        }
      } catch (error) {
        toast.error("Sửa món ăn thất bại");
        console.log(error);
      }
    },
  });

  // Setup add food fields for add food modal
  const addFoodFields = [
    {
      name: "name",
      label: "Tên món ăn",
      type: "text",
      colSpan: 2,
      valid: {
        required: "Tên món ăn là bắt buộc",
      },
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      colSpan: 2,
      valid: {
        required: "Slug là bắt buộc",
        pattern: {
          value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/i,
          message: "Slug không hợp lệ",
        },
        validate: async (value) => {
          try {
            const response = await apiRequest.get(`/foods/check-slug?slug=${value}`);
            return response.data.exists ? "Slug đã tồn tại" : true;
          } catch (e) {
            return "Không kiểm tra được slug";
          }
        },
      },
    },
    {
      name: "sideCategoryId",
      label: "Danh mục",
      placeholder: "Chọn danh mục",
      type: "select",
      colSpan: 4,
      valid: {
        required: "Danh mục là bắt buộc",
      },
      options: sideCategories?.map((item) => ({ label: item.name, value: item.id })) || [],
    },
    {
      name: "variantIds",
      label: "Biến thể",
      placeholder: "Chọn biến thể",
      type: "multi-select",
      colSpan: 4,
      valid: {
        required: "Biến thể là bắt buộc",
      },
      options: [
        { label: "Nhỏ", value: "small" },
        { label: "Vừa", value: "medium" },
        { label: "Lớn", value: "large" },
        { label: "Rất lớn", value: "extra-large" },
      ],
    },
    {
      name: "imageUrl",
      label: "Đường link URL ảnh món ăn",
      type: "text",
      valid: {
        required: "Ảnh là bắt buộc",
      },
    },
    {
      name: "preparationTime",
      label: "Thời gian chuẩn bị",
      type: "number",
      colSpan: 2,
      valid: {
        required: "Thời gian chuẩn bị là bắt buộc",
      },
    },
    {
      name: "price",
      label: "Giá",
      type: "number",
      colSpan: 1,
      valid: {
        required: "Giá là bắt buộc",
      },
    },
    {
      name: "discount",
      label: "Giảm",
      type: "number",
      colSpan: 1,
      valid: {
        required: "Giảm là bắt buộc",
        min: {
          value: 0,
          message: "Giảm phải lớn hơn 0",
        },
        max: {
          value: 100,
          message: "Giảm phải nhỏ hơn 100",
        },
      },
    },
    {
      name: "shortDescription",
      label: "Mô tả ngắn",
      type: "text",
      valid: {
        required: "Mô tả ngắn là bắt buộc",
      },
    },
    {
      name: "description",
      label: "Mô tả",
      type: "textarea",
      valid: {
        required: "Mô tả là bắt buộc",
      },
    },
  ];

  // Setup edit food fields for edit food modal
  const editFoodFields = [
    {
      name: "name",
      label: "Tên món ăn",
      type: "text",
      valid: {
        required: "Tên món ăn là bắt buộc",
      },
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      colSpan: 2,
      valid: {
        required: "Slug là bắt buộc",
        pattern: {
          value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/i,
          message: "Slug không hợp lệ",
        },
        validate: async (value) => {
          try {
            const response = await apiRequest.get(`/foods/check-slug?slug=${value}`);
            return response.data.exists ? "Slug đã tồn tại" : true;
          } catch (e) {
            return "Không kiểm tra được slug";
          }
        },
      },
    },
    {
      name: "sideCategoryId",
      label: "Danh mục",
      placeholder: "Chọn danh mục",
      type: "select",
      colSpan: 2,
      valid: {
        required: "Danh mục là bắt buộc",
      },
      options: sideCategories?.map((item) => ({ label: item.name, value: item.id })) || [],
    },
    {
      name: "variantIds",
      label: "Biến thể",
      placeholder: "Chọn biến thể",
      type: "multi-select",
      colSpan: 4,
      valid: {
        required: "Biến thể là bắt buộc",
      },
      options: [
        { label: "Nhỏ", value: "small" },
        { label: "Vừa", value: "medium" },
        { label: "Lớn", value: "large" },
        { label: "Rất lớn", value: "extra-large" },
      ],
    },
    {
      name: "imageUrl",
      label: "Đường link URL ảnh món ăn",
      type: "text",
      valid: {
        required: "Ảnh là bắt buộc",
      },
    },
    {
      name: "preparationTime",
      label: "Thời gian chuẩn bị",
      type: "number",
      colSpan: 2,
      valid: {
        required: "Thời gian chuẩn bị là bắt buộc",
      },
    },
    {
      name: "price",
      label: "Giá",
      type: "number",
      colSpan: 1,
      valid: {
        required: "Giá là bắt buộc",
      },
    },
    {
      name: "discount",
      label: "Giảm",
      type: "number",
      colSpan: 1,
      valid: {
        required: "Giảm là bắt buộc",
        min: {
          value: 0,
          message: "Giảm phải lớn hơn 0",
        },
        max: {
          value: 100,
          message: "Giảm phải nhỏ hơn 100",
        },
      },
    },
    {
      name: "description",
      label: "Mô tả",
      type: "textarea",
      valid: {
        required: "Mô tả là bắt buộc",
      },
    },

    {
      name: "shortDescription",
      label: "Mô tả ngắn",
      type: "text",
      valid: {
        required: "Mô tả ngắn là bắt buộc",
      },
    },
  ];

  // Render
  if ((isLoading, isLoadingSideCategories)) return <div>Loading...</div>;
  if (isError) return <div>Error: {isError.message}</div>;

  console.log(foods);

  return (
    <div className="bg-white p-4 rounded-3xl h-full">
      <Title title="Quản lý món ăn" variant="secondary" />

      {/* Table */}
      <div className="py-4">
        <Table
          data={foods}
          columns={columns}
          handleSort={handleSort}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
        />
        <div className="mt-4">
          <div className="flex gap-2 justify-between items-center">
            <Button
              variant="outline"
              size="small"
              onClick={() => addFoodModal.openModal({})}
              icon={<PlusIcon className="w-4 h-4" />}
            >
              Thêm món ăn
            </Button>

            <TablePagination
              page={page}
              setPage={setPage}
              totalPages={totalPages}
              search={search}
              setSearch={setSearch}
            />
          </div>
        </div>
      </div>

      <Modal
        text={{ title: "Thêm món ăn", cancelText: "Hủy", submitText: "Thêm" }}
        fields={addFoodFields}
        modal={addFoodModal}
      />
      <Modal
        text={{ title: "Sửa món ăn", cancelText: "Hủy", submitText: "Sửa" }}
        fields={editFoodFields}
        modal={editFoodModal}
      />

      <ConfirmModal
        open={openConfirmModal}
        title="Xóa món ăn"
        message="Bạn có chắc chắn muốn xóa món ăn này không?"
        onConfirm={() => handleDeleteFood(foodIdToDelete)}
        onCancel={() => setOpenConfirmModal(false)}
      />
    </div>
  );
};

export default AdminFoodPage;
