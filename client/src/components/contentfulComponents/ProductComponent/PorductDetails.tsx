import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFieldsBySysId } from "../../../services/contentfulService";
import {
  addToCart,
  getCartItems,
  getImageTitle,
  getImageUrl,
  getSpecificItemFromCart,
  replaceCartItems,
} from "../../util/commonFunctions";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import "./Product.css";
import { ADD_CART_TYPES } from "../../util/constant";

const ProductDetails = () => {
  const { id } = useParams();
  const [contentfulData, setContentfulData] = useState<any>([]);
  const { image, name, price, description } = contentfulData;

  useEffect(() => {
    const getDataFromContentful = async () => {
      const fechedFields = await fetchFieldsBySysId({ id: id || "" });
      setContentfulData(fechedFields?.[0]);
    };
    getDataFromContentful();
  }, [id]);

  const renderAddToCartButton = () => {
    const item = getSpecificItemFromCart(contentfulData);
    if (item) {
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
