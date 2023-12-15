"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";
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
} from "../../../util/commonFunctions";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { ADD_CART_TYPES } from "../../../util/constant";
import { get, post } from "../../../services/axiosAPI";
import Skeleton from "react-loading-skeleton";


const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [contentfulData, setContentfulData] = useState<any>({});
  const { image, name, price, description } = contentfulData;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useUser();

  useEffect(() => {
    if (!id) {
      return;
    }
    const getDataFromContentful = async () => {
      const fechedFields = await fetchFieldsBySysId({ id: String(id) || "" });
      let currentContentfulData = fechedFields?.[0];
      if (isLoggedIn()) {
        const userData = getUser();
        try {
          get(
            `/cart/findOneByUserIdAndName?userId=${userData.id}&name=${currentContentfulData?.name}`
          ).then((response) => {
            if (response?.data?.[0]) {
              currentContentfulData.qty = response?.data?.[0].qty;
              currentContentfulData.id = response?.data?.[0].id;
            }
            setContentfulData(currentContentfulData);
          });
        } catch (error) {
          console.error("Error cart get:", error);
        }
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
        <>
          <div className="flex">
            <button
              className="rounded-md bg-slate-800 text-white w-9 "
              onClick={() => {
                !isLoading &&
                  onClickAddToCart(contentfulData, ADD_CART_TYPES.MINUS);
              }}
            >
              -
            </button>
            <p className="mb-0 mx-2.5">{item?.qty}</p>
            <button
              className="rounded-md bg-slate-800 text-white w-9"
              onClick={() => {
                !isLoading &&
                  onClickAddToCart(contentfulData, ADD_CART_TYPES.PLUS);
              }}
            >
              +
            </button>
          </div>
          <div>
            <button
              className="mt-2.5 w-2/3 rounded-md bg-slate-800 text-white min-h-9 py-2 px-1"
              onClick={() => {
                window.location.href = "/cart";
              }}
            >
              Go to Cart
            </button>
          </div>
        </>
      );
    } else {
      return (
        <div>
          <button
            className="w-2/3 rounded-md bg-slate-800 text-white min-h-9 py-2 px-1"
            onClick={() => {
              if (!isLoading) {
                if (isLoggedIn() && user) {
                  onClickAddToCart(contentfulData, ADD_CART_TYPES.ADD);
                } else {
                  window.location.href = "/api/auth/login";
                }
              }
            }}
          >
            {isLoading ? "Loading..." : "Add to cart"}
          </button>
        </div>
      );
    }
  };

  const onClickAddToCart = (element: any, type: string) => {
    setIsLoading(true);
    const { name, image, price, id, category } = element;
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
        category: category,
      };
      try {
        post("/cart/add", cartItem).then((response) => {
          if (Object.keys(response?.data)?.length > 0) {
            setContentfulData({
              ...contentfulData,
              qty: response?.data?.qty,
              id: response?.data?.id,
            });
          } else {
            setContentfulData({
              ...contentfulData,
              qty: 0,
              id: null,
            });
          }
          setIsLoading(false);
        });
      } catch (error) {
        console.error("Error cart add:", error);
      }
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

  return contentfulData?.image ? (
    <div className=" mx-5 mt-20 pb-16">
      <div className="md:grid md:grid-flow-row-dense md:grid-cols-2 md:grid-rows-2">
        <div>
          <img
            src={getImageUrl(image?.[0])}
            className="w-full object-fill h-3/4"
            alt={getImageTitle(image?.[0])}
          />
        </div>
        <div className="ml-2 mt-2">
          <h3 className="text-xl font-bold mb-2">{name}</h3>
          <p className="mb-2">
            <b>₹{price?.toLocaleString()}</b>
          </p>
          <p className="mb-2">{documentToReactComponents(description)}</p>
          {renderAddToCartButton()}
        </div>
      </div>
    </div>
  ) : (
    <div className=" mx-5 mt-20 pb-16">
      <div className="grid grid-flow-row-dense grid-cols-2 grid-rows-2">
        <div>
          <Skeleton height={300} />
        </div>
        <div className="ml-2">
          <Skeleton count={2} />
          <Skeleton height={100} />
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
