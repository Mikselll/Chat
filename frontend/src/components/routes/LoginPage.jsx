import React from 'react';
import {
  Form, Button, Container, Row, Card, Col, Image, Navbar,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import useAuth from '../../hook/index.js';
import image from '../../assets/avatar.jpg';

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object({
      username: yup.string().required('Обязательно поле'),
      password: yup.string().required('Обязательное поле'),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post('/api/v1/login', values);
        auth.logIn(data);
        navigate('/');
      } catch (err) {
        console.error(err.message);
      }
    },
  });

  return (
    <div className="d-flex flex-column h-100">
      <Navbar bg="white" expand="lg" className="shadow-sm">
        <Container>
          <a className="navbar-brand" to="/">Hexlet Chat</a>
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
                  <h1 className="text-center mb-4">Войти</h1>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      id="username"
                      name="username"
                      type="username"
                      required
                      placeholder="Ваш ник"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                    />
                    <Form.Label htmlFor="username">Ваш ник</Form.Label>
                  </Form.Group>
                  <Form.Group className="form-floating mb-4">
                    <Form.Control
                      id="password"
                      name="password"
                      type="password"
                      required
                      placeholder="Пароль"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                    <Form.Label htmlFor="password">Пароль</Form.Label>
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="outline-primary"
                    className="w-100 mb-3"
                  >
                    Войти
                  </Button>
                </Form>
              </Card.Body>
              <Card.Footer className="p-4">
                <div className="text-center">
                  <span>Нет аккаунта?</span>
                  <a href="/signup">Регистрация</a>
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
