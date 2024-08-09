import { useState } from "react";

const useEditableText = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);
  const [show, setShow] = useState(true);

  const handleToggle = () => {
    setShow(!show);
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return {
    value,
    isEditing,
    show,
    handleEdit,
    handleChange,
    handleSave,
    handleToggle,
  };
};

export default useEditableText;