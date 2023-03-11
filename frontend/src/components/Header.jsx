import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/index.js';

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const auth = useAuth();

  const handleClick = () => {
    auth.logOut();
    navigate('/login');
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <a className="navbar-brand" to="/">{t('header.brand')}</a>
        {auth.user && (
        <Button
          type="button"
          variant="primary"
          onClick={handleClick}
        >
          {t('header.button')}
        </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
