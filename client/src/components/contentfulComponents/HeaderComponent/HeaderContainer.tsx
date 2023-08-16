import { getImageTitle, getImageUrl } from "../../util/commonFunctions";
import Header from "./Header";
import "./Header.css";
import Auth from "../../auth/Auth";

const HeaderContainer = (element: any) => {
  const { logo, productNames } = element;
  const HomeTab = { name: "Home", redirectionUrl: "/" };
  const CartTab = { name: "Cart", redirectionUrl: "/cart" };
  return (
    <div className="headerContainer">
      <img
        src={getImageUrl(logo)}
        className="headerLogo"
        alt={getImageTitle(logo)}
      />
      <div className="headerNavContainer">
        <Header {...HomeTab} />
        {productNames?.map((element: any, index: number) => {
          return (
            <Header
              key={index}
              {...element?.fields}
              productId={element?.sys?.id}
            />
          );
        })}
        <Header {...CartTab} />
      </div>
      <div className="headerLoginLogoutButton">
        <Auth />
      </div>
    </div>
  );
};
export default HeaderContainer;
