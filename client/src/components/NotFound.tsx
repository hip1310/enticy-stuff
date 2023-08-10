import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      No Route found!!
      <Link to="/product">Go To Home</Link>
    </div>
  );
};

export default NotFound;
