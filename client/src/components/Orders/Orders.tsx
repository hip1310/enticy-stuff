import { getImageUrl, getUser, isLoggedIn } from "../util/commonFunctions";
import "./Orders.css";
import { useEffect, useState } from "react";
import { axiosAPI } from "../../services/axiosAPI";

const Orders = () => {
  const [items, setItems] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadData = () => {
    if (isLoggedIn()) {
      const userData = getUser();
      axiosAPI.get(`/order/findAll?userId=${userData?.id}`).then((response) => {
        setItems(response?.data);
      });
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (isLoading) {
    return <div className="orderNoDataFound">Loading...</div>;
  } else {
    if (items && items?.length > 0) {
      return (
        <div className="mainContainer">
          {items?.map((element: any, index: any) => {
            return (
              <div className="orderItems" key={index}>
                <img
                  className="orderItemsImage"
                  src={
                    isLoggedIn()
                      ? element?.image
                      : getImageUrl(element?.image?.[0])
                  }
                  alt={element?.name}
                />
                <div className="orderItemsDetails">
                  <h3>{element?.name}</h3>
                  <b>Price: ₹{element?.price * element?.qty}</b>
                  <p>
                    Qty : {element?.qty}
                    <br />
                    Purchased date : {element?.created_at}
                    <br />
                    Status : {element?.status}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return <div className="cartNoDataFound mainContainer">No Data found</div>;
    }
  }
};

export default Orders;
