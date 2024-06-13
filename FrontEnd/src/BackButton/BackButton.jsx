import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import './Backbutton.css'
import { MenuItem } from '@mui/material';

export default function BackButton() {
    const navigate = useNavigate();
    const handleHomePage = () => {
        navigate ("/");
    };
    return (
        <div>
        <button className='bButton' onClick={handleHomePage}>Go to HomePage</button>
        </div>
    )
}
