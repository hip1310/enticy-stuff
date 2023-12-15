import { LOCAL_STORAGE } from "./constant";

export const getImageUrl = (image: any) => {
  return image?.fields?.file?.url;
};

export const getImageTitle = (image: any) => {
  return image?.fields?.title;
};

export const isEmptyArray = (array: any) => {
  return array?.length === 0;
};

export const noPageFound = () => {
  return <>No page found</>;
};

export const clearAllData = () => {
  removeCartItems();
  removeUser();
  removeAddressId();
};

export const removeCartItems = () => {
  localStorage.removeItem(LOCAL_STORAGE.CART_ITEMS);
};

export const replaceCartItems = (cartItems: any) => {
  localStorage.setItem(LOCAL_STORAGE.CART_ITEMS, JSON.stringify(cartItems));
};

export const addToCart = (element: any) => {
  let cartItems: any = [];
  if (localStorage.getItem(LOCAL_STORAGE.CART_ITEMS)) {
    cartItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE.CART_ITEMS)!);
    cartItems.push(element);
  } else {
    cartItems.push(element);
  }
  replaceCartItems(cartItems);
};

export const getSpecificItemFromCart = (element: any) => {
  if (typeof window !== "undefined" && window.localStorage) {
    if (localStorage.getItem(LOCAL_STORAGE.CART_ITEMS)) {
      let cartItems: any = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE.CART_ITEMS)!
      );
      return cartItems.find((obj: any) => obj.name === element.name);
    }
  }
};

export const getCartItems = () => {
  return localStorage.getItem(LOCAL_STORAGE.CART_ITEMS)
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.CART_ITEMS)!)
    : [];
};

export const saveUser = (user: any) => {
  localStorage.setItem(LOCAL_STORAGE.USER, JSON.stringify(user));
};

export const getUser = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    return localStorage.getItem(LOCAL_STORAGE.USER)
      ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER)!)
      : undefined;
  }
};
export const removeUser = () => {
  localStorage.removeItem(LOCAL_STORAGE.USER);
};

export const saveAddressId = (addressId: number) => {
  localStorage.setItem(LOCAL_STORAGE.ADDRESS, addressId.toString());
};

export const getAddressId = () => {
  return Number(localStorage.getItem(LOCAL_STORAGE.ADDRESS));
};

export const removeAddressId = () => {
  localStorage.removeItem(LOCAL_STORAGE.ADDRESS);
};

export const isLoggedIn = () => {
  const userData = getUser();
  return userData?.id ? true : false;
};

export const getTotal = (cartItems?: any) => {
  let total = 0;
  if (cartItems) {
    cartItems?.map((element: any) => {
      total = total + element.price * element.qty;
    });
  } else {
    getCartItems()?.map((element: any) => {
      total = total + element.price * element.qty;
    });
  }

  return total + "";
};
