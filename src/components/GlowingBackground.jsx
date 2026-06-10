import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const BackgroundWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    overflow: hidden;
    pointer-events: none;
    /* يظهر فقط في الوضع الليلي بشكل جميل */
    opacity: ${({ theme }) => (theme === 'dark' ? 1 : 0)};
    transition: opacity 1s ease-in-out;
`;

const GlowingOrb = styled(motion.div)`
    position: absolute;
    border-radius: 50%;
    filter: blur(120px);
    opacity: 0.6;
    z-index: -1;
`;

const GlowingBackground = () => {
    const { theme } = useTheme();

    return (
        <BackgroundWrapper theme={theme}>
            {/* الدائرة الزرقاء (الملكية) */}
            <GlowingOrb
                style={{
                    width: '500px',
                    height: '500px',
                    background: '#4F46E5', // أزرق ملكي
                    top: '-10%',
                    left: '-10%',
                }}
                animate={{
                    x: [0, 200, 0, -100, 0],
                    y: [0, 100, 300, 100, 0],
                    scale: [1, 1.2, 1, 1.1, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* الدائرة البنفسجية المتوهجة */}
            <GlowingOrb
                style={{
                    width: '400px',
                    height: '400px',
                    background: '#8B5CF6', // بنفسجي ساطع
                    bottom: '-10%',
                    right: '-10%',
                }}
                animate={{
                    x: [0, -250, -50, 150, 0],
                    y: [0, -150, -300, -50, 0],
                    scale: [1, 1.3, 0.9, 1.2, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            
            {/* دائرة زرقاء سماوية إضافية في المنتصف تتحرك ببطء */}
            <GlowingOrb
                style={{
                    width: '600px',
                    height: '600px',
                    background: '#0EA5E9', // سماوي
                    top: '30%',
                    left: '30%',
                    opacity: 0.3, // أخف من الباقين
                }}
                animate={{
                    x: [0, 300, -200, 100, 0],
                    y: [0, -200, 200, -100, 0],
                }}
                transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
        </BackgroundWrapper>
    );
};

export default GlowingBackground;
