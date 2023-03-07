import React, { useEffect, useRef } from 'react';
import {
  Modal, Form, Button,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useSocket } from '../hooks/index.js';
import { selectors as channelsSelectors } from '../slices/channelsSlice.js';
import { setModalType } from '../slices/modalsSlice.js';

const AddModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const socket = useSocket();
  const inputEl = useRef();
  const channelsList = useSelector(channelsSelectors.selectAll);
  const channelsNames = channelsList.map(({ name }) => name);

  const resetModalType = () => dispatch(setModalType(null));

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object({
      name: yup.string().notOneOf(channelsNames, t('errors.notOneOf')).required(t('errors.required')),
    }),
    onSubmit: ({ name }) => {
      socket.addChannel(name);
      toast.success(t('modals.addToast'));
      resetModalType();
    },
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
          {t('modals.addTitle')}
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
            <Form.Label htmlFor="name" className="visually-hidden">{t('modals.lable')}</Form.Label>
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
                {t('modals.cancelButton')}
              </Button>
              <Button
                type="submit"
                variant="primary"
              >
                {t('modals.sendButton')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
