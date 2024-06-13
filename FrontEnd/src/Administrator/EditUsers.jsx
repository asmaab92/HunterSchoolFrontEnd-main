import React, { useEffect, useState } from 'react';
import { Button, Table } from '@mui/material';
import Background from '../assets/Background.png';
import "./EditUsers.css"
import { useLogin } from "../Login/LoginContext.jsx";
import { NavLink, useNavigate } from 'react-router-dom';
import TitleAdmin from "../Title/TitleAdmin.jsx"
import ConfirmDeleteDialog from './ConfirmDeleteDialog';


const Admin = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { logout } = useLogin();

  const handleBack = () => {
    navigate("/Admin")
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  

 

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://localhost:7211/User');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setOpenConfirmDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedUser) {
      try {
        const response = await fetch(`https://localhost:7211/User/id?id=${selectedUser.userId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setUsers(users.filter(user => user.userId !== selectedUser.userId));
        } else {
          console.error('Failed to delete user.');
        }
      } catch (error) {
        console.error('Failed to delete user.', error);
      }
      setOpenConfirmDeleteDialog(false);
      setSelectedUser(null);
    }
  };

  return (
    <>
      <div className="admin-container">
        <div className="background">
        <TitleAdmin/>
            
                <div className="admin-box">
                <h2>User List</h2>
          <Table className='table'>
            <thead>
              <tr>
                <th className='Top-row'>UserID</th>
                <th className='Top-row'>Name</th>
                <th className='Top-row'>Email</th>
                <th className='Top-row'>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.userId}>
                  <td className='thred'>{user.userId}</td>
                  <td className='thred'>{user.userName}</td>
                  <td className='thred'>{user.email}</td>
                  <td>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteClick(user)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
                </div>
            
            <br/>
                <button className="bButton" onClick={handleBack} >
                    Back
                </button>
         
         
        </div>
      </div>

      <ConfirmDeleteDialog
        open={openConfirmDeleteDialog}
        handleClose={() => setOpenConfirmDeleteDialog(false)}
        handleConfirm={handleConfirmDelete}
        item={selectedUser}
        itemType="user"
      />
    </>
  );
};

export default Admin;

