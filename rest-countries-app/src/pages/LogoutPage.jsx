import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';  

const Logout = () => {
  const navigate = useNavigate();  

  const handleLogout = () => {
    localStorage.removeItem('userToken'); 
    navigate('/login');  
  };

  return (
    <Container>
      <Button variant="danger" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
};

export default Logout;
