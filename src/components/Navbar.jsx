import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext'; 
import { useLanguage } from '../context/LanguageContext'; 
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi'; 

// Styled Components
const NavContainer = styled(motion.nav)`
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
    padding: 1rem;
    background-color: var(--color-background); 
    backdrop-filter: blur(5px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid var(--color-border);
    direction: ltr; /* استعادة اتجاه القائمة كما كان */
`;

const NavContent = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: row; 
    justify-content: space-between; 
    align-items: center;
`;

const Logo = styled(motion.a)`
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--color-accent);
`;

const NavLinksWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto; 
    
    @media (max-width: 768px) {
        display: none;
    }
`;

const NavLink = styled(motion.a)`
    color: var(--color-text); 
    font-size: 1.125rem;
    font-weight: 500;
    margin-left: 2.5rem; 
    margin-right: 0; 
    transition: color 0.3s;
    position: relative; 
    
    &:hover {
        color: var(--color-accent); 
    }

    /* إنشاء عنصر التسطير المتحرك */
    &::after {
        content: '';
        position: absolute;
        width: 100%;
        transform: scaleX(0);
        height: 2px;
        bottom: -5px;
        left: 0;
        background-color: var(--color-accent);
        transform-origin: bottom right;
        transition: transform 0.3s ease-out;
    }
    
    /* الحركة عند التمرير بالماوس أو النقر */
    &:hover::after,
    &:active::after { 
        transform: scaleX(1); 
        transform-origin: bottom left;
    }
`;

const ToggleButton = styled(motion.button)`
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--color-text);
    cursor: pointer;
    margin-left: 2rem; 
    font-weight: bold;
    transition: color 0.3s;

    &:hover {
        color: var(--color-accent);
    }
`;

// === حاوية الأيقونات للهاتف ===
const MobileIcons = styled.div`
    display: none;
    align-items: center;

    @media (max-width: 768px) {
        display: flex; 
        margin-left: auto; 
    }
`;

const MobileToggle = styled(ToggleButton)`
    margin-left: 1rem; 
    
    @media (min-width: 769px) {
        display: none; 
    }
`;

const MenuIcon = styled(motion.button)`
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--color-text);
    cursor: pointer;
    margin-left: 1rem; 
    
    @media (min-width: 769px) {
        display: none;
    }
`;

// === قائمة الهاتف الجانبية ===
const MobileMenu = styled(motion.div)`
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 250px;
    background-color: var(--color-card-bg); 
    box-shadow: -4px 0 15px rgba(0, 0, 0, 0.3);
    padding: 2rem;
    z-index: 99; 
    display: flex;
    flex-direction: column;
    align-items: flex-start; 
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--color-text);
    cursor: pointer;
    margin-bottom: 2rem;
    align-self: flex-end; 
`;

const MobileNavLink = styled.a`
    color: var(--color-text);
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 1.5rem;
    padding: 0.5rem 1rem; 
    width: 100%; 
    border-radius: 0.5rem; 
    transition: all 0.3s ease-in-out; 
    
    &:hover {
        color: var(--color-accent);
        background-color: rgba(79, 70, 229, 0.15);
    }
`;

// Framer Motion Variants 
const containerVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
};

const mobileVariants = {
    closed: { x: '100%' },
    open: { x: 0, transition: { type: 'tween', stiffness: 100, staggerChildren: 0.07, delayChildren: 0.2 } }
};


const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => { 
    if (window.innerWidth <= 768) {
        setIsOpen(false);
    }
  };

  const navLinks = [
    { title: t("nav_home"), href: "#home" },
    { title: t("nav_about"), href: "#about" },
    { title: t("nav_skills"), href: "#skills" },
    { title: t("nav_projects"), href: "#projects" },
    { title: t("nav_contact"), href: "#contact" },
  ];

  return (
    <NavContainer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <NavContent>
        {/* 1. اللوجو (A.AYHAM) على اليسار */}
        <Logo 
          href="#home" 
          variants={itemVariants}
          onClick={handleLinkClick}
        >
          AYHAM
        </Logo>

        {/* 2. مجموعة الروابط لسطح المكتب */}
        <NavLinksWrapper>
            
            {/* الروابط */}
            {navLinks.map((link, index) => (
                <NavLink
                key={index}
                href={link.href}
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                onClick={handleLinkClick}
                >
                {link.title}
                </NavLink>
            ))}

            {/* زر تبديل اللغة */}
            <ToggleButton onClick={toggleLanguage} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <span style={{ fontSize: '1.2rem' }}>{language.toUpperCase()}</span>
            </ToggleButton>

            {/* زر تبديل الثيم لسطح المكتب */}
            <ToggleButton onClick={toggleTheme} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                {theme === 'light' ? <FiMoon /> : <FiSun />} 
            </ToggleButton>
        </NavLinksWrapper>

        {/* 3. مجموعة أيقونات الهاتف (الزر + البرغر) - مرئية فقط على الهاتف */}
        <MobileIcons>
            {/* زر تبديل اللغة للهاتف */}
            <MobileToggle onClick={toggleLanguage} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <span style={{ fontSize: '1.2rem' }}>{language.toUpperCase()}</span>
            </MobileToggle>

            {/* زر تبديل الثيم */}
            <MobileToggle onClick={toggleTheme} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                {theme === 'light' ? <FiMoon /> : <FiSun />} 
            </MobileToggle>

            {/* أيقونة البرغر */}
            <MenuIcon onClick={() => setIsOpen(true)}>
                <FiMenu />
            </MenuIcon>
        </MobileIcons>
      </NavContent>

      {/* === قائمة الهاتف المتحركة === */}
      <AnimatePresence>
        {isOpen && (
            <MobileMenu
                variants={mobileVariants}
                initial="closed"
                animate="open"
                exit="closed"
            >
                {/* زر الإغلاق */}
                <CloseButton onClick={() => setIsOpen(false)}>
                    <FiX />
                </CloseButton>

                {/* الروابط داخل القائمة الجانبية */}
                {navLinks.map((link, index) => (
                    <MobileNavLink
                        key={index}
                        href={link.href}
                        onClick={handleLinkClick}
                    >
                        {link.title}
                    </MobileNavLink>
                ))}
            </MobileMenu>
        )}
      </AnimatePresence>
    </NavContainer>
  );
};

export default Navbar;