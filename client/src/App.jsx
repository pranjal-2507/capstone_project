import Home from "./Components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Dashboard from "./Components/Dashboard";
import Friends from "./Components/Friends";
import Login from "./Components/Login";
import Aboutus from "./Components/Aboutus";
import Analytics from "./Components/Analytics";
import Display from "./Components/Display";
import Expense from "./Components/Expense";
import Profile from "./Components/Profile";
import { useEffect } from "react";

const clientID = "311238508492-i7o334gljj6h57ped9mdie180691do8e.apps.googleusercontent.com";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/login" element={<Login />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/friends/expense" element={<Expense />} />
          <Route path="/friends/expense/displaytransaction" element={<Display />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
