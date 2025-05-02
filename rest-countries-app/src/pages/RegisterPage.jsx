import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Storing user credentials
      localStorage.setItem('userEmail', email);  
      localStorage.setItem('userPassword', password);  

      alert('Registration successful!');  

      navigate('/login');
    } catch (error) {
      alert('Registration failed!'); 
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: '#f7f8fa' }}>
      <div className="bg-white p-5 rounded-lg shadow-sm w-100" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4 text-gray-800">Register</h2>
        <Form onSubmit={handleRegister}>
          <Form.Group controlId="formEmail" className="mb-4">
            <Form.Label className="text-gray-600">Email Address</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
              className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-4">
            <Form.Label className="text-gray-600">Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Enter your password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
              className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 py-2 text-white font-semibold rounded-md">
            Register
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default RegisterPage;
