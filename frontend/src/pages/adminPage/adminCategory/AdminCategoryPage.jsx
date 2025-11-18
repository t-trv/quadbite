import Table from "../../../components/table/Table";
import Title from "../../../components/ui/Title";
import Button from "../../../components/ui/Button";
import Modal from "../../../components/modal/Modal";
import ConfirmModal from "../../../components/modal/ConfirmModal";

import { useTableData } from "../../../hooks/useTableData";
import useModalForm from "../../../hooks/useModalForm";
import useMainCategories from "../../../hooks/useMainCategories";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import apiRequest from "../../../utils/apiRequest";
import toast from "react-hot-toast";
import TablePagination from "../../../components/table/TablePagination";
import { PlusIcon } from "lucide-react";

const AdminCategoryPage = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);
  const queryClient = useQueryClient();
  // get main categories
  const { mainCategories } = useMainCategories();

  // Set up table
  const {
    data: sideCategories,
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
  } = useTableData("/categories/side");

  // Setup add category modal
  const addCategoryModal = useModalForm({
    submitFn: async (data) => {
      try {
        const res = await apiRequest.post("/categories/side", data);
        if (res.data.status === true) {
          queryClient.invalidateQueries({ queryKey: ["/categories/side"] });
          toast.success("Thêm danh mục thành công");
        } else {
          toast.error("Thêm danh mục thất bại");
        }
      } catch (error) {
        toast.error("Thêm danh mục thất bại");
        console.log(error);
      }
    },
  });

  // Setup update category modal
  const updateCategoryModal = useModalForm({
    submitFn: async (data) => {
      try {
        const res = await apiRequest.put(`/categories/side/${data.id}`, data);
        if (res.data.status === true) {
          queryClient.invalidateQueries({ queryKey: ["/categories/side"] });
          toast.success("Cập nhật danh mục thành công");
        } else {
          toast.error("Cập nhật danh mục thất bại");
        }
      } catch (error) {
        toast.error("Cập nhật danh mục thất bại");
        console.log(error);
      }
    },
  });

  // Setup delete category
  const handleDeleteCategory = async () => {
    try {
      const res = await apiRequest.delete(`/categories/side/${categoryIdToDelete}`);
      if (res.data.status === true) {
        queryClient.invalidateQueries({ queryKey: ["/categories/side"] });
        toast.success("Xóa danh mục thành công");
      } else {
        toast.error("Xóa danh mục thất bại");
      }
    } catch (error) {
      toast.error("Xóa danh mục thất bại");
      console.log(error);
    } finally {
      setShowConfirmModal(false);
      setCategoryIdToDelete(null);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-white p-4 rounded-3xl h-full">
      <Title title="Quản lý danh mục" variant="secondary" />

      <div className="py-4">
        <Table
          data={sideCategories}
          onSort={handleSort}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          columns={[
            { key: "id", label: "ID" },
            { key: "name", label: "Tên" },
            { key: "main_category_id", label: "Danh mục chính", render: (item) => item.main_category_id },
            {
              key: "action",
              label: "Hành động",
              render: (item) => (
                <div className="flex gap-2">
                  <Button
                    variant="update-btn"
                    size="small"
                    onClick={() =>
                      updateCategoryModal.openModal({
                        id: item.id,
                        name: item.name,
                        mainCategoryId: item.main_category_id,
                      })
                    }
                  >
                    Sửa
                  </Button>
                  <Button
                    variant="delete-btn"
                    size="small"
                    onClick={() => {
                      setCategoryIdToDelete(item.id);
                      setShowConfirmModal(true);
                    }}
                  >
                    Xóa
                  </Button>
                </div>
              ),
            },
          ]}
        />
      </div>

      {/* Function buttons */}
      <div className="flex justify-between items-center gap-2">
        <Button
          variant="outline"
          size="small"
          onClick={() => addCategoryModal.openModal({})}
          icon={<PlusIcon className="w-4 h-4" />}
        >
          Thêm danh mục
        </Button>

        <TablePagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>

      {/* Add category modal */}
      <Modal
        text={{ title: "Thêm danh mục", cancelText: "Hủy", submitText: "Thêm" }}
        fields={[
          {
            label: "ID danh mục",
            name: "id",
            type: "text",
            colSpan: 2,
            valid: {
              required: "ID danh mục là bắt buộc",
              pattern: {
                value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                message: "Slug chỉ được chứa chữ thường, số và dấu gạch ngang, không bắt đầu/kết thúc bằng dấu '-'",
              },
            },
          },
          {
            label: "Tên danh mục",
            name: "name",
            type: "text",
            colSpan: 2,
            valid: { required: "Tên danh mục là bắt buộc" },
          },
          {
            label: "Danh mục chính",
            name: "mainCategoryId",
            type: "select",
            placeholder: "Chọn danh mục chính",
            options: mainCategories?.map((category) => ({ label: category.name, value: category.id })),
            valid: {
              required: "Danh mục chính là bắt buộc",
            },
          },
        ]}
        modal={addCategoryModal}
      />

      {/* Update category modal */}
      <Modal
        text={{ title: "Cập nhật danh mục", cancelText: "Hủy", submitText: "Cập nhật" }}
        fields={[
          {
            label: "ID danh mục",
            name: "id",
            type: "text",
            readOnly: true,
            valid: { required: "ID danh mục là bắt buộc" },
          },
          { label: "Tên danh mục", name: "name", type: "text", valid: { required: "Tên danh mục là bắt buộc" } },
          {
            label: "Danh mục chính",
            name: "mainCategoryId",
            type: "select",
            placeholder: "Chọn danh mục chính",
            options: mainCategories?.map((category) => ({ label: category.name, value: category.id })),
          },
        ]}
        modal={updateCategoryModal}
      />

      <ConfirmModal
        open={showConfirmModal}
        title="Xóa danh mục"
        message="Bạn có chắc chắn muốn xóa danh mục này không?"
        onConfirm={() => handleDeleteCategory(categoryIdToDelete)}
        onCancel={() => setShowConfirmModal(false)}
      />
    </div>
  );
};

export default AdminCategoryPage;
