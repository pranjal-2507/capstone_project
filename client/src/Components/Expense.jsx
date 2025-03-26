import React, { useEffect, useState } from 'react';
import '../Styles/Expense.css'; 
import axios from 'axios';
import { Modal, Button, Input } from "antd";

function Expense({ friendsList }) {
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [frndId , setFrndId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState({});

  const colors = ['gray', 'red', 'blue', 'orange', 'green', 'pink'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const newExpense = {
    id: frndId,
    name: selectedFriend,
    amount,
    color: randomColor,
    reason
  };

  useEffect(()=>{
    getFriends();
  },[])

  const getFriends = async ()=>{
    let user = localStorage.getItem("id");
    await axios.get(`https://pranjal-s56-capstone-expense-management-7.onrender.com/getFriends/${user}`)
      .then((res)=>{
        setFriends(res.data);
      });
  }

  const handleAddExpense = async () => {
    if (!selectedFriend || !amount) {
      alert("Please select a friend and enter an amount.");
    } else {
      try {
        let user = localStorage.getItem("id");
        
        await axios.post(`https://pranjal-s56-capstone-expense-management-7.onrender.com/addexpense/${user}`, newExpense)
        .then((res)=>{
          console.log(res);
          setFriends(res.data);
          setSelectedFriend('');
          setAmount('');
          setReason('');
        });
      } catch (error) {
        console.error("Error adding expense:", error);
      }
    }
  };

  const deleteExpense = async (i, j) => {
    try {
      const confirmed = window.confirm("Are you Sure?");
      if (confirmed) {
        let user = localStorage.getItem("id");
        await axios.delete(`https://pranjal-s56-capstone-expense-management-7.onrender.com/friendexpense/${i}/${user}/${j}`)
        .then((res)=>{
          console.log(res);
          getFriends();
        });
      }
    } catch (error) {
      console.error("Error deleting the expense:", error);
    }
  }

  
  const handleEditExpense = (i, exp) => {
    setCurrentExpense({
      friendIndex: i,
      expenseId: exp.expenseid,
      amount: exp.amount,
      reason: exp.reason,
    });
    setAmount(exp.amount);
    setReason(exp.reason);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    const userid = localStorage.getItem("id")
    axios.put(`https://pranjal-s56-capstone-expense-management-7.onrender.com/updateexpense/${userid}`,{
      friendIndex: currentExpense.friendIndex,
      expenseId: currentExpense.expenseId,
      newAmount: amount,
      newReason: reason,
    })
    .then((res)=>{
      console.log(res)
      getFriends()
    })
    console.log({
      friendIndex: currentExpense.friendIndex,
      expenseId: currentExpense.expenseId,
      newAmount: amount,
      newReason: reason,
    });
    setIsModalOpen(false);
    setAmount('');
    setReason('');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="expense-container">
      <h2>Add expenses</h2>
      <p>Select friend, input amount, and add expense</p>
      <div className="input-section">
        <select 
          className="friend-select" 
          value={selectedFriend} 
          onChange={(e) => {
            setSelectedFriend(e.target.value);
            setFrndId(e.target.selectedIndex - 1);
          }}
        > 
          <option key={0} value="">Choose Friend</option>
          {friendsList.map((el, i) => (
            <option key={i + 1} value={el.name}>{el.name}</option>
          ))}
        </select>
        <Input 
          type="text" 
          placeholder="Amount" 
          className="amount-input" 
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button className="add-btn" onClick={handleAddExpense}>+</Button>
      </div>
      <Input 
        type="text" 
        placeholder="Reason (optional)" 
        className="reason-input" 
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
      <div className="expense-list">
        {friends && friends.map((friend, i) => {
          return (
            <div key={i} className="friend-expenses">
              {friend.expenses && friend.expenses.map((exp, j) => {
                return (
                  <div key={exp.expenseid} className="expense-item">
                    <div className="expense-icon" style={{ backgroundColor: 'gray' }}>
                      {friend.name[0]}
                    </div>  
                    <span className="expense-name">
                      {friend.name} paid ₹{exp.amount} {exp.reason && `for ${exp.reason}`}
                    </span>
                    <div className="expense-actions">
                      <Button className="edit-button" onClick={() => handleEditExpense(i, exp)}>✏️</Button>
                      <Button className="delete-button" onClick={() => deleteExpense(i, exp.expenseid)}>🗑️</Button>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <Modal 
        title="Edit Expense" 
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel}
      >
        <label >Amount : <Input 
          type="text" 
          name='new Amount'
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          className="edit-amount-input"
        /></label>
        <br /><br />
        <label>Reason :<Input 
          type="text" 
          value={reason} 
          onChange={(e) => setReason(e.target.value)} 
          className="edit-reason-input"
        /></label>
      </Modal>
    </div>
  );
}

export default Expense;
