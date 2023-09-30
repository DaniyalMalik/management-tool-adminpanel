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
import { getTodaysCompanies } from '../../actions/actionCreators/companyActions';

export default function Dashboard() {
  const { admin, token } = useSelector((state) => state.admin);
  const { todayCompanies } = useSelector((state) => state.companies);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('bizstruc-adminpanel-token');
    const date = new Date();
    const month = date.getMonth() + 1;

    dispatch(
      getTodaysCompanies(
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
        Today's Registered Companies
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
        {todayCompanies?.length > 0 ? (
          todayCompanies?.map((company, key) => (
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
                        <b>Name:</b> {company?.name}
                      </Typography>
                    </>
                  }
                  secondary={
                    <>
                      <Typography variant='body2' color='text.primary'>
                        <b>Email:</b> {company?.email}
                      </Typography>
                      <Typography variant='body2' color='text.primary'>
                        <b>Phone Number:</b> {company?.phoneNumber}
                      </Typography>
                      <Typography variant='body2' color='text.primary'>
                        <b>Company Owner:</b>{' '}
                        {company?.companyOwner?.firstName +
                          ' ' +
                          company?.companyOwner?.lastName}
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
            No todayCompanies registered today!
          </Typography>
        )}
      </List>
    </Paper>
  );
}
