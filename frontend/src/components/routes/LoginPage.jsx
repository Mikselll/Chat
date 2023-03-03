import React, { useState, useEffect, useRef } from 'react';
import {
  Form, Button, Container, Row, Card, Col, Image, Navbar,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import axios from 'axios';
import useAuth from '../../hook/index.js';
import image from '../../assets/avatar.jpg';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const inputEl = useRef();
  const auth = useAuth();
  const [error401, setError] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object({
      username: yup.string().required(),
      password: yup.string().required(),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post('/api/v1/login', values);
        auth.logIn(data);
        navigate('/');
      } catch (error) {
        if (error.response.status === 401) {
          setError(true);
          return;
        }
        toast.error(t('errors.toastError'));
      }
    },
  });

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  return (
    <div className="d-flex flex-column h-100">
      <Navbar bg="white" expand="lg" className="shadow-sm">
        <Container>
          <a className="navbar-brand" to="/">{t('header.brand')}</a>
        </Container>
      </Navbar>
      <Container className="h-100" fluid>
        <Row className="justify-content-center align-content-center h-100">
          <Col xs={12} md={8} xxl={6}>
            <Card className="shadow-sm">
              <Card.Body as={Row} className="p-5">
                <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                  <Image src={image} className="rounded-circle" alt="Войти" />
                </Col>
                <Form
                  className="col-12 col-md-6 mt-3 mt-mb-0"
                  onSubmit={formik.handleSubmit}
                >
                  <h1 className="text-center mb-4">{t('login.title')}</h1>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      id="username"
                      name="username"
                      type="username"
                      required
                      placeholder={t('login.username')}
                      ref={inputEl}
                      value={formik.values.username}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      isInvalid={error401}
                    />
                    <Form.Label htmlFor="username">{t('login.username')}</Form.Label>
                  </Form.Group>
                  <Form.Group className="form-floating mb-4">
                    <Form.Control
                      id="password"
                      name="password"
                      type="password"
                      required
                      placeholder={t('login.password')}
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      isInvalid={error401}
                    />
                    <Form.Label htmlFor="password">{t('login.password')}</Form.Label>
                    <Form.Control.Feedback className="invalid-tooltip">
                      {t('errors.error401')}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="outline-primary"
                    className="w-100 mb-3"
                  >
                    {t('login.button')}
                  </Button>
                </Form>
              </Card.Body>
              <Card.Footer className="p-4">
                <div className="text-center">
                  <span>{t('login.footerText')}</span>
                  <a href="/signup">{t('login.footerLink')}</a>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
