import React, { useEffect, useRef } from 'react';
import {
  Modal, Form, Button,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';
import * as yup from 'yup';
import { useApi } from '../hooks/index.js';
import { selectors as channelsSelectors } from '../slices/channelsSlice.js';
import { closeModal } from '../slices/modalsSlice.js';

const RenameModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const rollbar = useRollbar();
  const chatApi = useApi();
  const inputEl = useRef();
  const id = useSelector(({ modals }) => modals.channelId);
  const channelsList = useSelector(channelsSelectors.selectAll);
  const channelsNames = channelsList.map(({ name }) => name);
  const currentChannel = channelsList.find((channel) => channel.id === id);
  const currentChannelName = currentChannel.name;

  const resetModalType = () => dispatch(closeModal());

  const formik = useFormik({
    initialValues: {
      name: currentChannelName,
    },
    validationSchema: yup.object({
      name: yup.string().notOneOf(channelsNames, t('errors.notOneOf')).required(t('errors.required')),
    }),
    onSubmit: async ({ name }) => {
      try {
        await chatApi.rename({ name, id });
        toast.success(t('modals.renameToast'));
      } catch (error) {
        toast.error(t(error.message));
        rollbar.error(error);
      } finally {
        resetModalType();
      }
    },
  });

  useEffect(() => {
    inputEl.current.select();
  }, []);

  return (
    <Modal
      centered
      show
      onHide={resetModalType}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {t('modals.renameTitle')}
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
                disabled={formik.isSubmitting}
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

export default RenameModal;
