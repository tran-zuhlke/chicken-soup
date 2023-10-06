import './LoginPage.css';
import React, { useContext } from 'react';
import PageContainer from '../../layout/PageContainer/PageContainer';
import { writeAuthorizationDetailsToSessionStorage } from './writeAuthorizationDetailsToSessionStorage';
import { ExceptionResponse } from '../../../api/dto/ExceptionResponse';
import toast from 'react-hot-toast';
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FORM_MAX_CHARACTERS, FORM_MAX_CHARACTERS_EXCEEDED_MESSAGE, FORM_REQUIRED_FIELD_MESSAGE } from './constants';
import { UserContext } from '../../../context/UserContext';
import { getUserProfile, login } from '../../../api/users.api';
import { useNavigate } from 'react-router-dom';
import { Page } from '../../../navigation/Page';
import { basePathPrefix } from '../../../navigation/basePathPrefix';

const LoginPage: React.FC = () => {
  const { token, setToken } = useContext(UserContext);
  const navigate = useNavigate();

  const onVerifyAuthorization = async (username: string, password: string) => {
    try {
      const { access_token } = await login(username, password);
      setToken(access_token);
      await writeAuthorizationDetailsToSessionStorage(access_token, username);

      const userProfile = await getUserProfile();
      console.log(userProfile);

      navigate(`${basePathPrefix}/${Page.HOME}`);
    } catch (e) {
      toast.error(`Token validation failed: ${(e as ExceptionResponse).message}`);
      writeAuthorizationDetailsToSessionStorage('', '');
      console.error('Error validating project token: ', e);
    }
  };

  const authorizationForm = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(FORM_MAX_CHARACTERS, FORM_MAX_CHARACTERS_EXCEEDED_MESSAGE)
        .required(FORM_REQUIRED_FIELD_MESSAGE),
      password: Yup.string().required(FORM_REQUIRED_FIELD_MESSAGE),
    }),
    onSubmit: async (values) => {
      onVerifyAuthorization(values.username, values.password);
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <PageContainer>
      <div className="login-page-container">
        <h1 className="text-center">Login</h1>

        <Form
          onSubmit={(e) => {
            e.preventDefault();
            authorizationForm.handleSubmit();
          }}
          style={{ maxWidth: '600px', textAlign: 'initial', margin: 'auto' }}
          className={'w-25'}
        >
          <FormGroup>
            <Label>Username</Label>
            <Input
              name="username"
              type="text"
              defaultValue={authorizationForm.initialValues.username}
              onChange={authorizationForm.handleChange}
              invalid={authorizationForm.errors.username !== undefined}
            />
            <FormFeedback>{authorizationForm.errors.username}</FormFeedback>
          </FormGroup>

          <FormGroup>
            <Label>Password</Label>
            <Input
              name="password"
              type="password"
              defaultValue={authorizationForm.initialValues.password}
              onChange={authorizationForm.handleChange}
              invalid={authorizationForm.errors.password !== undefined}
            />
            <FormFeedback>{authorizationForm.errors.password}</FormFeedback>
          </FormGroup>

          <div style={{ marginTop: '45px', display: 'flex', justifyContent: 'space-around' }}>
            <Button type="submit">Login</Button>
          </div>
        </Form>
      </div>
    </PageContainer>
  );
};
export default LoginPage;
