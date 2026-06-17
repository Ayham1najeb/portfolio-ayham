import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { FaExternalLinkAlt, FaGithub, FaImages, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext'; 

// ============== Gallery Modal Styles ==============
const ModalOverlay = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.92);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(8px);
`;

const ModalContent = styled(motion.div)`
    position: relative;
    width: 90%;
    max-width: 1100px;
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalImage = styled(motion.img)`
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 12px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
`;

const NavButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(79, 70, 229, 0.7);
    border: none;
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    transition: all 0.3s;
    z-index: 10;

    &:hover {
        background: rgba(79, 70, 229, 1);
        transform: translateY(-50%) scale(1.1);
    }

    &.prev { left: -60px; }
    &.next { right: -60px; }

    @media (max-width: 768px) {
        width: 40px;
        height: 40px;
        font-size: 1rem;
        &.prev { left: 5px; }
        &.next { right: 5px; }
    }
`;

const CloseButton = styled.button`
    position: fixed;
    top: 25px;
    right: 30px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255,255,255,0.2);
    color: white;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    transition: all 0.3s;
    z-index: 10001;

    &:hover {
        background: rgba(239, 68, 68, 0.8);
        border-color: transparent;
    }
`;

const ImageCounter = styled.div`
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    color: rgba(255,255,255,0.7);
    font-size: 1rem;
    font-weight: 500;
    background: rgba(0,0,0,0.5);
    padding: 0.5rem 1.2rem;
    border-radius: 20px;
    z-index: 10001;
`;

// ============== Project Card Styles ==============
const ProjectsWrapper = styled(motion.div)`
    max-width: 1300px;
    margin: 0 auto;
    padding: 5rem 2rem;
    text-align: center;
`;

const Title = styled(motion.h2)`
    font-size: 3.8rem;
    font-weight: 800;
    color: var(--color-text);
    margin-bottom: 0.5rem;
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
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); 
    gap: 3rem;
    text-align: start;

    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        padding: 0 1.5rem;
    }
`;

const ProjectCard = styled(motion.div)`
    background-color: var(--color-card-bg); 
    border-radius: 0.7rem;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    border: 1px solid var(--color-border); 
    overflow: hidden; 
    transition: box-shadow 0.3s;
    display: flex;
    flex-direction: column;

    &:hover {
        box-shadow: 0 0 35px rgba(79, 70, 229, 0.4); 
    }
`;

const ProjectImage = styled.div`
    width: 100%;
    height: 220px; 
    overflow: hidden;
    position: relative;

    & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
    }
    
    ${ProjectCard}:hover & > img { 
        transform: scale(1.08); 
    }

    @media (max-width: 768px) {
        height: 160px;
    }
`;

const GalleryBadge = styled.button`
    position: absolute;
    bottom: 10px;
    right: 10px;
    background: rgba(79, 70, 229, 0.85);
    border: none;
    color: white;
    padding: 0.4rem 0.8rem;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.85rem;
    font-weight: 600;
    transition: all 0.3s;
    z-index: 2;
    backdrop-filter: blur(4px);

    &:hover {
        background: rgba(79, 70, 229, 1);
        transform: scale(1.05);
    }
`;

const CardContent = styled.div`
    padding: 1.5rem;
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

// ============== Gallery Modal Component ==============
const GalleryModal = ({ images, isOpen, onClose, projectTitle }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goNext = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const goPrev = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    // Handle keyboard navigation
    React.useEffect(() => {
        if (!isOpen) return;
        const handleKey = (e) => {
            if (e.key === 'ArrowRight') setCurrentIndex((prev) => (prev + 1) % images.length);
            if (e.key === 'ArrowLeft') setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [isOpen, images.length, onClose]);

    // Reset index when opening
    React.useEffect(() => {
        if (isOpen) setCurrentIndex(0);
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <ModalOverlay
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <CloseButton onClick={onClose}>
                        <FaTimes />
                    </CloseButton>

                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <NavButton className="prev" onClick={goPrev}>
                            <FaChevronLeft />
                        </NavButton>

                        <ModalImage
                            key={currentIndex}
                            src={images[currentIndex]}
                            alt={`${projectTitle} - ${currentIndex + 1}`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                        />

                        <NavButton className="next" onClick={goNext}>
                            <FaChevronRight />
                        </NavButton>
                    </ModalContent>

                    <ImageCounter>
                        {currentIndex + 1} / {images.length}
                    </ImageCounter>
                </ModalOverlay>
            )}
        </AnimatePresence>
    );
};

// ============== Main Projects Component ==============
const Projects = () => {
    const { t } = useLanguage();
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [activeGallery, setActiveGallery] = useState([]);
    const [activeTitle, setActiveTitle] = useState('');

    const openGallery = (images, title) => {
        setActiveGallery(images);
        setActiveTitle(title);
        setGalleryOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeGallery = () => {
        setGalleryOpen(false);
        document.body.style.overflow = 'auto';
    };

    const projectsData = [
        { 
            title: t('project_isbul_title'), 
            description: t('project_isbul_desc'), 
            tags: ["Laravel", "MySQL", "Bootstrap", "REST API"], 
            link: "#", 
            code: "https://github.com/Ayham1najeb/IsBul-Job-Platform",
            image: null,
            gallery: []
        },
        { 
            title: t('project_velora_title'), 
            description: t('project_velora_desc'), 
            tags: ["React", "Styled Components", "REST API"], 
            link: "#", 
            code: "https://github.com/Ayham1najeb/velora-clinic-frontend",
            image: "/projects/velora/5.png",
            gallery: Array.from({ length: 16 }, (_, i) => `/projects/velora/${i + 1}.png`)
        },
        { 
            title: t('project_myshop_title'), 
            description: t('project_myshop_desc'), 
            tags: ["React", "Node.js", "MongoDB"], 
            link: "#", 
            code: "https://github.com/Ayham1najeb/my-shop",
            image: null,
            gallery: []
        },
        { 
            title: t('project_smartfile_title'), 
            description: t('project_smartfile_desc'), 
            tags: ["React", "Vite", "MUI", "Cloudflare"], 
            link: "https://smartfilehub.com/", 
            code: "#",
            image: null,
            gallery: []
        },
        { 
            title: t('project_pharmacy_title'), 
            description: t('project_pharmacy_desc'), 
            tags: ["Laravel", "PHP", "MySQL", "Bootstrap"], 
            link: "#", 
            code: "https://github.com/Ayham1najeb/pharmacy",
            image: null,
            gallery: []
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
                        {/* صورة المشروع */}
                        {project.image && (
                            <ProjectImage>
                                <img src={project.image} alt={project.title} />
                                {project.gallery.length > 0 && (
                                    <GalleryBadge onClick={() => openGallery(project.gallery, project.title)}>
                                        <FaImages /> {project.gallery.length} صورة
                                    </GalleryBadge>
                                )}
                            </ProjectImage>
                        )}

                        <CardContent>
                            <div>
                                <ProjectTitle>{project.title}</ProjectTitle>
                                <ProjectDescription>{project.description}</ProjectDescription>
                            </div>
                            
                            {/* التاجات والتقنيات */}
                            <TagGroup>
                                {project.tags.map((tag, i) => (
                                    <Tag key={i}>{tag}</Tag>
                                ))}
                            </TagGroup>

                            {/* أزرار الروابط */}
                            <LinkGroup>
                                <LinkButton href={project.link !== "#" ? project.link : project.code} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }}>
                                    <FaExternalLinkAlt /> <span>{t('project_view')}</span> 
                                </LinkButton>
                                
                                <LinkButton href={project.code !== "#" ? project.code : project.link} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }}>
                                    <FaGithub /> <span>{t('project_code')}</span>
                                </LinkButton>
                            </LinkGroup>
                        </CardContent>
                    </ProjectCard>
                ))}
            </ProjectsGrid>

            {/* معرض الصور */}
            <GalleryModal
                images={activeGallery}
                isOpen={galleryOpen}
                onClose={closeGallery}
                projectTitle={activeTitle}
            />
        </ProjectsWrapper>
    );
};

export default Projects;