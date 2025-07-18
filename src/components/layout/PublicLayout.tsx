import React from 'react';
import Navbar from '../navbar/Navbar';

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default PublicLayout; 