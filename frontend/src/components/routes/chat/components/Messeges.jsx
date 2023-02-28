import React from 'react';
import { useSelector } from 'react-redux';
import { selectors as channelsSelectors } from '../../../../slices/channelsSlice.js';
import { selectors as messagesSelectors } from '../../../../slices/messagesSlice.js';

const Messages = () => {
  const channelsList = useSelector(channelsSelectors.selectAll);
  const currentChannelId = useSelector(({ channels }) => channels.currentChannelId);
  const currentChannel = channelsList.find(({ id }) => id === currentChannelId);
  const currentChannelName = currentChannel ? currentChannel.name : 'general';
  const messagesList = useSelector(messagesSelectors.selectAll);
  const currentMessages = messagesList.filter(({ channelId }) => channelId === currentChannelId);
  const messagesLength = currentMessages.length;
  console.log(messagesList);

  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>{`# ${currentChannelName}`}</b>
        </p>
        <span className="text-muted">{`${messagesLength} сообщений`}</span>
      </div>
      <div className="chat-messages overflow-auto px-5">
        {currentMessages.map(({ text, username, id }) => (
          <div className="text-break mb-2" key={id}>
            <b>{username}</b>
            {`: ${text}`}
          </div>
        ))}
      </div>
    </>
  );
};

export default Messages;
