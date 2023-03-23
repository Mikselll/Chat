import React, { useEffect } from 'react';
import {
  Container, Row, Col,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';
import axios from 'axios';
import routes from '../routes.js';
import { useAuth } from '../hooks/index.js';
import { addChannels, setCurrentChannelId } from '../slices/channelsSlice.js';
import { addMessages } from '../slices/messagesSlice.js';
import ChannelsList from './ChannelsList.jsx';
import Messages from './Messeges.jsx';
import MessegesForm from './MessegesForm.jsx';
import Modal from './Modal.jsx';
import Header from './Header.jsx';

const Chat = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const rollbar = useRollbar();
  const auth = useAuth();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(routes.dataPath(), { headers: auth.getAuthHeader() });
        const { channels, messages, currentChannelId } = response.data;
        dispatch(addChannels(channels));
        dispatch(setCurrentChannelId(currentChannelId));
        dispatch(addMessages(messages));
      } catch (error) {
        rollbar.error(error);
        if (!error.isAxiosError) {
          toast.error(t('errors.unknownError'));
        } else {
          toast.error(t('errors.networkError'));
        }
        navigate(routes.loginPagePath());
      }
    };
    getData();
  }, [dispatch]);

  return (
    <>
      <div className="d-flex flex-column h-100">
        <Header />
        <Container className="h-100 my-4 overflow-hidden rounded shadow">
          <Row className="h-100 bg-white flex-md-row">
            <Col xs={4} md={2} className="border-end px-0 bg-light h-100 d-flex flex-column">
              <ChannelsList />
            </Col>
            <Col className="p-0 h-100">
              <div className="d-flex flex-column h-100">
                <Messages />
                <MessegesForm />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Modal />
    </>
  );
};

export default Chat;
