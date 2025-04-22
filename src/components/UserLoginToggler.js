import React, { useState, useContext } from "react";
import { AuthContext } from '../contexts/AuthContext';
import users from '../data/users'; // Import the users array
import styled from 'styled-components';

const UserLoginTogglerSelect = styled.select`
  margin-top: 10px;
  appearance: none;
  border: 1px solid #afafaf;
  padding: 5px 10px;
  font-size: 14px;
  border-radius: 5px;
  outline: none;
  background-image: url('https://tmgrocery.vtexassets.com/assets/vtex.file-manager-graphql/images/93295022-de18-46d7-b274-da90fcec618b___76c019b6b15fcb85855239cb679ef8d6.png');
  background-repeat: no-repeat;
  background-size: 20px;
  background-position: center right;
`;

const UserLoginToggler = () => {
  const { loginAsUser } = useContext(AuthContext); // Access the new loginAsUser function
  const [selectedUser, setSelectedUser] = useState('undefined'); // Default to Anonymous

  const handleUserChange = (e) => {
    const selected = e.target.value;
    setSelectedUser(selected);
    const creds = { username: selected, password: 'password' };
    loginAsUser(creds); // Call the function to update authentication state
  };
  
  return (
    <UserLoginTogglerSelect value={selectedUser} onChange={handleUserChange}>
      <option value="">Select a user...</option>
      {users.map(user => (
        <option key={user.username} value={user.username}>
          {user.displayName}
        </option>
      ))}
    </UserLoginTogglerSelect>
  )
}

export default UserLoginToggler;