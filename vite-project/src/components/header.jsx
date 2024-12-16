import "./header.css";
import image from "../assets/y-ab-looper.svg";
const Header = () => {
  return (
    <>
      <div className="header-wrapper">
        <img src={image} alt="Y-AB Looper's LOGO" />
        <h1 className="title">Y-AB LOOPER</h1>
      </div>
    </>
  );
};
export default Header;
