// Aboutus.jsx
import React from "react";
import Layout from "./Layout";
import "../Styles/Aboutus.css";
import { MdMobileFriendly } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
import { TbReport } from "react-icons/tb";
import { RiCommunityFill } from "react-icons/ri";
import Footer from "../Components/Footer";

function Aboutus() {
  return (
    <Layout>
      <h1>Welcome to I-Finance!</h1>
      <div className="aboutfirst">
        <p className="intro">
          At I-Finance, we believe that managing your finances should be
          straightforward, intuitive, and accessible to everyone. Whether you're
          tracking your personal income and expenses or managing a group's
          contributions, we've got you covered.
        </p>
      </div>

      <h2>Our Mission</h2>
      <p className="mission">
        We empower individuals and groups to take control of their finances with
        ease.
        <br /> We understand that managing money can be stressful, but with the
        right tools and resources, it can become efficient and even empowering.
      </p>

      <h2>What We Offer...</h2>

      <div class="features">
        <div class="feature">
          <h3>Income and Expense Tracking</h3>
          <p>
            Keep a detailed record of your income and expenses and categorize
            your transactions. Gain valuable insights into where your money goes
            and make informed financial decisions.
          </p>
        </div>
        <div class="feature">
          <h3>Group Expense Management</h3>
          <p>
            Organize and manage expenses with your friends or family in our
            Groups section. Create groups, add members, track contributions, and
            ensure everyone is on the same page. Perfect for shared living
            situations, trips, or any group activities with shared expenses.
          </p>
        </div>
      </div>

      <h2>Why Choose I-Finance?</h2>

      <ul class="benefits">
        <li>
          <strong>
            <MdMobileFriendly /> User-Friendly Interface:{" "}
          </strong>{" "}
          Our clean and intuitive design makes managing your finances seamless.
        </li>
        <li>
          <strong>
            <RiSecurePaymentFill /> Secure and Private:
          </strong>{" "}
          We use top-notch security measures to ensure your financial data is
          safe and private.
        </li>
        <li>
          <strong>
            <TbReport /> Comprehensive Reports:
          </strong>{" "}
          Gain insights with detailed reports and visualizations of your
          spending habits. Make better budgeting decisions based on data.
        </li>
        <li>
          <strong>
            <RiCommunityFill /> Community Support:
          </strong>{" "}
          Join our community to share tips, ask questions, and support each
          other on your financial journeys.
        </li>
      </ul>

      <h2 className="joinus">Join Us Today!</h2>

      <Footer />
    </Layout>
  );
}

export default Aboutus;
