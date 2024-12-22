import "./header.css";
import image from "../assets/y-ab-looper.svg";
const Header = () => {
  return (
    <>
      <div className="header-wrapper">
        <img src={image} alt="YAB Looper's LOGO" />
        <div className="title">YAB LOOPER</div>
      </div>
    </>
  );
};
export default Header;
