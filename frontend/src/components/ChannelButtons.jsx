import React from 'react';
import {
  Button, Dropdown, ButtonGroup,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setCurrentChannelId } from '../slices/channelsSlice.js';
import { openModal } from '../slices/modalsSlice.js';

export const RemovableButton = ({ channel }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentChannelId = useSelector(({ channels }) => channels.currentChannelId);

  const handleChangeChannel = () => dispatch(setCurrentChannelId(channel.id));
  const removeChannel = () => {
    dispatch(openModal({ modalType: 'removing', channelId: channel.id }));
  };
  const renameChannel = () => {
    dispatch(openModal({ modalType: 'renaming', channelId: channel.id }));
  };

  return (
    <Dropdown as={ButtonGroup} className="d-flex">
      <Button
        type="button"
        variant={channel.id === currentChannelId ? 'secondary' : ''}
        className="w-100 rounded-0 text-start text-truncate"
        onClick={handleChangeChannel}
      >
        <span className="me-1">#</span>
        {channel.name}
      </Button>
      <Dropdown.Toggle
        split
        variant={channel.id === currentChannelId ? 'secondary' : ''}
        className="flex-grow-0"
      >
        <span className="visually-hidden">{t('channels.control')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={removeChannel}>{t('channels.remove')}</Dropdown.Item>
        <Dropdown.Item onClick={renameChannel}>{t('channels.rename')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export const UnremovableButton = ({ channel }) => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector(({ channels }) => channels.currentChannelId);

  const handleChangeChannel = () => dispatch(setCurrentChannelId(channel.id));

  return (
    <Button
      type="button"
      variant={channel.id === currentChannelId ? 'secondary' : ''}
      className="w-100 rounded-0 text-start"
      onClick={handleChangeChannel}
    >
      <span className="me-1">#</span>
      {channel.name}
    </Button>
  );
};
