import {
  getCartItems,
  getImageUrl,
  getSpecificItemFromCart,
  getUser,
  isLoggedIn,
  replaceCartItems,
} from "./util/commonFunctions";
import "./Cart.css";
import { ADD_CART_TYPES } from "./util/constant";
import { useEffect, useState } from "react";
import { axiosAPI } from "../services/axiosAPI";

const Cart = () => {
  const [cartItems, setCartItems] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadData = () => {
    if (isLoggedIn()) {
      const userData = getUser();
      axiosAPI.get(`/cart/findAll?userId=${userData?.id}`).then((response) => {
        setCartItems(response?.data);
      });
    } else {
      const cartItemsFromLocalStorage = getCartItems();
      setCartItems(cartItemsFromLocalStorage);
    }

    setIsLoading(false);
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
      const { name, image, price, id } = element;
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
      };
      axiosAPI
        .post("/cart/add", cartItem, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://127.0.0.1:3000",
          },
        })
        .then((response) => {
          if (Object.keys(response?.data)?.length > 0) {
            setTimeout(() => {
              loadData();
            }, 500);
          }
        });
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
        <div className="display-flex margin-top-15-px">
          <button
            className="productDetailsMinusPlusButton"
            onClick={() => {
              onClickAddToCart(item, ADD_CART_TYPES.MINUS);
            }}
          >
            -
          </button>
          <p className="productDetailsQtyText">{item?.qty}</p>
          <button
            className="productDetailsMinusPlusButton"
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

  if (isLoading) {
    return <div className="cartNoDataFound">Loading...</div>;
  } else {
    if (cartItems && cartItems?.length > 0) {
      return (
        <div className="mainContainer">
          {cartItems?.map((element: any, index: any) => {
            return (
              <div className="cartItems" key={index}>
                <img
                  className="cartItemsImage"
                  src={
                    isLoggedIn()
                      ? element?.image
                      : getImageUrl(element?.image?.[0])
                  }
                  alt={element?.name}
                />
                <div className="cartItemsDetails">
                  <h3>{element?.name}</h3>
                  <b>₹{element?.price?.toLocaleString()}</b>
                  {renderAddToCartButton(element)}
                </div>
              </div>
            );
          })}
          <hr className="margin-20-px" />
          <div className="cartTotalContainer">
            Total : <b>₹{getTotal()}</b>
            <br />
            <button
              className="cartProceedToByButton"
              onClick={() => {
                window.location.href = "/payment";
              }}
            >
              Proceed to Buy
            </button>
          </div>
        </div>
      );
    } else {
      return <div className="cartNoDataFound mainContainer">No Data found</div>;
    }
  }
};

export default Cart;
