import React, { useState } from 'react';
import {
  Modal, Button,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';
import { useApi } from '../hooks/index.js';
import { closeModal } from '../slices/modalsSlice.js';

const RemoveModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const rollbar = useRollbar();
  const chatApi = useApi();
  const [isSubmit, setSubmit] = useState(false);
  const id = useSelector(({ modals }) => modals.channelId);

  const resetModalType = () => dispatch(closeModal());
  const handleRemoveChannel = async () => {
    try {
      setSubmit(true);
      await chatApi.remove({ id });
      setSubmit(false);
      toast.success(t('modals.removeToast'));
    } catch (error) {
      setSubmit(false);
      toast.error(t(error.message));
      rollbar.error(error);
    } finally {
      resetModalType();
    }
  };

  return (
    <Modal
      centered
      show
      onHide={resetModalType}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {t('modals.removeTitle')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.removeConfirm')}</p>
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
            type="button"
            variant="danger"
            disabled={isSubmit}
            onClick={handleRemoveChannel}
          >
            {t('modals.removeButton')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveModal;
