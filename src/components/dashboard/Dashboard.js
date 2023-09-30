import React from 'react';
import HeaderLoggedIn from '../headers/HeaderLoggedIn';
import NewUsers from './NewUsers';
import NewCompanies from './NewCompanies';

export default function Dashboard() {
  return (
    <HeaderLoggedIn
      Component={
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <NewUsers />
          <NewCompanies />
        </div>
      }
    />
  );
}
