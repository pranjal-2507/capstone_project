import React, { useState, useEffect } from 'react';
import '../Styles/Friends.css'; 
import Layout from './Layout';

import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { BiSolidSave } from "react-icons/bi";
import FrndsNavbar from './FrndsNavbar';
import axios from 'axios';
import Expense from './Expense';
import Display from './Display';

function Friends() {
  const [friend, setFriend] = useState('');
  const [friendsList, setFriendsList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentFriendId, setCurrentFriendId] = useState(null);
  const [editFriendName, setEditFriendName] = useState('');
  const [ showFriendsList , setShowFriendsList ] = useState(true)
  const [ showExpenses, setShowExpenses ] = useState(false)
  const [ showTransactions , setShowTransactions ] = useState(false)

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const user = localStorage.getItem("id");
        const response = await axios.get(
          `https://pranjal-s56-capstone-expense-management-7.onrender.com/friends/${user}`
        );
        setFriendsList(response.data.friends);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFriends();
  }, []);

  const addNewFriends = async () => {
    if (friend) {
      try {
        const user = localStorage.getItem("id");
        const response = await axios.post(`https://pranjal-s56-capstone-expense-management-7.onrender.com/addfriends/${user}`, { name: friend });
        setFriendsList([...friendsList, response.data]);
        setFriend('');
      } catch (err) {
        console.error(err);
      }
    }
  };

  const deleteFriend = async (id) => {
    try {
      const user = localStorage.getItem("id");
      await axios.delete(`https://pranjal-s56-capstone-expense-management-7.onrender.com/deletefriend/${id}/${user}`);
      setFriendsList(friendsList.filter((friend) => friend.name !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const startEditFriend = (name) => {
    setEditMode(true);
    setCurrentFriendId(name);
    setEditFriendName(name);
  };

  const saveEditFriend = async () => {
    try {
      if (editFriendName != ""){
        // console.log(editFriendName)
        const user = localStorage.getItem("id");
        const response = await axios.put(`https://pranjal-s56-capstone-expense-management-7.onrender.com/updatefriend/${currentFriendId}/${user}`, { name: editFriendName });
        console.log(response)
        setFriendsList(friendsList.map(friend => (friend.name === currentFriendId ? {"name" : response.data} : friend)));
        setEditMode(false);
        setCurrentFriendId(null);
        setEditFriendName('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    <Layout>
      <FrndsNavbar setShowFriendsList={setShowFriendsList} setShowExpenses={setShowExpenses} setShowTransactions={setShowTransactions} />

      {showFriendsList &&  <div className="mainbox">
        <div className="input-box">
          <input
            type="text"
            placeholder="Add friend"
            value={friend}
            onChange={(e) => setFriend(e.target.value)}
          />
          <button className='addbutton' onClick={addNewFriends}>+</button>
        </div>
        <div className="friends-list">
          
          {friendsList.length==0? "" : friendsList.map((friend) => (
            <div key={friend.name} className="friend-item">
              {editMode && currentFriendId === friend.name ? (
                <input
                  type="text"
                  value={editFriendName}
                  onChange={(e) => setEditFriendName(e.target.value)}
                />
              ) : (
                <span>{friend.name}</span>
              )}
              <div className="btnss">
                <button onClick={() => deleteFriend(friend.name)}><MdDelete /></button>
                
                {editMode && currentFriendId === friend.name ? (
                  <button onClick={saveEditFriend}><BiSolidSave/></button>
                ) : (
                  <button onClick={() => startEditFriend(friend.name)}><MdModeEditOutline /></button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>}

      {showExpenses && <Expense friendsList={friendsList}/>}
      {showTransactions && <Display  />}
      
    </Layout>
    </>
  );
}

export default Friends;
