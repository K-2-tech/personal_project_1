import { BrowserRouter, Routes, Route } from "react-router";
import Home from "../pages/home";
import Contact from "../pages/contact";
import Privacy from "../pages/privacy";
import Terms from "../pages/terms";
import NotFound from "../pages/not_found";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
