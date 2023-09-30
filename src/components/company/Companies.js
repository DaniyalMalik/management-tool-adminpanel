import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { makeStyles, useTheme } from '@mui/styles';
import {
  Divider,
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
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  Paper,
} from '@mui/material';
import {
  EditOutlined,
  VisibilityOutlined,
  DeleteOutlined,
  LockOutlined,
  LockOpenOutlined,
} from '@mui/icons-material';
import {
  getCompanies,
  deleteCompany,
  updateCompany,
} from '../../actions/actionCreators/companyActions';
import HeaderLoggedIn from '../headers/HeaderLoggedIn';

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

export default function Companies() {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);
  const history = useHistory();
  const { admin, token } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const { companies } = useSelector((state) => state.companies);
  const [selectedCompany, setSelectedCompany] = useState('');
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const getResponse = async () => {
    const token = localStorage.getItem('bizstruc-adminpanel-token');

    if (!token) {
      return history.push('/login');
    }

    dispatch(getCompanies(token));
  };

  useEffect(() => {
    getResponse();
  }, []);

  const onCompanyBlock = async (id, value, e) => {
    e.preventDefault();

    try {
      const res = await dispatch(updateCompany(id, { locked: value }, token));

      alert(res?.message);
    } catch (e) {
      console.log(e);
    }
  };

  const onDeleteCompany = async (id, e) => {
    e.preventDefault();

    const res = await dispatch(deleteCompany(id, token));

    alert(res?.message);
    handleClose();
  };

  const onEditCompany = (id, e) => {
    e.preventDefault();

    history.push(`/companies/edit/${id}`);
  };

  const onViewCompany = (id, e) => {
    e.preventDefault();

    history.push(`/companies/view/${id}`);
  };

  const handleClose = () => {
    setDialogOpen(false);
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
                This will permanently delete the company and all it's data!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button size='small' onClick={handleClose} color='primary'>
                Cancel
              </Button>
              <Button
                size='small'
                onClick={(e) => onDeleteCompany(selectedCompany._id, e)}
                color='primary'
                autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
          <Box className={classes.display}>
            <Paper sx={{ width: '80%', overflow: 'hidden' }}>
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
                        <b>Company Owner</b>
                      </TableCell>
                      <TableCell align='center' style={{ minWidth: 170 }}>
                        <b>Actions</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {companies &&
                      companies.map((company, key) => (
                        <TableRow hover tabIndex={-1} key={key}>
                          <TableCell align='center' size='small'>
                            <b>{key + 1}</b>
                          </TableCell>
                          <TableCell align='center'>{company?.name}</TableCell>
                          <TableCell align='center'>{company?.email}</TableCell>
                          <TableCell align='center'>
                            {company?.companyOwner?.firstName +
                              ' ' +
                              company?.companyOwner?.lastName}
                          </TableCell>
                          <TableCell align='center'>
                            <IconButton
                              aria-label='delete'
                              onClick={(e) => {
                                setDialogOpen(true);
                                setSelectedCompany(company);
                              }}>
                              <DeleteOutlined
                                color='primary'
                                fontSize='small'
                              />
                            </IconButton>
                            <IconButton
                              aria-label='edit'
                              onClick={(e) => onViewCompany(company._id, e)}>
                              <VisibilityOutlined
                                color='primary'
                                fontSize='small'
                              />
                            </IconButton>
                            <IconButton
                              aria-label='edit'
                              onClick={(e) => onEditCompany(company._id, e)}>
                              <EditOutlined color='primary' fontSize='small' />
                            </IconButton>
                            {company?.locked ? (
                              <IconButton
                                aria-label='edit'
                                onClick={(e) =>
                                  onCompanyBlock(company._id, false, e)
                                }>
                                <LockOpenOutlined
                                  color='primary'
                                  fontSize='small'
                                />
                              </IconButton>
                            ) : (
                              <IconButton
                                aria-label='edit'
                                onClick={(e) =>
                                  onCompanyBlock(company._id, true, e)
                                }>
                                <LockOutlined
                                  color='primary'
                                  fontSize='small'
                                />
                              </IconButton>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
            <Button
              variant='contained'
              color='primary'
              size='small'
              onClick={() => history.push('/companies/add')}>
              Add Company
            </Button>
          </Box>
        </>
      }
    />
  );
}
