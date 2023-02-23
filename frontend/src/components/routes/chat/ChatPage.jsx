import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import useAuth from '../../../hook/index.js';
import { addChannels, setCurrentChannelId } from '../../../slices/channelsSlice.js';
import { addMessages } from '../../../slices/messagesSlice.js';
import ChannelsList from './components/ChannelsList.jsx';
import Messages from './components/Messeges.jsx';
import MessegesForm from './components/MessegesForm';

const Chat = () => {
  const dispatch = useDispatch();
  const auth = useAuth();

  useEffect(() => {
    const getData = async () => {
      const { token } = auth.user;
      const response = await axios.get('/api/v1/data', { headers: { Authorization: `Bearer ${token}` } });
      const { channels, messages, currentChannelId } = response.data;
      dispatch(addChannels(channels));
      dispatch(setCurrentChannelId(currentChannelId));
      dispatch(addMessages(messages));
    };
    getData();
  }, [dispatch]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col xs={4} md={2} className="border-end pt-5 px-0 bg-light">
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
  );
};

export default Chat;
