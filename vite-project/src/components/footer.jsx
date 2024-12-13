import { Link } from "react-router-dom";
import "./footer.css";
const Footer = () => {
  return (
    <>
      <div className="footer-menu">
        <Link to="/">Home</Link>
        <Link to="/privacy">Privacy</Link>
        <Link to="/terms">Terms</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <p className="copy-right">Copyright©K-2-tech</p>
    </>
  );
};
export default Footer;
