import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/styles';
import { TextField, Box, Button, Snackbar } from '@mui/material';
import {
  updateAdminPassword,
  fetchAdminInfo,
} from '../../actions/actionCreators/adminActions';
import MuiAlert from '@mui/material/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export default function UpdatePassword() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(false);
  const [severity, setSeverity] = useState('');
  const { token, admin } = useSelector((state) => state.admin);
  const [state, setState] = useState({
    oldPassword: '',
    password: '',
    passwordCheck: '',
  });
  const { passwordCheck, password, oldPassword } = state;

  useEffect(() => {
    let token = localStorage.getItem('bizstruc-adminpanel-token');

    dispatch(fetchAdminInfo(token));
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      oldPassword,
      password,
      passwordCheck,
    };
    const res = await dispatch(updateAdminPassword(admin?._id, data, token));

    alert(res.message);

    if (res?.success) {
      setState({ ...state, passwordCheck: '', password: '', oldPassword: '' });
    }
  };

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity ? 'success' : 'error'}>
          {message}
        </Alert>
      </Snackbar>
      <form
        sx={{
          '& > *': {
            m: 1,
            width: '25ch',
          },
        }}
        noValidate
        autoComplete='off'
        onSubmit={onSubmit}>
        <Box sx={{ m: 3, minWidth: '100%' }}>
          <TextField
            label='Old Password'
            value={oldPassword}
            name='oldPassword'
            fullWidth
            required
            type='password'
            onChange={onChange}
            variant='outlined'
          />
        </Box>
        <Box sx={{ m: 3, minWidth: '100%' }}>
          <TextField
            label='New Password'
            variant='outlined'
            fullWidth
            required
            type='password'
            name='password'
            value={password}
            onChange={onChange}
          />
        </Box>
        <Box sx={{ m: 3, minWidth: '100%' }}>
          <TextField
            label='Repeat New Password'
            fullWidth
            type='password'
            variant='outlined'
            value={passwordCheck}
            required
            name='passwordCheck'
            onChange={onChange}
          />
        </Box>
        <Box sx={{ m: 3, minWidth: '100%' }}>
          <Button
            fullWidth
            type='submit'
            size='small'
            color='primary'
            variant='contained'>
            Update Password
          </Button>
        </Box>
      </form>
    </>
  );
}
