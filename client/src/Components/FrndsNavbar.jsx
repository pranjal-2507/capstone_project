import React from "react";
import { BsPersonFillAdd } from "react-icons/bs";
import { FaWallet } from "react-icons/fa6";
import { FiShare } from "react-icons/fi";


function FrndsNavbar({
  setShowFriendsList,
  setShowExpenses,
  setShowTransactions,
}) {
  return (
    <div className="navbar">
      <div className="nav-item" onClick={() => {
            setShowFriendsList(true);
            setShowExpenses(false);
            setShowTransactions(false)
        }}>
        <BsPersonFillAdd className="nav-icon" />
        <span >FRIENDS</span>
      </div>
      <div className="nav-item" onClick={() => {
            setShowFriendsList(false);
            setShowExpenses(true);
            setShowTransactions(false)
        }}>
        <FaWallet className="nav-icon" />
        <span >EXPENSES</span>
      </div>
      <div className="nav-item" onClick={() => {
            setShowFriendsList(false);
            setShowExpenses(false);
            setShowTransactions(true)
        }}>
        <FiShare className="nav-icon" />

        <span >TRANSACTIONS</span>
      </div>
    </div>
  );
}

export default FrndsNavbar;
