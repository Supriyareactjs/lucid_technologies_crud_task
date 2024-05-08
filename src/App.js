// App.js
import React, { useEffect } from 'react';
import UserTable from './UserTable';
import Container from '@mui/material/Container';
import './App.css';
import AddUserForm from './AddUser';

function App() {
  return (
    <>
      <header className="App-header">
      <Container maxWidth="xl">
        <UserTable/>
        </Container>
      </header>
    </>
  );
}

export default App;

