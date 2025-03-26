import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/Display.css';
import SplitPaymentCalcClass from './SplitPaymentClass';

const Display = () => {
  const [friends, setFriends] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getFriends();
  }, []);

  useEffect(() => {
    if (expenses.length > 0) {
      const newCalc = new SplitPaymentCalcClass(expenses);
      const transactionsArray = newCalc.getTransactions();
      setTransactions(transactionsArray);
    }
  }, [expenses]);

  const getFriends = async () => {
    let user = localStorage.getItem("id");
    try {
      const response = await axios.get(`https://pranjal-s56-capstone-expense-management-7.onrender.com/getFriends/${user}`);
      const friendsData = response.data;
      setFriends(friendsData);

      const expensesData = friendsData.map(friend => {
        const totalExpense = friend.expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
        return { amount: totalExpense, friend: { id: friend.name, name: friend.name } };
      }).filter(exp => exp.amount > 0);

      setExpenses(expensesData);
    } catch (error) {
      console.error('Error fetching friends data:', error);
    }
  };

  const handleCheckboxChange = (id) => {
    setCheckedItems(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className='container'>
      <div className="transactions">
        {transactions.map((txn) => (
          <div
            className={`transaction ${checkedItems[txn.id] ? 'checked' : ''}`}
            key={txn.id}
          >
            <input
              type="checkbox"
              checked={checkedItems[txn.id] || false}
              onChange={() => handleCheckboxChange(txn.id)}
            />
            <span className="name">
              {txn.from_friend.name} gives {txn.to_friend.name}
            </span>
            <span className="amount"> ₹{txn.amount}</span>
          </div>
        ))}
      </div>
      <div className="total">
        Total: <strong><span className="total-amount"> ₹{totalAmount.toFixed(2)}</span></strong>
      </div>
    </div>
  );
};

export default Display;
