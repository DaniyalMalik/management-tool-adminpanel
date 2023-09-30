import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import {
  TextField,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Snackbar,
} from '@mui/material';
import {
  updateCompany,
  getCompany,
} from '../../actions/actionCreators/companyActions';
import MuiAlert from '@mui/material/Alert';
import HeaderLoggedIn from '../headers/HeaderLoggedIn';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.background.paper,
    width: 500,
  },
  divRoot: {
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
  display: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'baseline',
  },
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const { admin, token } = useSelector((state) => state.admin);
  const { company } = useSelector((state) => state.companies);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [value, setValue] = useState(0);
  const [state, setState] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    companyOwner: '',
  });
  const { name, companyOwner, email, phoneNumber } = state;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const getResponse = async (e) => {
    const token = localStorage.getItem('bizstruc-adminpanel-token');

    if (!token) {
      return history.push('/login');
    }

    dispatch(getCompany(id, token));
  };

  useEffect(() => {
    getResponse();
  }, []);

  useEffect(() => {
    if (company?._id) {
      setState({
        ...state,
        name: company.name,
        email: company.email,
        phoneNumber: company.phoneNumber,
        companyOwner:
          company.companyOwner.firstName + ' ' + company.companyOwner.lastName,
      });
    }
  }, [company]);

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onCompanyUpdate = async (e) => {
    e.preventDefault();

    try {
      const params = {
        name,
        email,
        phoneNumber,
      };
      const res = await dispatch(updateCompany(id, params, token));

      // setOpen(true);
      // setSeverity(res.success);
      // setMessage(res.message);

      alert(res?.message);

      if (res?.success) {
        history.push('/companies');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity ? 'success' : 'error'}>
          {message}
        </Alert>
      </Snackbar>
      <HeaderLoggedIn
        Component={
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
              <CardContent>
                <Typography
                  variant='h4'
                  gutterBottom
                  style={{ textAlign: 'center' }}>
                  Edit Company
                </Typography>
                <form onSubmit={onCompanyUpdate}>
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
                      label='Company Owner'
                      fullWidth
                      required
                      id='companyOwner'
                      disabled
                      name='companyOwner'
                      size='small'
                      variant='outlined'
                      value={companyOwner}
                    />
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
                      Update Company
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
