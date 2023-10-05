import React, { useContext } from 'react';
import './PageContainer.css';
import Footer from '../Footer/Footer';
import { User } from '../../../types/User';
import { BiSolidUser } from 'react-icons/bi';
import { UserContext } from '../../../context/UserContext';

interface Props {
  user?: User;
  title?: string;
  children: React.ReactNode;
}

const PageContainer: React.FC<Props> = ({ user, title, children }) => {
  const { token, setToken } = useContext(UserContext);

  return (
    <UserContext.Provider value={{ token, setToken }}>
      <div className="page-container">
        <div className="page-header">
          <h1>{title}</h1>
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
    </UserContext.Provider>
  );
};
export default PageContainer;
