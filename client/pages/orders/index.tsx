import { getImageUrl, getUser, isLoggedIn } from "../../util/commonFunctions";
import { useEffect, useState } from "react";
import { get } from "../../services/axiosAPI";
import moment from "moment";

const Orders = () => {
  const [items, setItems] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadData = () => {
    if (isLoggedIn()) {
      const userData = getUser();
      get(`/order/findAll?userId=${userData?.id}`).then((response) => {
        setItems(response?.data);
      });
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (isLoading) {
    return <div className="text-center font-bold mt-20">Loading...</div>;
  } else {
    if (items && items?.length > 0) {
      return (
        <div className="mt-20 pb-24">
          {items?.map((element: any, index: any) => {
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
                  <p className="text-xl font-bold">{element?.name}</p>
                  <b>Price: ₹{element?.price * element?.qty}</b>
                  <p>
                    Qty : {element?.qty}
                    <br />
                    {element?.created_at && <>Purchased date : {moment(element?.created_at).format('MMM DD YYYY h:mm a') }</>}
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
      return <div className="text-center font-bold mt-20">No Data found</div>;
    }
  }
};

export default Orders;
