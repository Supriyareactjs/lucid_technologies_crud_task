import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Modal, Paper, TableSortLabel, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, editUser, fetchUsers } from './redux/actions/userActions';
import SearchIcon from '@mui/icons-material/Search';
import { addUser } from './redux/actions/userActions';
import AddUserForm from './AddUser';
import {Cancel, Create, Delete, Person4 } from '@mui/icons-material';

function UserTable() {
    const dispatch = useDispatch();
    // const [isUsersFetched, setIsUsersFetched] = useState(false);

    useEffect(() => {
          dispatch(fetchUsers());
      }, []);
    
  
    const usersdata = useSelector((state) => state.users);
    const [searchQuery, setSearchQuery] = useState('');

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editedUserData, setEditedUserData] = useState(null);
    const[modalTitle, setmodalTitle] =useState("");
    const [isNew, setisNew] = useState(false);
   
    const handleDelete = (id) => {
        dispatch(deleteUser(id));
        console.log("deleted", usersdata)
    };
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        console.log("searchbar....", e.target.value);
    };
     
    const filteredUsers = usersdata?.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const handleEdit = (user = null) => {
        if (user) {
            // If an existing user is provided, set the edited user data
            setEditedUserData(user);
            console.log("into if bloc")
            setisNew(true);
            setmodalTitle("Edit Data");
        } else {
            // If no user is provided, reset the edited user data to empty
            setisNew(false);
            console.log("into else bloc")
            setmodalTitle("Add your data");
            const maxId = Math.max(...usersdata.map(user => user.id));
            const newId = maxId >= 0 ? maxId + 1 : 0; // Increment the maximum ID by 1 or start from 0 if no users exist
            setEditedUserData({
                id: newId,
                name: '',
                username: '',
                email: '',
                address: '',
                phone: '',
                website: '',
                company: ''
            });
        }
        // Open the edit modal
        setEditModalOpen(true);
    };

    // const handleEdit = (user) => {
    //     setEditedUserData(user);
    //     setEditModalOpen(true);
    // };
    const handleEditModalClose = () => {
        setEditModalOpen(false);
    };
    const handleEditSubmit = (e) => {
        // debugger;
        e.preventDefault();
        // Dispatch action to update user data
        console.log(editedUserData);
        if (isNew) {
            console.log("ssubmit button -into if bloc")

            // If user already exists (edit mode)
            dispatch(editUser(editedUserData));
        } else {
            // If user is new (add mode)
            console.log("ssubmit button -into else bloc")

            dispatch(addUser(editedUserData));
        }
        // Close edit modal
        setEditModalOpen(false);
    };
    // const handleEditSubmit = (e) => {
    //     e.preventDefault();
    //     // Dispatch action to update user data
    //     dispatch(editUser(editedUserData));
    //     // Close edit modal
    //     setEditModalOpen(false);
    // };

   

    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    const handleSort = (criteria) => {
        if (sortBy === criteria) {
            // Toggle sort order if already sorting by the same criteria
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            // Set new sort criteria and default to ascending order
            setSortBy(criteria);
            setSortOrder('asc');
        }
    };

    const sortedUsers = usersdata?.slice().sort((a, b) => {
        // Perform sorting based on the current sort criteria and order
        const sortOrderMultiplier = sortOrder === 'asc' ? 1 : -1;
        if (sortBy === 'name') {
            return sortOrderMultiplier * a.name.localeCompare(b.name);
        } else if (sortBy === 'username') {
            return sortOrderMultiplier * a.username.localeCompare(b.username);
        }
        return 0;
    });
 
    return (
        <>
            <h2>User Data</h2>
            <span style={{position: 'relative'}}>
            <input type='search' className='searchbarfield' value={searchQuery} onChange={handleSearchChange} placeholder="Search by Name" />
           <SearchIcon sx={{position: 'absolute', left: '10px', bottom: '0px'}} />
            </span>
            <Button className='adduserbutton' onClick={() => handleEdit()}>Add User <Person4/></Button>
            <TableContainer component={Paper} className={'userdata'}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            {/* <TableCell sx={{ fontWeight: "bold" }} align='center'>Name</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }} align='center'>User Name</TableCell> */}
                            <TableCell sx={{ fontWeight: "bold" }} align='center'>
                                <TableSortLabel
                                    active={sortBy === 'name'}
                                    direction={sortOrder}
                                    onClick={() => handleSort('name')}
                                >
                                    Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }} align='center'>
                                <TableSortLabel
                                    active={sortBy === 'username'}
                                    direction={sortOrder}
                                    onClick={() => handleSort('username')}
                                >
                                    Username
                                </TableSortLabel>
                            </TableCell>

                            <TableCell sx={{ fontWeight: "bold" }} align='center'>Email</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }} align='center'>Phone</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searchQuery ? (
                            Object.keys(filteredUsers).length > 0 ? (
                                filteredUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell align='center'>{user.name}</TableCell>
                                        <TableCell align='center'>{user.username}</TableCell>
                                        <TableCell align='center'>{user.email}</TableCell>
                                        <TableCell align='center'>{user.phone}</TableCell>
                                        <TableCell align='center'><Button onClick={() => handleEdit(user)} className={'editbutton'} sx={{    background: "#1976d2",
    color: "#fff", border: "1px solid #1976d2", textTransform:'capitalize'}} variant="text"><Create /> Edit  </Button></TableCell>
                                    <TableCell align='center'><Button onClick={() => handleDelete(user.id)} className={'deletebutton'} sx={{    background: "#d32f2f",
    color: "#fff", border: "1px solid #d32f2f", textTransform:'capitalize'}}  variant="text" color="error">
                                      <Delete />  Delete
                                    </Button></TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} align='center'>No results found</TableCell>
                                </TableRow>
                            )
                        ) : (sortedUsers ? (
                            Object.keys(sortedUsers).length > 0 ? (
                                sortedUsers?.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell align='center'>{user.name}</TableCell>
                                        <TableCell align='center'>{user.username}</TableCell>
                                        <TableCell align='center'>{user.email}</TableCell>
                                        <TableCell align='center'>{user.phone}</TableCell>
                                        <TableCell align='center'><Button onClick={() => handleEdit(user)} className={'editbutton'} sx={{    background: "#1976d2",
        color: "#fff", border: "1px solid #1976d2", textTransform:'capitalize'}} variant="text"><Create /> Edit  </Button></TableCell>
                                        <TableCell align='center'><Button onClick={() => handleDelete(user.id)} className={'deletebutton'} sx={{    background: "#d32f2f",
        color: "#fff", border: "1px solid #d32f2f", textTransform:'capitalize'}}  variant="text" color="error">
                                          <Delete />  Delete
                                        </Button></TableCell>
                                    </TableRow>
                                ))

                            ) : (
                                <TableRow>
                                <TableCell colSpan={6} align='center'>No Data found</TableCell>
                            </TableRow>
                            )
                        ) : (
                            <TableRow>
                            <TableCell colSpan={6} align='center'>Loading Users Data....</TableCell>
                        </TableRow>
                        )
                           
                        )}
                    </TableBody>

                </Table>
            </TableContainer>
            {/* <AddUserForm /> */}
            {/* MODAL POPUP */}
            {/* Edit Modal */}
            <Modal open={editModalOpen} onClose={handleEditModalClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        borderRadius: '10px',
                        transform: 'translate(-50%, -50%)',
                        width: {
                            xs: '70%',
                            sm: '70%',
                            md: '400px'
                        },
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <h2 style={{marginTop: "0",
    textAlign: "center"}}>{modalTitle}</h2>
                <span style={{    position: "absolute",
    right: "17px",
    top: "17px", cursor: "pointer"}} onClick={handleEditModalClose}><Cancel /></span>
                    <form onSubmit={handleEditSubmit}>
                    {/* <TextField 
      className='edittextfield'
      label="ID"
      value={editedUserData?.id || ''}
      variant="outlined"
      fullWidth
      onChange={(e) => setEditedUserData({ ...editedUserData, id: e.target.value })}
   
    /> */}
                        <TextField
                            className='edittextfield'
                            required
                            label="Name"
                            variant="outlined"
                            fullWidth
                            value={editedUserData?.name || ''}
                            onChange={(e) => setEditedUserData({ ...editedUserData, name: e.target.value })}
                        />
                        <TextField
                            className='edittextfield'
                            required
                            label="Username"
                            variant="outlined"
                            fullWidth
                            value={editedUserData?.username || ''}
                            onChange={(e) => setEditedUserData({ ...editedUserData, username: e.target.value })}
                        />
                        <TextField
                            className='edittextfield'
                            required
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={editedUserData?.email || ''}
                            onChange={(e) => setEditedUserData({ ...editedUserData, email: e.target.value })}
                        />
                        <TextField
                            className='edittextfield'
                            required
                            label="Phone"
                            variant="outlined"
                            fullWidth
                            value={editedUserData?.phone || ''}
                            onChange={(e) => setEditedUserData({ ...editedUserData, phone: e.target.value })}
                        />
                        <Button variant='contained' sx={{
                            textTransform: "capitalize", paddingInline: "15px", fontSize: "16px"
                        }} type="submit">Save Changes</Button>
                    </form>
                </Box>
            </Modal>
        </>
    )
}
export default UserTable;