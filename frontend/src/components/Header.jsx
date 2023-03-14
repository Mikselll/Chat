import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/index.js';
import routes from '../routes.js';

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const auth = useAuth();

  const handleClick = () => {
    auth.logOut();
    navigate(routes.loginPagePath());
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Link className="navbar-brand" to={routes.chatPagePath()}>{t('header.brand')}</Link>
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
