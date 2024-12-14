import { Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import "./terms.css";
const Terms = () => {
  return (
    <>
      <Header />
      <div>
        <Link to="/">Home</Link> &gt; <Link to="/privacy">Privacy</Link>
      </div>
      <h1>Privacy Policy</h1>
      <p className="effective-date">Effective date: July 14, 2019</p>

      <div className="section">
        <p>
          These terms and conditions outline the rules and regulations for the
          use of LoopTube's Website.
        </p>

        <p className="warning">
          By accessing this website we assume you accept these terms and
          conditions in full. Do not continue to use LoopTube's website if you
          do not accept all of the terms and conditions stated on this page.
        </p>

        <p>
          The following terminology applies to these Terms and Conditions,
          Privacy Statement and Disclaimer Notice and any or all Agreements:
          "Client", "You" and "Your" refers to you, the person accessing this
          website and accepting the Company's terms and conditions. "The
          Company", "Ourselves", "We", "Our" and "Us", refers to our Company.
          "Party", "Parties", or "Us", refers to both the Client and ourselves,
          or either the Client or ourselves. All terms refer to the offer,
          acceptance and consideration of payment necessary to undertake the
          process of our assistance to the Client in the most appropriate
          manner, whether by formal meetings of a fixed duration, or any other
          means, for the express purpose of meeting the Client's needs in
          respect of provision of the Company's stated services/products, in
          accordance with and subject to, prevailing law.
        </p>
      </div>

      <div className="section">
        <h2>YouTube's Terms</h2>
        <p>
          Because we use YouTube API Service, we also assume you accept
          YouTube's Terms described in the following link:
        </p>
        <p>
          <a href="https://www.youtube.com/t/terms">
            https://www.youtube.com/t/terms
          </a>
        </p>
      </div>

      <div className="section">
        <h2>Cookies</h2>
        <p>
          We employ the use of cookies. By using LoopTube's website you consent
          to the use of cookies in accordance with LoopTube's privacy policy.
        </p>
        <p>
          Most of the modern day interactive web sites use cookies to enable us
          to retrieve user details for each visit. Cookies are used in some
          areas of our site to enable the functionality of this area and ease of
          use for those people visiting. Some of our affiliate / advertising
          partners may also use cookies.
        </p>
      </div>

      <div className="section">
        <h2>License</h2>
        <p>
          Unless otherwise stated, LoopTube and/or it's licensors own the
          intellectual property rights for all material on LoopTube. All
          intellectual property rights are reserved. You may view and/or print
          pages from https://wip.gallery for your own personal use subject to
          restrictions set in these terms and conditions.
        </p>

        <p>You must not:</p>
        <ul>
          <li>Republish material from https://wip.gallery</li>
          <li>Sell, rent or sub-license material from https://wip.gallery</li>
          <li>
            Reproduce, duplicate or copy material from https://wip.gallery
          </li>
          <li>
            Redistribute content from LoopTube (unless content is specifically
            made for redistribution).
          </li>
        </ul>
      </div>

      <div className="section">
        <h2>Reservation of Rights</h2>
        <p>
          We reserve the right at any time and in its sole discretion to request
          that you remove all links or any particular link to our Web site. You
          agree to immediately remove all links to our Web site upon such
          request. We also reserve the right to amend these terms and conditions
          and its linking policy at any time. By continuing to link to our Web
          site, you agree to be bound to and abide by these linking terms and
          conditions.
        </p>
      </div>

      <div className="section">
        <h2>Content Liability</h2>
        <p>
          We shall have no responsibility or liability for any content appearing
          on your Web site. You agree to indemnify and defend us against all
          claims arising out of or based upon your Website. No link(s) may
          appear on any page on your Web site or within any context containing
          content or materials that may be interpreted as libelous, obscene or
          criminal, or which infringes, otherwise violates, or advocates the
          infringement or other violation of, any third party rights.
        </p>
      </div>

      <div className="section">
        <h2>Disclaimer</h2>
        <p>
          To the maximum extent permitted by applicable law, we exclude all
          representations, warranties and conditions relating to our website and
          the use of this website (including, without limitation, any warranties
          implied by law in respect of satisfactory quality, fitness for purpose
          and/or the use of reasonable care and skill). Nothing in this
          disclaimer will:
        </p>
        <ul>
          <li>
            limit or exclude our or your liability for death or personal injury
            resulting from negligence;
          </li>
          <li>
            limit or exclude our or your liability for fraud or fraudulent
            misrepresentation;
          </li>
          <li>
            limit any of our or your liabilities in any way that is not
            permitted under applicable law; or
          </li>
          <li>
            exclude any of our or your liabilities that may not be excluded
            under applicable law.
          </li>
        </ul>

        <p>
          The limitations and exclusions of liability set out in this Section
          and elsewhere in this disclaimer: (a) are subject to the preceding
          paragraph; and (b) govern all liabilities arising under the disclaimer
          or in relation to the subject matter of this disclaimer, including
          liabilities arising in contract, in tort (including negligence) and
          for breach of statutory duty.
        </p>

        <p>
          To the extent that the website and the information and services on the
          website are provided free of charge, we will not be liable for any
          loss or damage of any nature.
        </p>
      </div>

      <Footer />
    </>
  );
};
export default Terms;
