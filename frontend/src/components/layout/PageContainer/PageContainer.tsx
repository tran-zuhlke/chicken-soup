import React from 'react';
import './PageContainer.css';
import Footer from '../Footer/Footer';
import { User } from '../../../types/User';
import { BiSolidUser } from 'react-icons/bi';

interface Props {
  user?: User;
  children: React.ReactNode;
}

const PageContainer: React.FC<Props> = ({ user, children }) => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Security Command Center</h1>
        {user !== undefined && (
          <div className="user-container btn btn-outline-dark">
            <BiSolidUser size="20" />
            {user.firstname}
          </div>
        )}
      </div>
      {children}
      <Footer />
    </div>
  );
};
export default PageContainer;
