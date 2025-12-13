import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaExternalLinkAlt, FaCode, FaGithub } from 'react-icons/fa';

// 🛑 بيانات المشاريع (تضمين مسارات صور وهمية - ضع صورك في مجلد public)
const projectsData = [
    { 
        title: "Estate Website", 
        description: "Explore homes that fit your dreams. Built with React and modern CSS.", 
        image: "/project-estate.jpg", 
        tags: ["React", "Styled-Comp", "Framer Motion"], 
        link: "#", 
        code: "#" 
    },
    { 
        title: "Dashboard App", 
        description: "A comprehensive dashboard for business analytics and data visualization.", 
        image: "/project-dashboard.jpg", 
        tags: ["Next.js", "Redux", "API"], 
        link: "#", 
        code: "#" 
    },
    { 
        title: "E-commerce Platform", 
        description: "Full-stack e-commerce solution with dynamic cart and checkout.", 
        image: "/project-ecommerce.jpg", 
        tags: ["React", "Node.js", "MongoDB"], 
        link: "#", 
        code: "#" 
    },
    { 
        title: "NFT Landing Page", 
        description: "A stunning and animated landing page for digital collectible showcase.", 
        image: "/project-nft.jpg", 
        tags: ["Gatsby", "Figma", "Design"], 
        link: "#", 
        code: "#" 
    },
];

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
`;

const Subtitle = styled.p`
    color: var(--color-text);
    opacity: 0.7;
    font-size: 1.4rem;
    margin-bottom: 4rem;
`;

const ProjectsGrid = styled.div`
    /* 💡 لتبدو الكروت أكبر (عرض أدنى 380px) */
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); 
    gap: 3rem; /* زيادة التباعد بين الكروت */
    text-align: left; /* LTR للمحتوى الداخلي */
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
`;

const CardContent = styled.div`
    padding: 1.5rem; /* تعديل التباعد الداخلي */
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const ProjectTitle = styled.h3`
    font-size: 1.7rem; 
    font-weight: bold;
    color: var(--color-text); 
    margin-bottom: 0.8rem;
`;

const ProjectDescription = styled.p`
    color: var(--color-text);
    opacity: 0.7;
    font-size: 1.1rem;
    margin-bottom: 1.2rem;
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

    &:hover {
        text-decoration: underline;
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
    return (
        <ProjectsWrapper>
            <Title
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
            >
                My Works
            </Title>
            <Subtitle>
                A collection of my recent and best projects showcasing different skills.
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
                                    <FaExternalLinkAlt /> <span>Live Demo</span> 
                                </LinkButton>
                                
                                <LinkButton href={project.code} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }}>
                                    <FaGithub /> <span>GitHub</span>
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