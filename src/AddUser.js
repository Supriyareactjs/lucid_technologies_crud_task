// components/AddUserForm.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from './redux/actions/userActions';
import { Button } from '@mui/material';

const AddUserForm = () => {

  useEffect(() =>{
    generateRandomId();
  },[])
  // State to hold the generated ID
 const [generatedId, setGeneratedId] = useState('');

 // Function to generate a random ID
 const generateRandomId = () => {
   const newId = Date.now().toString();
   setGeneratedId(newId);
 };
  const dispatch = useDispatch();
// const usersdata = useSelector((state) => state.users);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    username: '',
    email: '',
    address: '',
    phone: '',
    website: '',
    company: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(addUser(formData));
    // console.log(usersdata);
    // setFormData({ name: '', username: '', email: '' });
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={(e) => handleSubmit(e)} className={'adduserform'}>
        <input type='text' name="id" value={formData.id} onChange={handleChange} placeholder="Enter some random ID" required />
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Name" required />
        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Enter Username" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email" required />
        <Button variant='contained' type="submit">Add User</Button>
      </form>
    </div>
  );
};

export default AddUserForm;
