import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from 'src/states/slices/auth';
import authApi from 'src/states/api/auth';

import GuestPageFooter from 'src/components/GuestFooter'
import GuestHeader from 'src/components/GuestHeader'
import { toast } from 'react-toastify'
import logo from 'src/assets/images/logo.png';

import * as Yup from 'yup';


const Login = () => {
  const { userInfo } = useSelector(state => state.auth);
  if (userInfo?.id) {
    return <Navigate to="/dashboard" />
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = authApi.useLoginMutation();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    return await login(values).unwrap().then(res => {
      dispatch(setCredentials({
        userInfo: res.user,
        token: res.accessToken
      }))
      navigate('/dashboard')
      toast.success('Login successful')
    }).catch(e => {
      if (e.status == 422) {
        toast.error(e?.data?.message || 'Invalid credentials')
      }
    });

  };

  return (
    <div className="min-vh-100 d-flex flex-column gap-5">
      <GuestHeader />

      <div className="bg-body-tertiary  d-flex flex-grow-1 flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={8}>
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ isSubmitting }) => (
                        <Form>
                          <h1>Login</h1>
                          <p className="text-body-secondary">Sign In to your account</p>
                          <CInputGroup>
                            <CInputGroupText>
                              <CIcon icon={cilUser} />
                            </CInputGroupText>
                            <Field
                              name="email"
                              type="email"
                              placeholder="Email"
                              autoComplete="email"
                              as={CFormInput}
                            />
                          </CInputGroup>
                          <span className='fst-italic fs-6 p-0 m-0' style={{
                            fontSize: '0.8rem',
                          }}>
                            <ErrorMessage name="email" component="div" className="text-danger" />
                          </span>

                          <CInputGroup className='mt-3'>
                            <CInputGroupText>
                              <CIcon icon={cilLockLocked} />
                            </CInputGroupText>
                            <Field
                              name="password"
                              type="password"
                              placeholder="Password"
                              autoComplete="current-password"
                              as={CFormInput}
                            />
                          </CInputGroup>
                          <span className='fst-italic fs-6 p-0 m-0' style={{
                            fontSize: '0.8rem',
                          }}>
                            <ErrorMessage name="password" component="div" className="text-danger" />
                          </span>

                          <CRow className='mt-4'>
                            <CCol xs={6}>
                              <CButton type="submit" color="primary" className="px-4" disabled={isSubmitting || isLoading}>
                                {isSubmitting || isLoading ? 'Logging in...' : 'Login'}
                              </CButton>
                            </CCol>
                            <CCol xs={6} className="text-right">
                              <CButton color="link" className="px-0">
                                Forgot password?
                              </CButton>
                            </CCol>
                          </CRow>
                        </Form>
                      )}
                    </Formik>
                  </CCardBody>
                </CCard>
                <CCard className="text-white bg-primary py-5 d-none d-lg-block" style={{
                  width: '44%'
                }}>
                  <CCardBody className="text-center">
                    <img src={logo} alt="tupt-logo" width="100" />
                    <h2 className="fw-bolder">TUP-T Dashboard</h2>
                    <p className="text-white">
                      Welcome to the TUP Taguig Dashboard! Please login to continue.
                    </p>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>

    </div>
  );
};

export default Login;