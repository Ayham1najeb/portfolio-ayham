import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useLanguage } from '../context/LanguageContext'; 

// Styled Components
const SectionWrapper = styled(motion.div)`
    max-width: 1000px;
    margin: 0 auto;
    padding: 3rem 2rem;
    text-align: center; 
`;

const Title = styled(motion.h2)`
    font-size: 3.8rem;
    font-weight: 800;
    color: var(--color-text); 
    margin-bottom: 3rem;
    border-bottom: 4px solid var(--color-accent); 
    display: inline-block;
    padding-bottom: 0.25rem;

    @media (max-width: 768px) {
        font-size: 2.5rem;
        margin-bottom: 1.5rem;
    }
`;

const Paragraph = styled(motion.p)`
    font-size: 1.35rem;
    color: var(--color-text);
    opacity: 0.85; 
    margin-bottom: 1.8rem;
    line-height: 1.8;
    text-align: justify; 

    @media (max-width: 768px) {
        font-size: 1.1rem;
        line-height: 1.6;
        margin-bottom: 1.2rem;
    }
`;

const CVButton = styled(motion.a)`
    background-color: var(--color-accent);
    color: var(--color-background); 
    font-weight: bold;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 15px rgba(79, 70, 229, 0.4); 
    transition: background-color 0.5s;
    
    &:hover {
        background-color: #3730A3;
    }

    @media (max-width: 768px) {
        padding: 0.6rem 1.2rem;
        font-size: 0.9rem;
    }
`;

const SecondaryCVButton = styled(motion.a)`
    background-color: var(--color-accent);
    color: var(--color-background); 
    font-weight: bold;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    transition: background-color 0.5s;
    box-shadow: 0 4px 15px rgba(79, 70, 229, 0.4); 
    
    &:hover {
        background-color: var(--color-accent);
        color: var(--color-background);
    }

    @media (max-width: 768px) {
        padding: 0.6rem 1.2rem;
        font-size: 0.9rem;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 1rem; 
    justify-content: center;
    margin-top: 1.5rem;
    
    @media (max-width: 768px) {
        gap: 0.5rem;
    }
`;


// Framer Motion Variants
const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { 
            duration: 0.4,
            staggerChildren: 0.1
        } 
    },
};

const itemVariants = {
    hidden: { opacity: 0, x: 0 }, 
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

const About = () => {
    const { t } = useLanguage();

    return (
        <SectionWrapper
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
            <Title variants={itemVariants}>
                {t('about_title')}
            </Title>

            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <Paragraph variants={itemVariants}>
                    {t('about_p1')}
                </Paragraph>

                <Paragraph variants={itemVariants}>
                    {t('about_p2')}
                </Paragraph>
                
                {/* 🛑 مجموعة الأزرار الجديدة */}
                <motion.div variants={itemVariants}>
                    <ButtonGroup>
                        <SecondaryCVButton
                            href="/portfolio-ayham/Ayham_Cv.pdf?v=2" 
                            target="_blank" /* 💡 للعرض في علامة تبويب جديدة */
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                        >
                            {t('about_btn_view_cv')}
                        </SecondaryCVButton>

                        <CVButton
                            href="/portfolio-ayham/Ayham_Cv.pdf?v=2" 
                            download
                            whileHover={{ scale: 1.05 }}
                        >
                            {t('about_btn_download_cv')}
                        </CVButton>
                    </ButtonGroup>
                </motion.div>
            </div>
        </SectionWrapper>
    );
};

export default About;