import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
// 🛑 التعديل: استيراد الأيقونات الجديدة
import { FaReact, FaHtml5, FaCss3Alt, FaJs, FaJava, FaPython, FaGitAlt, FaLaravel, FaDatabase } from 'react-icons/fa'; 

// 🛑 البيانات (تحديث المهارات)
const skillsData = [
    { name: "React JS", icon: FaReact, color: "#61DAFB" },
    { name: "HTML5", icon: FaHtml5, color: "#E34F26" },
    { name: "CSS3 / Bootstrap", icon: FaCss3Alt, color: "#2965F1" }, 
    { name: "JavaScript (ES6+)", icon: FaJs, color: "#F7DF1E" },
    { name: "Framer Motion", icon: FaReact, color: "#4F46E5" }, 
    
    { name: "Python", icon: FaPython, color: "#3776AB" },
    { name: "Java", icon: FaJava, color: "#007396" },
    { name: "C/C#", icon: FaDatabase, color: "#5D2469" },
    { name: "Laravel / PHP", icon: FaLaravel, color: "#FF2D20" },
    { name: "MySQL / SQL", icon: FaDatabase, color: "#00758F" },
    { name: "Git & GitHub", icon: FaGitAlt, color: "#F05032" }, 
];

// Styled Components
const SkillsWrapper = styled(motion.div)`
    max-width: 1200px;
    margin: 0 auto;
    padding: 5rem 2rem; 
    text-align: center; 
`;

const Title = styled(motion.h2)`
    font-size: 3.8rem; 
    font-weight: 800;
    color: var(--color-text); 
    margin-bottom: 4rem; 
    border-bottom: 4px solid var(--color-accent); 
    display: inline-block;
    padding-bottom: 0.25rem;
`;

const SkillsGrid = styled(motion.div)`
    /* 💡 لضمان تساوي الأعمدة تمامًا */
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); 
    gap: 3rem;
    max-width: 1100px; 
    margin: 0 auto;
`;

const SkillCard = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem;
    background-color: var(--color-card-bg); 
    border-radius: 0.5rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--color-border); 
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s, transform 0.3s;
    min-height: 140px; /* لضمان تساوي الأبعاد الرأسية */

    &:hover {
        background-color: var(--color-border);
        box-shadow: 0 5px 20px rgba(79, 70, 229, 0.3); 
    }
`;

const SkillName = styled.p`
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--color-text); 
`;

// Framer Motion Variants
const skillItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
        opacity: 1, 
        scale: 1, 
        transition: { 
            type: "spring", 
            stiffness: 100 
        } 
    },
};

const Skills = () => {
    return (
        <SkillsWrapper>
            <Title
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
            >
                My Skills
            </Title>

            <SkillsGrid
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ staggerChildren: 0.1 }}
            >
                {skillsData.map((skill, index) => {
                    const Icon = skill.icon;
                    return (
                        <SkillCard
                            key={index}
                            variants={skillItemVariants}
                            whileHover={{ scale: 1.1, y: -5 }} 
                        >
                            <Icon style={{ fontSize: '3.5rem', marginBottom: '0.75rem', color: skill.color }} />
                            <SkillName>{skill.name}</SkillName>
                        </SkillCard>
                    );
                })}
            </SkillsGrid>
        </SkillsWrapper>
    );
};

export default Skills;