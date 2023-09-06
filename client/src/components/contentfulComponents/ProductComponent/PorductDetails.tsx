import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFieldsBySysId } from "../../../services/contentfulService";
import {
  addToCart,
  getCartItems,
  getImageTitle,
  getImageUrl,
  getSpecificItemFromCart,
  getUser,
  isLoggedIn,
  replaceCartItems,
} from "../../util/commonFunctions";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import "./Product.css";
import { ADD_CART_TYPES } from "../../util/constant";
import { axiosAPI } from "../../../services/axiosAPI";

const ProductDetails = () => {
  const { id } = useParams();
  const [contentfulData, setContentfulData] = useState<any>([]);
  const { image, name, price, description } = contentfulData;

  useEffect(() => {
    const getDataFromContentful = async () => {
      const fechedFields = await fetchFieldsBySysId({ id: id || "" });
      let currentContentfulData = fechedFields?.[0];
      if (isLoggedIn()) {
        const userData = getUser();
        axiosAPI
          .get(
            `/cart/findOneByUserIdAndName?userId=${userData.id}&name=${currentContentfulData?.name}`
          )
          .then((response) => {
            if (response?.data?.[0]) {
              currentContentfulData.qty = response?.data?.[0].qty;
              currentContentfulData.id = response?.data?.[0].id;
            }
            setContentfulData(currentContentfulData);
          });
      } else {
        setContentfulData(currentContentfulData);
      }
    };
    getDataFromContentful();
  }, [id]);

  const renderAddToCartButton = () => {
    const item = isLoggedIn()
      ? contentfulData
      : getSpecificItemFromCart(contentfulData);
    if (item?.qty) {
      return (
        <div className="display-flex">
          <button
            className="productDetailsMinusPlusButton"
            onClick={() => {
              onClickAddToCart(contentfulData, ADD_CART_TYPES.MINUS);
            }}
          >
            -
          </button>
          <p className="productDetailsQtyText">{item?.qty}</p>
          <button
            className="productDetailsMinusPlusButton"
            onClick={() => {
              onClickAddToCart(contentfulData, ADD_CART_TYPES.PLUS);
            }}
          >
            +
          </button>
        </div>
      );
    } else {
      return (
        <div className="addToCartButtonContainer">
          <button
            className="addToCartButton"
            onClick={() => {
              onClickAddToCart(contentfulData, ADD_CART_TYPES.ADD);
            }}
          >
            Add to cart
          </button>
        </div>
      );
    }
  };

  const onClickAddToCart = (element: any, type: string) => {
    const { name, image, price, id } = element;
    if (isLoggedIn()) {
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
            setContentfulData({
              ...contentfulData,
              qty: response?.data?.qty,
              id: response?.data?.id,
            });
          }
        });
    } else {
      let singleItemFromLocalStorage = getSpecificItemFromCart(element);
      if (singleItemFromLocalStorage) {
        let cartItems = getCartItems();
        let indexItem = -1;
        cartItems.map((cartItem: any, index: number) => {
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
          cartItems.splice(indexItem, 1);
          delete element.qty;
          setContentfulData({ ...element });
        } else {
          setContentfulData(getSpecificItemFromCart(element));
        }
        replaceCartItems(cartItems);
      } else {
        element.qty = 1;
        addToCart(element);
        setContentfulData({ ...element });
      }
    }
  };

  return (
    <>
      <div className="margin-20-px productDetailsContainer mainContainer">
        <div className="row">
          <div className="col-xs-12 col-sm-5 col-md-5 col-lg-5">
            <img
              src={getImageUrl(image?.[0])}
              className="productDetailsImage"
              alt={getImageTitle(image?.[0])}
            />
          </div>
          <div className="col-xs-12 col-sm-7 col-md-7 col-lg-7">
            <h3>{name}</h3>
            <b>₹{price?.toLocaleString()}</b>
            {documentToReactComponents(description)}
            {renderAddToCartButton()}
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductDetails;
