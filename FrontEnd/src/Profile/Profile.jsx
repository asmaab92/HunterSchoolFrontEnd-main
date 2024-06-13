import React from 'react';
import './Profile.css';
import { useLogin } from '../Login/LoginContext.jsx';
import TextField from '@mui/material/TextField';
import BackButton from '../BackButton/BackButton';
import Title from '../Title/Title';
 
const Profile = () => {
    const { userInfo } = useLogin();
 
    return (
        <>
            <div className='Background'>
                <Title />
                <div className='Profile'>
                    <h2>Profile</h2>
 
                        <>
                            <TextField
                                id="outlined-read-only-input"
                                label='Profilename'
                                defaultValue={userInfo.userName}
                                InputProps={{ readOnly: true }} />
                            <div className='break' />
                            <TextField
                                id="outlined-read-only-input"
                                label='Email'
                                defaultValue={userInfo.email}
                                InputProps={{ readOnly: true }} />
                            <div className='break' />
                            <TextField
                                id="outlined-read-only-input"
                                label='Address'
                                defaultValue={userInfo.address}
                                InputProps={{ readOnly: true }} />
                            <div className='break' />
                            <TextField
                                id="outlined-read-only-input"
                                label='Phone Number'
                                defaultValue={userInfo.phoneNumber}
                                InputProps={{ readOnly: true }} />
                        </>
                   
                </div>
                <BackButton />
            </div>
        </>
    );
};
 
export default Profile;