import React, { useState, useEffect, useRef } from 'react';
import {
  Form, Button, Container, Row, Card, Col, Image,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';
import * as yup from 'yup';
import axios from 'axios';
import { useAuth } from '../hooks/index.js';
import routes from '../routes.js';
import image from '../assets/avatar_1.jpg';
import Header from './Header.jsx';

const Signup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const rollbar = useRollbar();
  const inputEl = useRef();
  const auth = useAuth();
  const [conflictError, setError] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object({
      username: yup.string().min(3, t('errors.minMax')).max(20, t('errors.minMax')).required(t('errors.required')),
      password: yup.string().min(6, t('errors.min')).required(t('errors.required')),
      confirmPassword: yup.string().oneOf([yup.ref('password')], t('errors.oneOf')),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(routes.signupPath(), values);
        auth.logIn(data);
        setError(false);
        navigate(routes.chatPagePath());
      } catch (error) {
        rollbar.error(error);
        if (!error.isAxiosError) {
          toast.error(t('errors.unknownError'));
        }
        if (error.response.status === 409) {
          setError(true);
        }
        toast.error(t('errors.networkError'));
      }
    },
  });

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <Container className="h-100" fluid>
        <Row className="justify-content-center align-content-center h-100">
          <Col xs={12} md={8} xxl={6}>
            <Card className="shadow-sm">
              <Card.Body as={Row} className="p-5">
                <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                  <Image src={image} className="rounded-circle" alt={t('signup.title')} />
                </Col>
                <Form
                  className="col-12 col-md-6 mt-3 mt-mb-0"
                  onSubmit={formik.handleSubmit}
                >
                  <h1 className="text-center mb-4">{t('signup.title')}</h1>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      id="username"
                      name="username"
                      type="username"
                      required
                      placeholder={t('errors.minMax')}
                      ref={inputEl}
                      value={formik.values.username}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      isInvalid={formik.errors.username || conflictError}
                    />
                    <Form.Label htmlFor="username">{t('signup.username')}</Form.Label>
                    <Form.Control.Feedback className="invalid-tooltip">{conflictError ? t('errors.error409') : formik.errors.username}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      id="password"
                      name="password"
                      type="password"
                      required
                      placeholder={t('errors.min')}
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      isInvalid={formik.errors.password && formik.touched.password}
                    />
                    <Form.Label htmlFor="password">{t('signup.password')}</Form.Label>
                    <Form.Control.Feedback className="invalid-tooltip">{formik.errors.password}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      placeholder={t('errors.oneOf')}
                      value={formik.values.confirmPassword}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      isInvalid={formik.errors.confirmPassword}
                    />
                    <Form.Label htmlFor="confirmPassword">{t('signup.confirmPassword')}</Form.Label>
                    <Form.Control.Feedback className="invalid-tooltip">{formik.errors.confirmPassword}</Form.Control.Feedback>
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={formik.isSubmitting}
                    className="w-100"
                  >
                    {t('signup.button')}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signup;
