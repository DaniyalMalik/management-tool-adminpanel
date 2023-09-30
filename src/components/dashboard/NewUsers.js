import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Typography,
  List,
  ListItem,
  Divider,
  Paper,
  ListItemText,
} from '@mui/material';
import { getTodaysUsers } from '../../actions/actionCreators/userActions';

export default function Dashboard() {
  const { admin, token } = useSelector((state) => state.admin);
  const { todayUsers } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('bizstruc-adminpanel-token');
    const date = new Date();
    const month = date.getMonth() + 1;

    dispatch(
      getTodaysUsers(
        date.getDate() + '/' + month + '/' + date.getFullYear(),
        token,
      ),
    );
  }, []);

  return (
    <Paper
      style={{
        padding: '20px',
        borderRadius: '20px',
        minWidth: '300px',
      }}>
      <Typography variant='h5' gutterBottom>
        Today's Registered Users
      </Typography>
      <List
        style={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          maxHeight: 300,
          '& ul': { padding: 0 },
        }}
        subheader={<li />}>
        <Divider variant='fullWidth' component='li' />
        {todayUsers?.length > 0 ? (
          todayUsers?.map((user, key) => (
            <List
              key={key}
              sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
              }}>
              <ListItem key={key} alignItems='flex-start'>
                <ListItemText
                  primary={
                    <>
                      <Typography variant='body2'>
                        <b>Name:</b> {user?.firstName + ' ' + user?.lastName}
                      </Typography>
                    </>
                  }
                  secondary={
                    <>
                      <Typography variant='body2' color='text.primary'>
                        <b>Email:</b> {user?.email}
                      </Typography>
                      <Typography variant='body2' color='text.primary'>
                        <b>Phone Number:</b> {user?.phoneNumber}
                      </Typography>
                      <Typography variant='body2' color='text.primary'>
                        <b>Company:</b>{' '}
                        {user?.employId
                          ? user.employId.name
                          : user?.companyId?.name}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              <Divider variant='fullWidth' component='li' />
            </List>
          ))
        ) : (
          <Typography variant='h6' style={{ textAlign: 'center' }}>
            No users registered today!
          </Typography>
        )}
      </List>
    </Paper>
  );
}
