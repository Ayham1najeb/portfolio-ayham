import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Smooth spring configuration
    const springConfig = { damping: 25, stiffness: 300 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);

        if (!isMobile) {
            const moveCursor = (e) => {
                cursorX.set(e.clientX - 16);
                cursorY.set(e.clientY - 16);
            };

            const handleMouseOver = (e) => {
                if (
                    e.target.tagName.toLowerCase() === 'button' ||
                    e.target.tagName.toLowerCase() === 'a' ||
                    e.target.closest('button') ||
                    e.target.closest('a')
                ) {
                    setIsHovered(true);
                } else {
                    setIsHovered(false);
                }
            };

            window.addEventListener('mousemove', moveCursor);
            window.addEventListener('mouseover', handleMouseOver);

            return () => {
                window.removeEventListener('mousemove', moveCursor);
                window.removeEventListener('mouseover', handleMouseOver);
                window.removeEventListener('resize', checkMobile);
            };
        }

        return () => window.removeEventListener('resize', checkMobile);
    }, [cursorX, cursorY, isMobile]);

    if (isMobile) return null; // Don't show custom cursor on mobile

    return (
        <motion.div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: '2px solid var(--color-accent)',
                pointerEvents: 'none',
                zIndex: 9999,
                x: cursorXSpring,
                y: cursorYSpring,
                backgroundColor: isHovered ? 'rgba(79, 70, 229, 0.5)' : 'transparent',
                scale: isHovered ? 1.5 : 1,
                transition: 'background-color 0.2s, scale 0.2s'
            }}
        />
    );
};

export default CustomCursor;
