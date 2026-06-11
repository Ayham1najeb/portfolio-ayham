import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaExternalLinkAlt, FaCode, FaGithub } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext'; 

// Styled Components
const ProjectsWrapper = styled(motion.div)`
    max-width: 1300px; /* زيادة عرض الحاوية العامة */
    margin: 0 auto;
    padding: 5rem 2rem; /* زيادة التباعد الرأسي */
    text-align: center;
`;

const Title = styled(motion.h2)`
    font-size: 3.8rem;
    font-weight: 800;
    color: var(--color-text);
    margin-bottom: 0.5rem;
    /* 💡 شريط أزرق ملكي أسفل العنوان */
    border-bottom: 4px solid var(--color-accent); 
    display: inline-block;
    padding-bottom: 0.25rem;

    @media (max-width: 768px) {
        font-size: 2.5rem;
    }
`;

const Subtitle = styled.p`
    color: var(--color-text);
    opacity: 0.7;
    font-size: 1.4rem;
    margin-bottom: 4rem;

    @media (max-width: 768px) {
        font-size: 1.1rem;
        margin-bottom: 2rem;
    }
`;

const ProjectsGrid = styled.div`
    /* 💡 لتبدو الكروت أكبر (عرض أدنى 380px) */
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); 
    gap: 3rem; /* زيادة التباعد بين الكروت */
    text-align: start; /* استخدام start بدلاً من right لتناسب اللغتين */

    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        padding: 0 1.5rem; /* لجعل الكروت أصغر وعدم تمددها لنهاية الشاشة */
    }
`;

const ProjectCard = styled(motion.div)`
    background-color: var(--color-card-bg); 
    border-radius: 0.7rem; /* انحناء أكثر للزوايا */
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15); /* ظل أعمق قليلاً */
    border: 1px solid var(--color-border); 
    overflow: hidden; 
    transition: box-shadow 0.3s;
    display: flex;
    flex-direction: column;

    &:hover {
        /* ظل خفيف بلون التمييز الجديد عند التمرير */
        box-shadow: 0 0 35px rgba(79, 70, 229, 0.4); 
    }
`;

const ProjectImage = styled.div`
    width: 100%;
    /* 🛑 التعديل: تقليل ارتفاع الصورة لجعله أقرب للمربع */
    height: 220px; 
    overflow: hidden;

    & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
    }
    
    /* حركة تكبير الصورة عند التمرير */
    ${ProjectCard}:hover & > img { 
        transform: scale(1.08); 
    }

    @media (max-width: 768px) {
        height: 160px; /* جعل الصورة أصغر بكثير على الهاتف */
    }
`;

const CardContent = styled.div`
    padding: 1.5rem; /* تعديل التباعد الداخلي */
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media (max-width: 768px) {
        padding: 1rem;
    }
`;

const ProjectTitle = styled.h3`
    font-size: 1.7rem; 
    font-weight: bold;
    color: var(--color-text); 
    margin-bottom: 0.8rem;

    @media (max-width: 768px) {
        font-size: 1.4rem;
    }
`;

const ProjectDescription = styled.p`
    color: var(--color-text);
    opacity: 0.7;
    font-size: 1.1rem;
    margin-bottom: 1.2rem;

    @media (max-width: 768px) {
        font-size: 0.95rem;
    }
`;

const TagGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem; 
    margin-bottom: 1.5rem; 
`;

const Tag = styled.span`
    display: inline-block;
    font-size: 0.9rem; 
    font-weight: 500;
    padding: 0.4rem 0.8rem;
    /* 💡 خلفية التاج بلون التمييز مع شفافية */
    background-color: rgba(79, 70, 229, 0.15); 
    color: var(--color-accent);
    border-radius: 4px;

    @media (max-width: 768px) {
        font-size: 0.8rem;
        padding: 0.3rem 0.6rem;
    }
`;

const LinkGroup = styled.div`
    display: flex;
    justify-content: space-between;
    padding-top: 1.5rem; 
    border-top: 1px solid var(--color-border);
`;

const LinkButton = styled(motion.a)`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--color-accent); 
    font-weight: 600;
    transition: color 0.3s;
    font-size: 1.1rem; 
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }

    @media (max-width: 768px) {
        font-size: 0.95rem;
    }
`;


// Framer Motion Variants
const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { 
            duration: 0.5 
        } 
    },
};


const Projects = () => {
    const { t } = useLanguage();

    const projectsData = [
        { 
            title: t('project_ecommerce_title'), 
            description: t('project_ecommerce_desc'), 
            image: "/project-ecommerce.jpg", 
            tags: ["React", "Node.js", "MongoDB"], 
            link: "#", 
            code: "#" 
        },
        { 
            title: t('project_dashboard_title'), 
            description: t('project_dashboard_desc'), 
            image: "/project-dashboard.jpg", 
            tags: ["React", "Tailwind", "API"], 
            link: "#", 
            code: "#" 
        },
        { 
            title: t('project_social_title'), 
            description: t('project_social_desc'), 
            image: "/project-social.jpg", 
            tags: ["Laravel", "MySQL", "Bootstrap"], 
            link: "#", 
            code: "#" 
        }
    ];

    return (
        <ProjectsWrapper>
            <Title
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
            >
                {t('projects_title')}
            </Title>
            <Subtitle>
            </Subtitle>

            <ProjectsGrid>
                {projectsData.map((project, index) => (
                    <ProjectCard
                        key={index}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        {/* 1. صورة المشروع */}
                        <ProjectImage>
                            <img src={project.image} alt={project.title} />
                        </ProjectImage>

                        <CardContent>
                            <div>
                                <ProjectTitle>{project.title}</ProjectTitle>
                                <ProjectDescription>{project.description}</ProjectDescription>
                            </div>
                            
                            {/* 2. التاجات والتقنيات */}
                            <TagGroup>
                                {project.tags.map((tag, i) => (
                                    <Tag key={i}>{tag}</Tag>
                                ))}
                            </TagGroup>

                            {/* 3. أزرار الروابط */}
                            <LinkGroup>
                                <LinkButton href={project.link} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }}>
                                    <FaExternalLinkAlt /> <span>{t('project_view')}</span> 
                                </LinkButton>
                                
                                <LinkButton href={project.code} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }}>
                                    <FaGithub /> <span>{t('project_code')}</span>
                                </LinkButton>
                            </LinkGroup>
                        </CardContent>
                    </ProjectCard>
                ))}
            </ProjectsGrid>
        </ProjectsWrapper>
    );
};

export default Projects;