"use client";
import React, { useEffect, useRef, useState } from "react";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  getCartItems,
  getUser,
  isLoggedIn,
  saveAddressId,
} from "../../util/commonFunctions";
import { deleteApi, get } from "../../services/axiosAPI";
import AddAddress from "../../components/address/AddAddress";
import "react-loading-skeleton/dist/skeleton.css";

type AddressType = {
  id?: number;
  name: string;
  mobile: string;
  address_line1: string;
  address_line2?: string;
  landmark: string;
  pincode: string;
  default_address?: boolean;
};

const AddressComponent = () => {
  const [address, setAddress] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [defaultAddress, setDefaultAddress] = React.useState<string>("");
  const addAddressReference = useRef(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDefaultAddress((event.target as HTMLInputElement).value);
  };

  const handleDelete = (id: number) => {
    const userData = getUser();
    deleteApi(`/address/deleteAddress?userId=${userData?.id}&id=${id}`).then(
      () => {
        loadData();
      }
    );
  };

  const loadData = () => {
    try {
      if (isLoggedIn()) {
        const userData = getUser();
        get(`/address/findAll?userId=${userData?.id}`).then((response) => {
          setAddress(response?.data);
          const defaultAddressFromDb: AddressType = response?.data.find(
            (element: AddressType) => element.default_address === true
          );
          setDefaultAddress(defaultAddressFromDb?.id?.toString() || "");
          saveAddressId(defaultAddressFromDb?.id || 0);
        });
      } else {
        const cartItemsFromLocalStorage = getCartItems();
        setAddress(cartItemsFromLocalStorage);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching address data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="mt-20 p-5">
      {isLoading ? (
        <>Loading...</>
      ) : (
        <>
          <AddAddress ref={addAddressReference} loadData={loadData} />
          <b className="text-xl">Select Delivery Address</b>
          <hr className="mt-2" />
          <RadioGroup
            className="mt-2"
            value={defaultAddress}
            onChange={handleChange}
          >
            {address?.map((element: AddressType, index: number) => {
              return (
                <div key={index}>
                  <FormControlLabel
                    value={element.id}
                    onChange={() => {
                      saveAddressId(element.id || 0);
                    }}
                    control={<Radio />}
                    label={
                      <>
                        <b>{element?.name}</b> {" "} {element.address_line1}{" "}
                        {element.address_line2} {" "} {element.landmark}{" "}
                        {element.pincode}
                      </>
                    }
                  />
                  <div className="ml-8">
                    <b
                      className="text-blue-500 cursor-pointer"
                      onClick={() => {
                        const fields = [
                          "id",
                          "name",
                          "mobile",
                          "address_line1",
                          "address_line2",
                          "landmark",
                          "pincode",
                          "default_address",
                        ];

                        fields.forEach((field: string) => {
                          // @ts-ignore
                          addAddressReference?.current?.setValues(field,element[field]);
                        });
                        // @ts-ignore
                        addAddressReference?.current?.handleOpen();
                      }}
                    >
                      Edit
                    </b>{" "}
                    |{" "}
                    <b
                      className="text-blue-500 cursor-pointer"
                      onClick={() => handleDelete(element?.id || 0)}
                    >
                      Delete
                    </b>
                  </div>
                </div>
              );
            })}
          </RadioGroup>
          <div
            className="mt-5 cursor-pointer"
            onClick={() => {
              // @ts-ignore
              addAddressReference?.current?.handleOpen();
            }}
          >
            <b>
              <AddIcon /> Add a new address
            </b>
          </div>
          <hr className="m-5" />
          <div className="pl-5 pb-24 pt-0 text-center">
            <br />
            <button
              className={`${
                defaultAddress
                  ? "bg-slate-800 "
                  : " bg-slate-400 cursor-not-allowed "
              } rounded-md text-white w-64 h-10`}
              onClick={() => {
                if (defaultAddress) {
                  window.location.href = "/payment";
                }
              }}
            >
              Proceed to Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AddressComponent;
