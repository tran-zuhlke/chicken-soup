import React from 'react';
import './Footer.css';
import { getApplicationVersion } from '../../../utils/getApplicationVersion';

const Footer: React.FC = () => {
  return <div className="footer">{`Application version: ${getApplicationVersion()}`}</div>;
};
export default Footer;
