import React from 'react';
import Header from './headers/Header';
import { Paper, Typography, Box } from '@mui/material';
import { SearchOffOutlined } from '@mui/icons-material';

export default function NotFound() {
  return (
    <div>
      <Header />
      <Paper>
        <Typography
          style={{ textAlign: 'center', padding: '100px' }}
          variant='h3'>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <SearchOffOutlined color='inherit' fontSize='x-large' />
            <span>Page Not Found!</span>
          </div>
        </Typography>
      </Paper>
    </div>
  );
}
