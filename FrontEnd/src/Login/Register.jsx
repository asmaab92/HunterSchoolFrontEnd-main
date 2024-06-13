import React, { useState } from 'react';
import '../Login/Register.css'
 
function RegisterModal({ open, onClose }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
 
    const handleClose = () => {
        setUsername('')
        setEmail('')
        setPassword('')
        setAddress('')
        setPhoneNumber('')
        onClose()
    };
 
    const handleRegister = async () => {
        try {
            const response = await fetch('https://localhost:7211/User/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password,address,phoneNumber })
            });
 
            if (!response.ok) {
                throw new Error('Failed to register');
            }
 
            console.log('User registered successfully');
            handleClose();
        } catch (error) {
            console.error('Error registering user:', error.message);
        }
    };
 
    return (
        <div className="register-modal" style={{ display: open ? 'block' : 'none' }}>
            <div className="modal-background">
                <div className="modal-content">
                    <h2>Register</h2>
                    <div>
                        <label>Username</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            id="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label >Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label >Address</label>
                        <input
                            id="address"
                            type="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>  <div>
                        <label >Phone Number</label>
                        <input
                            id="phoneNumber"
                            type="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div className="modal-buttons">
                        <button onClick={handleClose}>Cancel</button>
                        <button onClick={handleRegister}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default RegisterModal;
