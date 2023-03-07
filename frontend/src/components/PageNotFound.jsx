import React from 'react';
import {
  Navbar, Container, Button, Image,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import image from '../assets/avatar_2.jpg';

const NotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <div className="d-flex flex-column h-100">
      <Navbar bg="white" expand="lg" className="shadow-sm">
        <Container>
          <a className="navbar-brand" to="/">{t('header.brand')}</a>
          <Button
            type="button"
            variant="primary"
            onClick={handleClick}
          >
            {t('header.button')}
          </Button>
        </Container>
      </Navbar>
      <div className="text-center">
        <Image className="h-25" fluid src={image} alt={t('notFound.title')} />
        <h1 className="h4 text-muted">{t('notFound.title')}</h1>
        <p className="text-muted">
          {t('notFound.footerText')}
          <a href="/">{t('notFound.footerLink')}</a>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
