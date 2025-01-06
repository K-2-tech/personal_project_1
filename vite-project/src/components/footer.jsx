import { Link } from "react-router-dom";
import { RiTwitterXFill } from "react-icons/ri";
import "./footer.css";
const Footer = () => {
  return (
    <>
      <div className="footer-menu">
        <Link to="/">Home</Link>
        <Link to="/privacy">Privacy</Link>
        <Link to="/terms">Terms</Link>
        <Link to="/contact">Contact</Link>
        <a href="https://x.com/K2nyanko" target="_blank"><RiTwitterXFill /></a>
      </div>
      
      <p className="copy-right">Copyright©K2nyanko</p>
    </>
  );
};
export default Footer;
