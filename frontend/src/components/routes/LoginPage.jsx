import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React from 'react';
import shema from '../../validation/index.js';
import image from '../../assets/avatar.jpg';
import useAuth from '../../hook/index.js';

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: shema,
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
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={image} className="rounded-circle" alt="Войти" />
              </div>
              <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
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
                  className="w-100 mb-3"
                  variant="outline-primary"
                >
                  Войти
                </Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>
                <a href="/NotFound">Регистрация</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;