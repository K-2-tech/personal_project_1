import { Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import EmailLink from "../components/email_link";
const Contact = () => {
  return (
    <>
      <Header />
      <div>
        <Link to="/">Home</Link> &gt; <Link to="/contact">Contact</Link>
      </div>
      <EmailLink email="example@example.com" subject="お問い合わせ" />

      <Footer />
    </>
  );
};
export default Contact;
