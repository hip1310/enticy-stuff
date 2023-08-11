import { useState } from "react";
import "./Pagination.css";

const Pagination = (element: any) => {
  const { setSkip, total, limit } = element;
  const [currentTab, setCurrentTab] = useState<number>(1);

  const showNavigationLinks = () => {
    const rows = [];
    for (let index = 0; index < Math.ceil(total / limit); index++) {
      rows.push(
        <a
          key={index}
          className={`${currentTab === index + 1 && "active"} cursor-pointer`}
          onClick={() => {
            setSkip(index * limit);
            setCurrentTab(index + 1);
          }}
        >
          {index + 1}
        </a>
      );
    }
    return rows;
  };

  const gotoFirstPage = () => {
    setSkip(0);
    setCurrentTab(1);
  };

  const gotoLastPage = () => {
    const index = Math.ceil(total / limit);
    setSkip((index-1) * limit);
    setCurrentTab(index);
  };

  return (
    <>
      <div className="pagination">
        <a className="cursor-pointer"
          onClick={() => {
            gotoFirstPage();
          }}
        >
          &laquo;
        </a>
        {showNavigationLinks()}
        <a
        className="cursor-pointer"
          onClick={() => {
            gotoLastPage();
          }}
        >
          &raquo;
        </a>
      </div>
    </>
  );
};
export default Pagination;
