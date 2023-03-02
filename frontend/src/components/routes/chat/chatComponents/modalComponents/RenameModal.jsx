import React, { useEffect, useRef } from 'react';
import {
  Modal, Form, Button,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import socket from '../../../../../socket.js';
import { selectors as channelsSelectors } from '../../../../../slices/channelsSlice.js';
import { setModalType } from '../../../../../slices/modalsSlice.js';

const RenameModal = () => {
  const dispatch = useDispatch();
  const inputEl = useRef();
  const channelsList = useSelector(channelsSelectors.selectAll);
  const channelsNames = channelsList.map(({ name }) => name);
  const id = useSelector(({ modals }) => modals.channelId);

  const resetModalType = () => dispatch(setModalType(null));

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object({
      name: yup.string().notOneOf(channelsNames, 'Должно быть уникальным').required('Обязательно поле'),
    }),
    onSubmit: (({ name }) => {
      socket.emit('renameChannel', { name, id });
      resetModalType();
    }),
  });

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  return (
    <Modal
      centered
      show
      onHide={resetModalType}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Переименовать канал
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              id="name"
              name="name"
              required
              className="mb-2"
              ref={inputEl}
              value={formik.values.name}
              onChange={formik.handleChange}
              isInvalid={formik.errors.name}
            />
            <Form.Label className="visually-hidden">Имя канала</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button
                type="button"
                variant="secondary"
                className="me-2"
                onClick={resetModalType}
              >
                Отменить
              </Button>
              <Button
                type="submit"
                variant="primary"
              >
                Отправить
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameModal;