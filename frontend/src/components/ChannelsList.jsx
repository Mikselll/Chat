import React, { useEffect, useRef } from 'react';
import { Button, Nav } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RemovableButton, UnremovableButton } from './ChannelButtons.jsx';
import { selectors as channelsSelectors } from '../slices/channelsSlice.js';
import { openModal } from '../slices/modalsSlice.js';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channelsEndRef = useRef();
  const channelsList = useSelector(channelsSelectors.selectAll);

  const handleAdding = () => dispatch(openModal({ modalType: 'adding', channelId: null }));

  useEffect(() => {
    channelsEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [channelsList]);

  return (
    <>
      <div className="d-flex justify-content-between mt-1 mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.title')}</b>
        <Button
          type="button"
          variant=""
          className="p-0 text-primary btn-group-vertical"
          onClick={handleAdding}
        >
          <PlusSquare viewBox="0 0 16 16" width="20" height="20" fill="currentColor" />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <Nav as="ul" className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channelsList.map((channel) => {
          const ChannelButton = channel.removable ? RemovableButton : UnremovableButton;
          return (
            <Nav.Item as="li" className="w-100" key={channel.id}>
              <ChannelButton channel={channel} />
            </Nav.Item>
          );
        })}
        <div ref={channelsEndRef} />
      </Nav>
    </>
  );
};

export default Channels;
