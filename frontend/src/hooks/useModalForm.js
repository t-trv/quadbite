import { useState } from "react";
import { useForm } from "react-hook-form";

const useModalForm = ({ submitFn }) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const openModal = (defaultValues = {}) => {
    setIsOpen(true);
    reset(defaultValues);
  };

  const closeModal = () => {
    setIsOpen(false);
    reset(); // reset form khi đóng modal
  };

  const onSubmit = async (data) => {
    await submitFn(data);
    closeModal();
  };

  return {
    isOpen,
    openModal,
    closeModal,

    register,
    errors,
    control,
    onSubmit,
    handleSubmit,
  };
};

export default useModalForm;
