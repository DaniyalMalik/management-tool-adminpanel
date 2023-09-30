import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { makeStyles } from '@mui/styles';
import {
  IconButton,
  Box,
  Button,
  TableCell,
  TableRow,
  Table,
  TableHead,
  TableContainer,
  Avatar,
  TableBody,
  Paper,
  DialogTitle,
  Autocomplete,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  TextField,
} from '@mui/material';
import {
  EditOutlined,
  DeleteOutlined,
  VisibilityOutlined,
} from '@mui/icons-material';
import {
  deleteUser,
  getAllUsers,
  getAllUsersByEmployId,
} from '../../actions/actionCreators/userActions';
import HeaderLoggedIn from '../headers/HeaderLoggedIn';
import { getCompanies } from '../../actions/actionCreators/companyActions';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
  },
  inline: {
    display: 'inline',
  },
  display: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'baseline',
  },
}));

export default function Users() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  const { companies } = useSelector((state) => state.companies);
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const { admin, token } = useSelector((state) => state.admin);
  const [selectedUser, setSelectedUser] = useState('');

  const getResponse = async () => {
    const token = localStorage.getItem('bizstruc-adminpanel-token');

    if (!token) {
      return history.push('/login');
    }

    dispatch(getAllUsers(token));
    await dispatch(getCompanies(token));
  };

  useEffect(() => {
    getResponse();
  }, []);

  const onDeleteUser = async (id, e) => {
    e.preventDefault();

    const res = await dispatch(deleteUser(id, token));

    alert(res?.message);
    handleClose();
  };

  const onEditUser = (id, e) => {
    e.preventDefault();

    history.push(`/users/edit/${id}`);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const onChange = (id, e) => {
    if (id) {
      dispatch(getAllUsersByEmployId(id, token));
    } else {
      dispatch(getAllUsers(token));
    }
  };

  const onViewCompany = (id, e) => {
    e.preventDefault();

    history.push(`/users/view/${id}`);
  };

  return (
    <HeaderLoggedIn
      Component={
        <>
          <Dialog
            open={dialogOpen}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'>
            <DialogTitle id='alert-dialog-title'>{'Are you sure?'}</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                This will permanently delete the user and all his/her data!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button size='small' onClick={handleClose} color='primary'>
                Cancel
              </Button>
              <Button
                size='small'
                onClick={(e) => onDeleteUser(selectedUser._id, e)}
                color='primary'
                autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
          <Box className={classes.display}>
            <Paper sx={{ width: '80%', overflow: 'hidden' }}>
              <Autocomplete
                disablePortal
                id='combo-box-demo'
                options={companies}
                fullWidth
                onChange={(event, company) => onChange(company?._id)}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField {...params} label='Companies' />
                )}
              />
              <TableContainer>
                <Table stickyHeader aria-label='sticky table'>
                  <TableHead>
                    <TableRow>
                      <TableCell align='center' size='small'>
                        <b>Serial No.</b>
                      </TableCell>
                      <TableCell align='center' style={{ minWidth: 170 }}>
                        <b>Name</b>
                      </TableCell>
                      <TableCell align='center' style={{ minWidth: 170 }}>
                        <b>Email</b>
                      </TableCell>
                      <TableCell align='center' style={{ minWidth: 170 }}>
                        <b>Phone Number</b>
                      </TableCell>
                      <TableCell align='center' style={{ minWidth: 170 }}>
                        <b>Actions</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users &&
                      users.map((user, key) => (
                        <TableRow hover tabIndex={-1} key={key}>
                          <TableCell align='center' size='small'>
                            <b>{key + 1}</b>
                          </TableCell>
                          <TableCell
                            align='center'
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Avatar
                              alt={user?.firstName + ' ' + user?.lastName}
                              src={user?.imagePath}
                            />
                            &nbsp;
                            &nbsp;
                            <span>
                              {user?.firstName + ' ' + user?.lastName}
                            </span>
                          </TableCell>
                          <TableCell align='center'>{user?.email}</TableCell>
                          <TableCell align='center'>
                            {user?.phoneNumber}
                          </TableCell>
                          <TableCell align='center'>
                            <IconButton
                              aria-label='delete'
                              color='primary'
                              onClick={() => {
                                setDialogOpen(true);
                                setSelectedUser(user);
                              }}>
                              <DeleteOutlined fontSize='small' />
                            </IconButton>
                            <IconButton
                              aria-label='edit'
                              onClick={(e) => onViewCompany(user?._id, e)}>
                              <VisibilityOutlined
                                color='primary'
                                fontSize='small'
                              />
                            </IconButton>
                            <IconButton
                              aria-label='edit'
                              color='primary'
                              onClick={(e) => onEditUser(user?._id, e)}>
                              <EditOutlined fontSize='small' />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
            <Button
              variant='contained'
              size='small'
              color='primary'
              onClick={() => history.push('/users/add')}>
              Add User
            </Button>
          </Box>
        </>
      }
    />
  );
}
