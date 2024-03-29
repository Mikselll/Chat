import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectors as channelsSelectors } from '../slices/channelsSlice.js';
import { selectors as messagesSelectors } from '../slices/messagesSlice.js';

const Messages = () => {
  const { t } = useTranslation();
  const messagesEndRef = useRef();
  const channelsList = useSelector(channelsSelectors.selectAll);
  const currentChannelId = useSelector(({ channels }) => channels.currentChannelId);
  const currentChannel = channelsList.find(({ id }) => id === currentChannelId);
  const currentChannelName = currentChannel ? currentChannel.name : 'general';
  const messagesList = useSelector(messagesSelectors.selectAll);
  const currentMessages = messagesList.filter(({ channelId }) => channelId === currentChannelId);
  const messagesLength = currentMessages.length;

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messagesLength]);

  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>{`# ${currentChannelName}`}</b>
        </p>
        <span className="text-muted">{t('messages.message', { count: messagesLength })}</span>
      </div>
      <div className="chat-messages overflow-auto px-5">
        {currentMessages.map(({ text, username, id }) => (
          <div className="text-break mb-2" key={id}>
            <b>{username}</b>
            {`: ${text}`}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </>
  );
};

export default Messages;
