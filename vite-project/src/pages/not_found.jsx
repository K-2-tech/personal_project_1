import { Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
const NotFound = () => {
  return (
    <>
      <Header />
      <p>Not Found!</p>
      <p>back to <Link to="/">Home</Link></p>
      <Footer />
    </>
  );
};
export default NotFound;
