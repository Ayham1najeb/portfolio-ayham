import React from 'react';
import styled from 'styled-components';
import { useLanguage } from '../context/LanguageContext'; 

// Styled Components
const FooterContainer = styled.footer`
    background-color: var(--color-card-bg); 
    padding: 1.5rem 0;
    margin-top: 3rem;
    border-top: 1px solid var(--color-border); 
    text-align: center;
    color: var(--color-text); 
    box-shadow: 0 -4px 10px rgba(14, 13, 13, 0.1); 
`;

const ContentWrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px 1rem;
    display: flex; 
    flex-direction: column;
    align-items: center;
`;

const Text = styled.p`
    font-size: 0.9rem;
    margin-top: 0.5rem;
    margin: 0;
`;

const Footer = () => {
  const { t } = useLanguage();

  return (
    <FooterContainer>
      <ContentWrapper>
        <Text style={{ fontSize:'1.1rem' }}>
          © 2025 Ayham Najib. {t('footer_rights')}
        </Text>
      </ContentWrapper>
    </FooterContainer>
  );
};

export default Footer;