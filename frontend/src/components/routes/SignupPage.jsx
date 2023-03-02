import React, { useState } from 'react';
import {
  Form, Button, Container, Row, Card, Col, Image, Navbar,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import useAuth from '../../hook/index.js';
import image from '../../assets/avatar_1.jpg';

const Signup = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [error409, setError] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object({
      username: yup.string().min(3, 'От 3 до 20 символов').max(20, 'От 3 до 20 символов').required('Обязательное поле'),
      password: yup.string().min(6, 'Не менее 6 символов').required('Обязательное поле'),
      confirmPassword: yup.string().oneOf([yup.ref('password')], 'Пароли должны совпадать'),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post('/api/v1/signup', values);
        auth.signUp(data);
        navigate('/');
      } catch (error) {
        if (error.response.status === 409) {
          setError(true);
        }
        console.error(error.message);
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
                  <Image src={image} className="rounded-circle" alt="Регистрация" />
                </Col>
                <Form
                  className="col-12 col-md-6 mt-3 mt-mb-0"
                  onSubmit={formik.handleSubmit}
                >
                  <h1 className="text-center mb-4">Регистрация</h1>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      id="username"
                      name="username"
                      type="username"
                      required
                      placeholder="От 3 до 20 символов"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      isInvalid={formik.errors.username || error409}
                    />
                    <Form.Label htmlFor="username">Имя пользователя</Form.Label>
                    <Form.Control.Feedback className="invalid-tooltip">{error409 ? 'Такой пользователь уже существует' : formik.errors.username}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      id="password"
                      name="password"
                      type="password"
                      required
                      placeholder="Не менее 6 символов"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      isInvalid={formik.errors.password}
                    />
                    <Form.Label htmlFor="pasword">Пароль</Form.Label>
                    <Form.Control.Feedback className="invalid-tooltip">{formik.errors.password}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      placeholder="Пароли должны совпадать"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      isInvalid={formik.errors.confirmPassword}
                    />
                    <Form.Label htmlFor="confirmPaswword">Подтвердите пароль</Form.Label>
                    <Form.Control.Feedback className="invalid-tooltip">{formik.errors.confirmPassword}</Form.Control.Feedback>
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-100"
                  >
                    Зарегистрироваться
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
