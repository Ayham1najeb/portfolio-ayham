import React from 'react';
import styled from 'styled-components';

// Styled Components
const FooterContainer = styled.footer`
    /* 💡 الخلفية تتغير: تستخدم لون البطاقة الذي يتغير مع الثيم */
    background-color: var(--color-card-bg); 
    padding: 1.5rem 0;
    margin-top: 3rem;
    /* 💡 الحدود تتغير */
    border-top: 1px solid var(--color-border); 
    text-align: center;
    /* 💡 لون النص يتغير ليناسب الخلفية الجديدة */
    color: var(--color-text); 
    
    /* 🛑 التعديل: إضافة ظل أسود خفيف وناعم */
    box-shadow: 0 -4px 10px rgba(14, 13, 13, 0.1); 
`;

const ContentWrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px 1rem;
    /* 💡 تم إضافة display: flex لتنظيف أي تباعد غير ضروري من <Text> الفارغة */
    display: flex; 
    flex-direction: column;
    align-items: center;
`;

const Text = styled.p`
    font-size: 0.9rem;
    margin-top: 0.5rem;
    /* 💡 تصفير أي هامش قد ينتج عن العنصر <Text> */
    margin: 0;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <ContentWrapper>
        {/* 💡 النص الرئيسي بخط أكبر كما طلبته */}
        <Text style={{ fontSize:'1.3rem' }}>
          © 2025 Ayham Najib. All rights reserved.
        </Text>
        
        {/* 💡 إعادة استخدام Text لعرض معلومات البناء (لتبدو أنيقة) */}
        <Text >
          
        </Text>
      </ContentWrapper>
    </FooterContainer>
  );
};

export default Footer;