import React from 'react';
import {
  Button, Nav, Dropdown, ButtonGroup,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectors as channelsSelectors, setCurrentChannelId } from '../../../../slices/channelsSlice.js';
import { setModalType, setChannelId } from '../../../../slices/modalsSlice.js';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channelsList = useSelector(channelsSelectors.selectAll);
  const currentChannelId = useSelector(({ channels }) => channels.currentChannelId);

  const handleAdding = () => dispatch(setModalType('adding'));

  return (
    <>
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channels.title')}</span>
        <Button
          type="button"
          variant=""
          className="p-0 text-primary btn-group-vertical"
          onClick={handleAdding}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <Nav as="ul" className="flex-column nav-pills nav-fill px-2">
        {channelsList.map((channel) => {
          const handleChangeChannel = () => dispatch(setCurrentChannelId(channel.id));
          const removeChannel = () => {
            dispatch(setModalType('removing'));
            dispatch(setChannelId(channel.id));
          };
          const renameChannel = () => {
            dispatch(setModalType('renaming'));
            dispatch(setChannelId(channel.id));
          };
          return (
            <Nav.Item as="li" className="w-100" key={channel.id}>
              {channel.removable ? (
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
              ) : (
                <Button
                  type="button"
                  variant={channel.id === currentChannelId ? 'secondary' : ''}
                  className="w-100 rounded-0 text-start"
                  onClick={handleChangeChannel}
                >
                  <span className="me-1">#</span>
                  {channel.name}
                </Button>
              )}
            </Nav.Item>
          );
        })}
      </Nav>
    </>
  );
};

export default Channels;
