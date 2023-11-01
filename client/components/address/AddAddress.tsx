"use client";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Modal,
  TextField,
} from "@mui/material";
import { post } from "../../services/axiosAPI";
import { getUser } from "../../util/commonFunctions";

type errorType = {
  required?: string;
  pattern?: {
    value?: any;
    message?: string;
  };
};

type customTextFieldType = {
  fieldLabel: string;
  fieldName: string;
  error?: errorType;
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
};

const AddAddress = forwardRef(({ loadData }: any, ref) => {
  const [openAddressModal, setOpenAddressModal] = useState(false);

  useImperativeHandle(ref, () => ({
    handleOpen() {
      handleOpenAddressModal();
    },
    setValues(field: string, value: any) {
      setValue(field, value);
    },
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const handleOpenAddressModal = () => {
    setOpenAddressModal(true);
  };
  const handleCloseAddressModal = () => {
    setOpenAddressModal(false);
    reset();
  };

  const onSubmit = (data: any) => {
    try {
      const userData = getUser();
      const payload = { ...data, userId: userData.id };
      post("/address/add", payload).then((response) => {
        if (
          Object.keys(response?.data)?.length > 0 ||
          response.status === 200
        ) {
          setTimeout(() => {
            handleCloseAddressModal();
            loadData();
          }, 500);
        }
      });
    } catch (error) {
      console.error("Error add address data:", error);
    }
  };

  return (
    <Modal open={openAddressModal} onClose={handleCloseAddressModal}>
      <Box sx={modalStyle}>
        <div className="flex justify-between">
          <b className="text-xl">Enter delivery address</b>
          <div className="cursor-pointer" onClick={handleCloseAddressModal}>
            <CloseIcon />
          </div>
        </div>
        <hr className="mt-1" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-2">
            <TextField
              fullWidth
              label="Name"
              variant="standard"
              {...register("name", {
                required: "Please enter name",
                pattern: {
                  value: /^[a-zA-Z ]*$/,
                  message: "Oops! Please enter a valid name",
                },
              })}
            />
            {errors.name && (
              <span className="text-red-500">
                {errors.name?.message?.toString()}
              </span>
            )}
          </div>
          <div className="mt-2">
            <TextField
              fullWidth
              label="Mobile"
              variant="standard"
              {...register("mobile", {
                required: "Please enter mobile number",
                pattern: {
                  value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                  message: "Oops! Please enter a valid mobile number",
                },
              })}
            />
            {errors.mobile && (
              <span className="text-red-500">
                {errors.mobile?.message?.toString()}
              </span>
            )}
          </div>
          <div className="mt-2">
            <TextField
              fullWidth
              label="Address line 1"
              variant="standard"
              {...register("address_line1", {
                required: "Please enter Address line 1",
                pattern: {
                  value: /^[a-z0-9]+$/i,
                  message: "Oops! Please enter a valid Address line 1",
                },
              })}
            />
            {errors.address_line1 && (
              <span className="text-red-500">
                {errors.address_line1?.message?.toString()}
              </span>
            )}
          </div>
          <div className="mt-2">
            <TextField
              fullWidth
              label="Address line 2"
              variant="standard"
              {...register("address_line2")}
            />
          </div>
          <div className="mt-2">
            <TextField
              fullWidth
              label="Landmark"
              variant="standard"
              {...register("landmark")}
            />
          </div>
          <div className="mt-2">
            <TextField
              fullWidth
              label="Pincode"
              variant="standard"
              {...register("pincode", {
                required: "Please enter pincode",
                pattern: {
                  value: /^[a-z0-9]+$/i,
                  message: "Oops! Please enter a valid mobile number",
                },
              })}
            />
            {errors.pincode && (
              <span className="text-red-500">
                {errors.pincode?.message?.toString()}
              </span>
            )}
          </div>

          <div className="mt-2">
            <FormControlLabel
              control={<Checkbox {...register("default_address")} />}
              label="Make this my default address"
            />
          </div>

          <div className="text-center">
            <button
              className="rounded-md bg-slate-800 text-white w-64 h-10 mt-5"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </Box>
    </Modal>
  );
});
export default AddAddress;
