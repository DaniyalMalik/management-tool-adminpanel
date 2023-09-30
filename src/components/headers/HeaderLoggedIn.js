import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@mui/styles';
import {
  Divider,
  IconButton,
  ListItem,
  Box,
  List,
  ListItemText,
  Button,
  AppBar,
  CssBaseline,
  Typography,
  Toolbar,
  ListItemIcon,
  Drawer,
} from '@mui/material';
import {
  PeopleOutlined,
  BusinessOutlined,
  AccountBoxOutlined,
  Menu,
  HomeOutlined,
  Logout,
} from '@mui/icons-material';
import PropTypes from 'prop-types';
import logo from '../../assets/logo.gif';

const drawerWidth = 240;

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
  link: {
    textDecoration: 'none',
    color: '#ffffff',
  },
  sideBarLink: {
    textDecoration: 'none',
    color: '#000000',
  },
}));

export default function HeaderLoggedIn(props) {
  const classes = useStyles();
  const history = useHistory();
  const { window, Component } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const onLogOut = (e) => {
    localStorage.removeItem('bizstruc-adminpanel-token');
    alert('Logged Out!');
    history.push('/login');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        color='primary'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}>
        <Toolbar
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}>
            <Menu />
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            <Link to='/home' className={classes.link}>
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
          <IconButton color='inherit' edge='end' onClick={onLogOut}>
            {/* <Typography variant='h6'>Logout</Typography>
            &nbsp; */}
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label='mailbox folders'>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}>
          <List>
            <Toolbar />
            <Divider />
            <Link to='/home' className={classes.sideBarLink}>
              <ListItem button>
                <ListItemIcon>
                  <HomeOutlined />
                </ListItemIcon>
                <ListItemText primary='Home' />
              </ListItem>
            </Link>
            <Link to='/users' color='primary' className={classes.sideBarLink}>
              <ListItem button>
                <ListItemIcon>
                  <PeopleOutlined />
                </ListItemIcon>
                <ListItemText primary='Users' />
              </ListItem>
            </Link>
            <Link to='/companies' className={classes.sideBarLink}>
              <ListItem button>
                <ListItemIcon>
                  <BusinessOutlined />
                </ListItemIcon>
                <ListItemText primary='Companies' />
              </ListItem>
            </Link>
            {/* <Link
              to='/profile'
              style={{ textDecoration: 'none'>
              <ListItem button>
                <ListItemIcon>
                  <AccountBoxOutlined />
                </ListItemIcon>
                <ListItemText primary='Profile' />
              </ListItem>
            </Link> */}
          </List>
          <Divider />
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open>
          <List>
            <Toolbar />
            <Divider />
            <Link to='/home' className={classes.sideBarLink}>
              <ListItem button>
                <ListItemIcon>
                  <HomeOutlined color='primary' />
                </ListItemIcon>
                <ListItemText primary='Home' />
              </ListItem>
            </Link>
            <Link to='/users' className={classes.sideBarLink}>
              <ListItem button>
                <ListItemIcon>
                  <PeopleOutlined color='primary' />
                </ListItemIcon>
                <ListItemText primary='Users' />
              </ListItem>
            </Link>
            <Link to='/companies' className={classes.sideBarLink}>
              <ListItem button>
                <ListItemIcon>
                  <BusinessOutlined color='primary' />
                </ListItemIcon>
                <ListItemText primary='Companies' />
              </ListItem>
            </Link>
            {/* <Link
              to='/profile'
              style={{ textDecoration: 'none'>
              <ListItem button>
                <ListItemIcon>
                  <AccountBoxOutlined />
                </ListItemIcon>
                <ListItemText primary='Profile' />
              </ListItem>
            </Link> */}
          </List>
          <Divider />
        </Drawer>
      </Box>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}>
        <Toolbar />
        {Component}
      </Box>
    </Box>
  );
}

HeaderLoggedIn.propTypes = {
  window: PropTypes.func,
};
