import { useState } from "react";

const Pagination = (element: any) => {
  const { setSkip, total, limit } = element;
  const [currentTab, setCurrentTab] = useState<number>(1);
  const classNameForAnchorTag = "float-left py-2 px-4 text-xl no-underline border mx-1 cursor-pointer";

  const showNavigationLinks = () => {
    const rows = [];
    for (let index = 0; index < Math.ceil(total / limit); index++) {
      rows.push(
        <a
          key={index}
          className={`${classNameForAnchorTag} ${currentTab === index + 1 && "bg-sky-500 text-white border border-sky-500"}`}
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
      <div className="inline-block">
        <a className={classNameForAnchorTag}
          onClick={() => {
            gotoFirstPage();
          }}
        >
          &laquo;
        </a>
        {showNavigationLinks()}
        <a
        className={classNameForAnchorTag}
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
