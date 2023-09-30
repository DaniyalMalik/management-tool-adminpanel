import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Toolbar, Box, AppBar, Typography, Button } from '@mui/material';
import logo from '../../assets/logo.gif';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: '#ffffff',
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar position='static' color='primary'>
      <Toolbar>
        <Typography variant='h6' className={classes.title}>
          <Link to='/login' className={classes.link}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'initial',
              }}>
              <img
                style={{
                  height: '30px',
                  width: '40px',
                }}
                src={logo}
              />
              <Typography variant='h5'>BIZSTRUC</Typography>
            </div>
          </Link>
        </Typography>
        {/* <Box>
          <Button
            color='inherit'
            size='small'
            onClick={() => history.push('/login')}>
            Login
          </Button>
          <Button
            size='small'
            color='inherit'
            onClick={() => history.push('/register')}>
            Register
          </Button>
        </Box> */}
      </Toolbar>
    </AppBar>
  );
}
