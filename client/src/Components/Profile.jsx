import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/Profile.css";

function Profile() {
  const [userData, setUserData] = useState({});

  const handleFileUpload = (e) => {
    console.log(e.target.value);
    let note = toast.loading("Uploading Image..!!", {
      position: "top-center",
    });
    let file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    const user = localStorage.getItem("id");
    axios
      .post(`https://pranjal-s56-capstone-expense-management-1.onrender.com/upload/${user}`, formData)
      .then((res) => {
        console.log(res.data);

        let obj = { ...userData, profileImg: res.data.url };
        setUserData(obj);
        localStorage.setItem("profile", res.data.url);
        toast.update(note, {
          render: "Image Uploaded Successfully",
          type: "success",
          isLoading: false,
          autoClose: 1000,
          hideProgressBar: true,
          theme: "colored",
        });
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          return toast.update(note, {
            render: err.response.data,
            type: "warning",
            isLoading: false,
            autoClose: 1000,
            hideProgressBar: true,
            theme: "colored",
          });
        }
        console.log(err);
        toast.update(note, {
          render: "Error Uploading Image",
          type: "error",
          isLoading: false,
          autoClose: 1000,
          hideProgressBar: true,
          theme: "colored",
        });
      });
  };

  return (
    <>
      <Navbar />
      <div className="mainn">
        <h3 className="title">
          Update your profile to personalize your experience.
        </h3>
        <img src={userData.profileImg} alt="" />
        <input
          type="file"
          name="profile-picture"
          id="profile-picture"
          onChange={handleFileUpload}
        />
        <label htmlFor="username">
          Username
          <input className="usernamee" type="text" id="username" placeholder="Edit the Username" />
        </label>
        <button className="saveBtn">Save</button>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default Profile;
