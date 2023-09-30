import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import {
  TextField,
  Button,
  CardActions,
  Card,
  Typography,
  CardContent,
  Snackbar,
  MenuItem,
} from '@mui/material';
import { createCompany } from '../../actions/actionCreators/companyActions';
import { getAllUsers } from '../../actions/actionCreators/userActions';
import MuiAlert from '@mui/material/Alert';
import HeaderLoggedIn from '../headers/HeaderLoggedIn';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      // margin: theme.spacing(1),
      width: '25ch',
    },
  },
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

export default function AddCompany() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { admin, token } = useSelector((state) => state.admin);
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [state, setState] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    companyOwner: '',
    noCompanyUsers: [],
  });
  const { name, companyOwner, email, phoneNumber, noCompanyUsers } = state;
  const { users } = useSelector((state) => state.user);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const getResponse_1 = async () => {
    const token = localStorage.getItem('bizstruc-adminpanel-token');

    if (!token) {
      return history.push('/login');
    }

    dispatch(getAllUsers(token));
  };

  useEffect(() => {
    getResponse_1();
  }, []);

  const getResponse_2 = async (e) => {
    const token = localStorage.getItem('bizstruc-adminpanel-token');

    if (!token) {
      return history.push('/login');
    }
  };

  useEffect(() => {
    getResponse_2();
  }, []);

  useEffect(() => {
    if (users?.length > 0) {
      let arr = [];

      arr = users.filter(
        (user) => user?.companyId == null && user?.employId == null,
      );

      setState({ ...state, noCompanyUsers: arr });
    }
  }, [users]);

  const onCompanyAdd = async (e) => {
    e.preventDefault();

    try {
      const params = {
        name,
        email,
        phoneNumber,
        companyOwner,
      };
      const res = await dispatch(createCompany(params, token));

      // setOpen(true);
      // setSeverity(res.success);
      // setMessage(res.message);

      alert(res?.message);

      if (res?.success) {
        history.push('/users');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <>
      {console.log(noCompanyUsers, 'noCompanyUsers')}
      <HeaderLoggedIn
        Component={
          <div
            style={{
              marginTop: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity={severity ? 'success' : 'error'}>
                {message}
              </Alert>
            </Snackbar>
            <Card
              style={{
                minWidth: '500',
                minHeight: 'auto',
                padding: '50px',
              }}>
              <CardContent>
                <Typography
                  variant='h4'
                  gutterBottom
                  style={{ textAlign: 'center' }}>
                  Add Company
                </Typography>
                <form onSubmit={onCompanyAdd}>
                  <div>
                    <TextField
                      label='Company Email'
                      variant='outlined'
                      size='small'
                      fullWidth
                      name='email'
                      id='email'
                      required
                      type='email'
                      onChange={onChange}
                      value={email}
                    />
                  </div>
                  <br />
                  <div>
                    <TextField
                      label='Company Name'
                      value={name}
                      name='name'
                      size='small'
                      id='name'
                      required
                      fullWidth
                      onChange={onChange}
                      variant='outlined'
                    />
                  </div>
                  <br />
                  <div>
                    <TextField
                      label='Company Phone Number'
                      fullWidth
                      id='phoneNumber'
                      name='phoneNumber'
                      size='small'
                      required
                      variant='outlined'
                      value={phoneNumber}
                      onChange={onChange}
                    />
                  </div>
                  <br />
                  <div>
                    <TextField
                      select
                      id='companyOwner'
                      variant='outlined'
                      name='companyOwner'
                      label='Company Owner'
                      size='small'
                      fullWidth
                      value={companyOwner}
                      onChange={onChange}
                      helperText='Please select a company owner'>
                      {noCompanyUsers.map((user, key) => (
                        <MenuItem key={key} value={user._id}>
                          {user.firstName + ' ' + user.lastName}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                  <br />
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                    }}>
                    <Button
                      variant='contained'
                      color='primary'
                      type='submit'
                      size='small'>
                      Add Company
                    </Button>
                    <Button
                      variant='contained'
                      color='primary'
                      size='small'
                      onClick={() => history.goBack()}>
                      Back
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        }
      />
    </>
  );
}
