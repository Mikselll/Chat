import React, { useEffect, useRef } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import filter from 'leo-profanity';
import { useAuth, useSocket } from '../hooks/index.js';

const MessagesForm = () => {
  filter.loadDictionary('ru');
  const { t } = useTranslation();
  const inputEl = useRef();
  const socket = useSocket();
  const auth = useAuth();
  const { username } = auth.user;
  const currentChannelId = useSelector(({ channels }) => channels.currentChannelId);

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    validationSchema: yup.object({
      text: yup.string().required(),
    }),
    onSubmit: ({ text }, { resetForm }) => {
      const filterText = filter.clean(text);
      socket.newMessage(filterText, username, currentChannelId);
      resetForm();
    },
  });

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  return (
    <div className="mt-auto px-5 py-3">
      <Form
        noValidate
        className="py-1 border rounded-2"
        onSubmit={formik.handleSubmit}
      >
        <InputGroup>
          <Form.Control
            name="text"
            aria-label={t('messages.typeMessage')}
            placeholder={t('messages.newMessage')}
            className="border-0 p-0 ps-2"
            ref={inputEl}
            value={formik.values.text}
            onChange={formik.handleChange}
          />
          <Button
            type="submit"
            variant=""
            className="btn-group-vertical"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
            </svg>
            <span className="visually-hidden">{t('messages.button')}</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default MessagesForm;
