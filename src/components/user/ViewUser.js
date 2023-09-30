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
import { getSingleUser } from '../../actions/actionCreators/userActions';
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
    marginTop: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardRoot: {
    minWidth: '500',
    minHeight: 'auto',
    padding: '50px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  displayFlex: {
    display: 'flex',
  },
  display: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  buttonCenter: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default function ViewUser() {
  const classes = useStyles();
  const history = useHistory();
  const { admin, token } = useSelector((state) => state.admin);
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const dispatch = useDispatch();

  const getResponse = async (e) => {
    const token = localStorage.getItem('bizstruc-adminpanel-token');

    if (!token) {
      return history.push('/login');
    }

    dispatch(getSingleUser(id, token));
  };

  useEffect(() => {
    getResponse();
  }, []);

  return (
    <>
      <HeaderLoggedIn
        Component={
          <div className={classes.root}>
            <Card className={classes.cardRoot}>
              <CardContent>
                <Typography
                  variant='h4'
                  gutterBottom
                  className={classes.textCenter}
                  style={{ textAlign: 'center' }}>
                  User
                </Typography>
                <div className={classes.displayFlex}>
                  <Typography variant='body1'>
                    <b>Email:</b>
                  </Typography>
                  &nbsp;
                  <Typography variant='body1'>{user?.email}</Typography>
                </div>
                <br />
                <div className={classes.displayFlex}>
                  <Typography variant='body1'>
                    <b>Name:</b>
                  </Typography>
                  &nbsp;
                  <Typography variant='body1'>
                    {user?.firstName + ' ' + user?.lastName}
                  </Typography>
                </div>
                <br />
                <div className={classes.displayFlex}>
                  <Typography variant='body1'>
                    <b>Phone Number:</b>
                  </Typography>
                  &nbsp;
                  <Typography variant='body1'>{user?.phoneNumber}</Typography>
                </div>
                <br />
                <div className={classes.displayFlex}>
                  <Typography variant='body1'>
                    <b>Subscribed:</b>
                  </Typography>
                  &nbsp;
                  <Typography variant='body1'>
                    {user?.subscribed ? 'Yes' : 'No'}
                  </Typography>
                </div>
                <br />
                <div className={classes.displayFlex}>
                  <Typography variant='body1'>
                    <b>Created At:</b>
                  </Typography>
                  &nbsp;
                  <Typography variant='body1'>
                    {new Date(user?.createdAt).toLocaleString()}
                  </Typography>
                </div>
                <br />
                <div className={classes.displayFlex}>
                  <Typography variant='body1'>
                    <b>Registered At:</b>
                  </Typography>
                  &nbsp;
                  <Typography variant='body1'>{user?.registeredAt}</Typography>
                </div>
                <br />
                <div className={classes.displayFlex}>
                  <Typography variant='body1'>
                    <b>Employ:</b>
                  </Typography>
                  &nbsp;
                  <Typography variant='body1'>
                    {user?.companyId?.name
                      ? user.companyId.name
                      : user?.employId?.name}
                  </Typography>
                </div>
                <br />
                <div className={classes.displayFlex}>
                  <Typography variant='body1'>
                    <b>Attachments Size:</b>
                  </Typography>
                  &nbsp;
                  <Typography variant='body1'>
                    {(user?.attachmentsSize / 1024 / 1024).toFixed(4)}
                    &nbsp;<b>MB</b>
                  </Typography>
                </div>
                <br />
                <div className={classes.buttonCenter}>
                  <Button
                    variant='contained'
                    color='primary'
                    size='small'
                    onClick={() => history.goBack()}>
                    Back
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        }
      />
    </>
  );
}
