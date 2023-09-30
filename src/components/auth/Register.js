import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import { registerAdmin } from '../actions/actionCreators/adminActions';
import Header from './Header';

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    minWidth: 275,
    display: 'flex',
    justifyContent: 'center',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function Register() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, setState] = useState({
    email: '',
    password: '',
    repeat_password: '',
  });
  const { email, password, repeat_password } = state;

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onRegister = async (e) => {
    e.preventDefault();

    if (!password || !repeat_password || !email) {
      return alert('Incomplete form!');
    }

    const params = {
      email,
      password,
      passwordCheck: repeat_password,
    };

    const res = await dispatch(registerAdmin(params));

    if (!res?.success) {
      return alert(res?.message);
    }

    alert(res?.message);
    history.push('/login');
  };

  return (
    <>
      <Header />
      <div
        style={{
          marginTop: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Card
          style={{
            minWidth: '500',
            minHeight: 'auto',
            padding: '50px',
          }}>
          {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity={severity ? 'success' : 'error'}>
              {message}
            </Alert>
          </Snackbar> */}
          <CardContent>
            <Typography
              variant='h4'
              gutterBottom
              style={{ textAlign: 'center' }}>
              Register
            </Typography>
            <form onSubmit={onRegister}>
              <div>
                <TextField
                  id='email'
                  name='email'
                  type='email'
                  label='Email'
                  size='small'
                  required
                  value={email}
                  onChange={handleChange}
                  variant='outlined'
                />
              </div>
              <br />
              <div>
                <TextField
                  id='password'
                  required
                  size='small'
                  name='password'
                  label='Password'
                  value={password}
                  type='password'
                  onChange={handleChange}
                  placeholder='Enter password'
                  variant='outlined'
                />
              </div>
              <br />
              <div>
                <TextField
                  id='repeat_password'
                  name='repeat_password'
                  required
                  label='Repeat Password'
                  value={repeat_password}
                  type='password'
                  size='small'
                  onChange={handleChange}
                  placeholder='Re-enter password'
                  variant='outlined'
                />
              </div>
              <br />
              <Button
                type='submit'
                autoFocus
                color='primary'
                variant='contained'
                size='small'>
                Register
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
