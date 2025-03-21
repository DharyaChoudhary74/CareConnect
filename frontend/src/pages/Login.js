import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log('Login form submitted');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Role:', role);
    try {
      const { data } = await axios.post('http://localhost:3003/api/auth/login', { email, password, role });
      console.log('Login success:', data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      
      // Redirect based on role
      if (data.role === 'patient') {
        navigate('/dashboard');
      } else if (data.role === 'doctor') {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error during login:', error.response ? error.response.data : error.message);
      alert('Enter valid credentials');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={submitHandler} className="login-form">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="role-selection">
          <label>
            <input
              type="radio"
              name="role"
              value="patient"
              checked={role === 'patient'}
              onChange={(e) => setRole(e.target.value)}
              required
            />
            Patient
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="doctor"
              checked={role === 'doctor'}
              onChange={(e) => setRole(e.target.value)}
            />
            Doctor
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
