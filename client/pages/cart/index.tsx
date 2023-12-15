"use client";
import React, { useEffect, useState } from "react";
import {
  getCartItems,
  getImageUrl,
  getSpecificItemFromCart,
  getUser,
  isLoggedIn,
  replaceCartItems,
} from "../../util/commonFunctions";
import { ADD_CART_TYPES } from "../../util/constant";
import { get, post } from "../../services/axiosAPI";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadData = () => {
    try {
      if (isLoggedIn()) {
        const userData = getUser();
        get(`/cart/findAll?userId=${userData?.id}`).then((response) => {
          setCartItems(response?.data);
        });
      } else {
        const cartItemsFromLocalStorage = getCartItems();
        setCartItems(cartItemsFromLocalStorage);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getTotal = () => {
    let total = 0;
    cartItems?.map((element: any) => {
      total = total + element.price * element.qty;
    });
    return total?.toLocaleString();
  };

  const onClickAddToCart = (element: any, type: string) => {
    if (isLoggedIn()) {
      const { name, image, price, id, category } = element;
      const userData = getUser();
      let qty;
      if (ADD_CART_TYPES.ADD === type) {
        qty = 1;
      } else if (ADD_CART_TYPES.MINUS === type) {
        qty = element?.qty - 1;
      } else if (ADD_CART_TYPES.PLUS === type) {
        qty = element?.qty + 1;
      }

      const cartItem = {
        name: name,
        image: getImageUrl(image?.[0]),
        qty: qty,
        price: price,
        userId: userData.id,
        id: id,
        category: category,
      };

      try {
        post("/cart/add", cartItem).then((response) => {
          if (
            Object.keys(response?.data)?.length > 0 ||
            response.status === 200
          ) {
            setTimeout(() => {
              loadData();
            }, 500);
          }
        });
      } catch (error) {
        console.error("Error add cart data:", error);
      }
    } else {
      let singleItemFromLocalStorage = getSpecificItemFromCart(element);
      let localCartItems = [...cartItems];
      if (singleItemFromLocalStorage) {
        let indexItem = -1;
        localCartItems.map((cartItem: any, index: number) => {
          if (cartItem.name === singleItemFromLocalStorage.name) {
            if (type === ADD_CART_TYPES.PLUS) {
              cartItem.qty = cartItem.qty + 1;
            } else if (type === ADD_CART_TYPES.MINUS) {
              if (cartItem.qty === 1) {
                indexItem = index;
              } else {
                cartItem.qty = cartItem.qty - 1;
              }
            }
          }
        });

        if (indexItem !== -1) {
          localCartItems.splice(indexItem, 1);
          delete element.qty;
          setCartItems(localCartItems);
        } else {
          setCartItems(localCartItems);
        }

        replaceCartItems(localCartItems);
      }
    }
  };

  const renderAddToCartButton = (item: any) => {
    if (item) {
      return (
        <div className="flex mt-4">
          <button
            className="rounded-md bg-slate-800 text-white w-9"
            onClick={() => {
              onClickAddToCart(item, ADD_CART_TYPES.MINUS);
            }}
          >
            -
          </button>
          <p className="mb-0 mx-2.5">{item?.qty}</p>
          <button
            className="rounded-md bg-slate-800 text-white w-9"
            onClick={() => {
              onClickAddToCart(item, ADD_CART_TYPES.PLUS);
            }}
          >
            +
          </button>
        </div>
      );
    }
  };

  const renderSkeleton = 3;

  if (isLoading) {
    return (
      <div className="mt-20">
        {[...Array(renderSkeleton)].map((index) => {
          return (
            <div
              className="p-5 grid grid-flow-row-dense grid-cols-2 grid-rows-1"
              key={index}
            >
              <div>
                <Skeleton height={100} />
              </div>
              <div className="ml-2.5">
                <Skeleton count={3} />
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    if (cartItems && cartItems?.length > 0) {
      return (
        <div className="mt-20">
          {cartItems?.map((element: any, index: any) => {
            return (
              <div className="p-5 flex" key={index}>
                <img
                  className="w-36 h-36 object-cover"
                  src={
                    isLoggedIn()
                      ? element?.image
                      : getImageUrl(element?.image?.[0])
                  }
                  alt={element?.name}
                />
                <div className="ml-2.5">
                  <h3>{element?.name}</h3>
                  <b>₹{element?.price?.toLocaleString()}</b>
                  {renderAddToCartButton(element)}
                </div>
              </div>
            );
          })}
          <hr className="m-5" />
          <div className="pl-5 pb-24 pt-0 text-center">
            Total : <b>₹{getTotal()}</b>
            <br />
            <button
              className="rounded-md bg-slate-800 text-white w-64 h-10"
              onClick={() => {
                window.location.href = "/address";
              }}
            >
              Proceed to Buy
            </button>
          </div>
        </div>
      );
    } else if(!isLoading && cartItems && cartItems?.length === 0) {
      return <div className="text-center font-bold mt-20">No Data found</div>;
    }
  }
};

export default Cart;
