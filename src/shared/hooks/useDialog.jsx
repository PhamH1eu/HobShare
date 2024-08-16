import React from "react";

const useDialog = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isOpen = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return {
    anchorEl,
    isOpen,
    handleOpen,
    handleClose,
  };
};

export default useDialog;
