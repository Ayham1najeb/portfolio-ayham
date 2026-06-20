import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaGithub, FaLinkedinIn, FaFacebookF } from 'react-icons/fa'; 
import Typed from 'typed.js'; 
import { useLanguage } from '../context/LanguageContext'; 

// Styled Components
const HeroWrapper = styled.div`
    position: relative;
    width: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const BackgroundElements = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    overflow: hidden;
    pointer-events: none;
`;

const Blob = styled(motion.div)`
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.5;
    z-index: 0;
`;

const Blob1 = styled(Blob)`
    width: 400px;
    height: 400px;
    background: rgba(79, 70, 229, 0.4); 
    top: -10%;
    left: -10%;
`;

const Blob2 = styled(Blob)`
    width: 500px;
    height: 500px;
    background: rgba(236, 72, 153, 0.3); 
    bottom: -20%;
    right: -10%;
`;

const Blob3 = styled(Blob)`
    width: 300px;
    height: 300px;
    background: rgba(56, 189, 248, 0.3); 
    top: 40%;
    left: 40%;
`;

const HeroContainer = styled.div`
    position: relative;
    z-index: 1;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: 2rem;
    display: flex; 
    flex-direction: row; 
    align-items: center;
    justify-content: space-between;
    gap: 30rem; 

    @media (max-width: 768px) {
        flex-direction: column-reverse; 
        text-align: center;
        gap: 2rem;
    }
`;

const TextContent = styled(motion.div)`
    flex: 1;
    text-align: start; 

    @media (max-width: 768px) {
        text-align: center;
    }
`;

const AccentText = styled(motion.p)`
    font-size: 1.25rem;
    color: var(--color-accent);     
    margin-bottom: 0.5rem;
`;

const MainTitleStatic = styled(motion.h1)`
    font-size: 1.6rem; 
    font-weight: 800;
    color: var(--color-text); 
    text-shadow: 
        0 0 5px var(--color-accent),
        0 0 10px rgba(132, 127, 216, 0.4); 
        
    margin-bottom: 1rem;
    line-height: 1.2;

    @media (max-width: 768px) {
        font-size: 1.3rem;
    }
`;

const SubTitleStatic = styled(motion.p)`
    font-size: 1.1rem;
    color: var(--color-text);
    opacity: 0.7;
    margin-bottom: 1.8rem;

    @media (max-width: 768px) {
        font-size: 1rem;
        margin-bottom: 1.2rem;
    }
`;

const ButtonGroup = styled(motion.div)`
    display: flex;
    gap: 1rem;
    justify-content: flex-start; 

    @media (max-width: 768px) {
        justify-content: center;
    }
`;

const PrimaryButton = styled(motion.a)`
    background-color: var(--color-accent);
    color: var(--color-background); 
    font-weight: bold;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    transition: background-color 0.3s;
    text-align: center;
    &:hover {
        background-color: #3730A3;
    }
    @media (max-width: 768px) {
        padding: 0.6rem 1rem;
        font-size: 0.9rem;
    }
`;

const SecondaryButton = styled(motion.a)`
    border: 2px solid var(--color-accent);
    color: var(--color-accent);
    font-weight: bold;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    transition: all 0.3s;
    text-align: center;
    &:hover {
        background-color: var(--color-accent);
        color: var(--color-background); 
    }
    @media (max-width: 768px) {
        padding: 0.6rem 1rem;
        font-size: 0.9rem;
    }
`;

const Socials = styled(motion.div)`
    display: flex;
    gap: 1rem; 
    margin-top: 2rem;
    justify-content: flex-start; 

    @media (max-width: 768px) {
        justify-content: center;
    }
`;

const IconWrapper = styled(motion.span)`
    background-color: rgba(79, 70, 229, 0.1); 
    border-radius: 50%;
    width: 2.5rem; 
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s;
`;

const IconLink = styled.a`
    color: var(--color-accent); 
    font-size: 1.375rem;
    display: flex;
`;

const ImageContainer = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0 300px; 
    width: 300px;
    height: 300px;
    border-radius: 50%;
    overflow: hidden;
    border: 4px solid var(--color-accent);
    box-shadow: 0 0 30px rgba(79, 70, 229, 0.4); 
    position: relative; 

    @media (max-width: 768px) {
        flex: 0 0 220px;
        width: 220px;
        height: 220px;
        margin-bottom: 2rem;
    }
`;

// الصورة داخل الدائرة
const ProfileImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    /* 🛑 تحسين ألوان الصورة برمجياً لتبدو احترافية */
    filter: contrast(1.1) saturate(1.15) brightness(1.05);
    transition: filter 0.3s;
    
    &:hover {
        filter: contrast(1.2) saturate(1.25) brightness(1.1);
    }
`;

// Framer Motion Variants
const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { delay: 0.2, duration: 0.5 } },
};


const Hero = () => {
    const elRef = useRef(null);
    const { t, language } = useLanguage();

    useEffect(() => {
        const typedOptions = {
            strings: [t('hero_name'), t('hero_role_1'), t('hero_role_2')],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 1500,
            loop: true,
        };
        const typed = new Typed(elRef.current, typedOptions);

        return () => {
            typed.destroy();
        };
    }, [language, t]); 

    return (
        <HeroWrapper>
            <BackgroundElements>
                <Blob1 
                    animate={{ 
                        x: [0, 50, -30, 0], 
                        y: [0, -50, 20, 0],
                        scale: [1, 1.1, 0.9, 1]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
                <Blob2 
                    animate={{ 
                        x: [0, -60, 40, 0], 
                        y: [0, 40, -30, 0],
                        scale: [1, 1.2, 0.8, 1]
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                />
                <Blob3 
                    animate={{ 
                        x: [0, 40, -50, 0], 
                        y: [0, -40, 50, 0],
                        scale: [1, 0.9, 1.1, 1]
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                />
            </BackgroundElements>

            <HeroContainer>
                
                {/* 1. النصوص والأزرار (على اليسار/اليمين حسب اللغة) */}
            <TextContent
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
            >
                <AccentText variants={textVariants}>
                    {t('hero_greeting')}
                </AccentText>
                
                {/* النص المتحرك (الاسم والتخصص) */}
                <motion.div variants={textVariants}>
                    <MainTitleStatic as="h1">
                        <span ref={elRef} />
                    </MainTitleStatic>
                </motion.div>
                
                {/* النص الثابت (SubTitle) */}
                <SubTitleStatic variants={textVariants}>
                   {t('hero_description')}
                </SubTitleStatic>
                
                {/* أزرار الإجراءات */}
                <ButtonGroup variants={textVariants}>
                    <PrimaryButton 
                        href="#projects" 
                        whileHover={{ scale: 1.05 }}
                    >
                        {t('hero_btn_projects')}
                    </PrimaryButton>
                    <SecondaryButton 
                        href="#contact" 
                        whileHover={{ scale: 1.05 }}
                    >
                        {t('hero_btn_contact')}
                    </SecondaryButton>
                </ButtonGroup>

                {/* أيقونات التواصل الاجتماعي الدائرية */}
                <Socials variants={textVariants}>
                    <IconLink 
                        href="https://github.com/Ayham1najeb" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        as={motion.a}
                        whileHover={{ scale: 1.1 }}
                    >
                        <IconWrapper>
                            <FaGithub />
                        </IconWrapper>
                    </IconLink>
                    
                    <IconLink 
                        href="https://www.linkedin.com/in/ayham-najeb-6a362b345" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        as={motion.a}
                        whileHover={{ scale: 1.1 }}
                    >
                        <IconWrapper>
                            <FaLinkedinIn />
                        </IconWrapper>
                    </IconLink>
                    
                    <IconLink 
                        href="https://www.facebook.com/share/1H8h1SdFGJ/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        as={motion.a}
                        whileHover={{ scale: 1.1 }}
                    >
                        <IconWrapper>
                            <FaFacebookF />
                        </IconWrapper>
                    </IconLink>
                </Socials>
            </TextContent>
            
            {/* 2. الصورة (على اليمين) */}
            <ImageContainer
                variants={imageVariants}
                initial="hidden"
                animate="visible"
            >
                {/* 🛑 السطر الذي يجب تعديله يدوياً لوضع صورتك الجديدة */}
                <ProfileImage src={`${import.meta.env.BASE_URL}7.jpeg`} alt="Profile Picture" />
            </ImageContainer>

        </HeroContainer>
        </HeroWrapper>
    );
};

export default Hero;