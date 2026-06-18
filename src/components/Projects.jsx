import React, { useState, useCallback } from 'react';
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
    background: rgba(5, 5, 15, 0.96);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(12px);
`;

const ModalHeader = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    background: linear-gradient(to bottom, rgba(0,0,0,0.6), transparent);
    z-index: 10002;
`;

const ModalTitle = styled.h3`
    color: rgba(255,255,255,0.9);
    font-size: 1.1rem;
    font-weight: 600;
`;

const ModalContent = styled(motion.div)`
    position: relative;
    width: 92%;
    max-width: 1200px;
    height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalImage = styled(motion.img)`
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 10px;
    box-shadow: 0 25px 80px rgba(0,0,0,0.6);
`;

const NavButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(79, 70, 229, 0.6);
    border: 1px solid rgba(79, 70, 229, 0.3);
    color: white;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    transition: all 0.3s ease;
    z-index: 10;
    backdrop-filter: blur(6px);

    &:hover {
        background: rgba(79, 70, 229, 0.95);
        transform: translateY(-50%) scale(1.12);
        box-shadow: 0 0 20px rgba(79, 70, 229, 0.5);
    }

    &.prev { left: -65px; }
    &.next { right: -65px; }

    @media (max-width: 900px) {
        width: 42px;
        height: 42px;
        font-size: 1rem;
        &.prev { left: 8px; }
        &.next { right: 8px; }
        background: rgba(79, 70, 229, 0.8);
    }
`;

const CloseButton = styled.button`
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255,255,255,0.15);
    color: white;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    transition: all 0.3s;

    &:hover {
        background: rgba(239, 68, 68, 0.8);
        border-color: transparent;
        transform: scale(1.1);
    }
`;

const ImageCounter = styled.div`
    position: fixed;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    color: rgba(255,255,255,0.6);
    font-size: 0.95rem;
    font-weight: 500;
    background: rgba(255,255,255,0.08);
    padding: 0.4rem 1.2rem;
    border-radius: 20px;
    border: 1px solid rgba(255,255,255,0.1);
    z-index: 10001;
`;

// Thumbnail Strip
const ThumbnailStrip = styled.div`
    position: fixed;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    padding: 10px 16px;
    background: rgba(0,0,0,0.5);
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.08);
    backdrop-filter: blur(10px);
    z-index: 10001;
    max-width: 90vw;
    overflow-x: auto;

    &::-webkit-scrollbar {
        height: 4px;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(79, 70, 229, 0.5);
        border-radius: 2px;
    }
`;

const Thumbnail = styled.button`
    width: 56px;
    height: 36px;
    border-radius: 6px;
    overflow: hidden;
    border: 2px solid ${props => props.$active ? 'rgba(79, 70, 229, 1)' : 'transparent'};
    cursor: pointer;
    padding: 0;
    opacity: ${props => props.$active ? '1' : '0.5'};
    transition: all 0.3s;
    flex-shrink: 0;
    background: transparent;

    &:hover {
        opacity: 1;
        border-color: rgba(79, 70, 229, 0.6);
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
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
    border-radius: 12px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    border: 1px solid var(--color-border); 
    overflow: hidden; 
    transition: all 0.4s ease;
    display: flex;
    flex-direction: column;

    &:hover {
        box-shadow: 0 0 35px rgba(79, 70, 229, 0.4);
        transform: translateY(-4px);
    }
`;

const ProjectImage = styled.div`
    width: 100%;
    height: 240px; 
    overflow: hidden;
    position: relative;
    cursor: pointer;

    & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top center;
        transition: transform 0.6s ease;
    }
    
    ${ProjectCard}:hover & > img { 
        transform: scale(1.06); 
    }

    @media (max-width: 768px) {
        height: 180px;
    }
`;

const ImageOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.4));
    opacity: 0;
    transition: opacity 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;

    ${ProjectImage}:hover & {
        opacity: 1;
    }
`;

const ViewGalleryBtn = styled.span`
    background: rgba(79, 70, 229, 0.9);
    color: white;
    padding: 0.6rem 1.2rem;
    border-radius: 10px;
    font-size: 0.95rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255,255,255,0.15);
    transform: translateY(10px);
    transition: transform 0.3s;

    ${ProjectImage}:hover & {
        transform: translateY(0);
    }
`;

const GalleryBadge = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 0.3rem 0.7rem;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255,255,255,0.1);
    z-index: 2;
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
    line-height: 1.7;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;

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
    cursor: pointer;

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

    const goNext = useCallback((e) => {
        if (e) e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const goPrev = useCallback((e) => {
        if (e) e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    // Handle keyboard navigation
    React.useEffect(() => {
        if (!isOpen) return;
        const handleKey = (e) => {
            if (e.key === 'ArrowRight') goNext();
            if (e.key === 'ArrowLeft') goPrev();
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [isOpen, goNext, goPrev, onClose]);

    // Reset index when opening
    React.useEffect(() => {
        if (isOpen) setCurrentIndex(0);
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <ModalOverlay
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                {/* Header */}
                <ModalHeader>
                    <ModalTitle>{projectTitle}</ModalTitle>
                    <CloseButton onClick={onClose}>
                        <FaTimes />
                    </CloseButton>
                </ModalHeader>

                {/* Main Image */}
                <ModalContent onClick={(e) => e.stopPropagation()}>
                    <NavButton className="prev" onClick={goPrev}>
                        <FaChevronLeft />
                    </NavButton>

                    <AnimatePresence mode="wait">
                        <ModalImage
                            key={currentIndex}
                            src={images[currentIndex]}
                            alt={`${projectTitle} - ${currentIndex + 1}`}
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -40 }}
                            transition={{ duration: 0.25 }}
                            draggable="false"
                            onContextMenu={(e) => e.preventDefault()}
                        />
                    </AnimatePresence>

                    <NavButton className="next" onClick={goNext}>
                        <FaChevronRight />
                    </NavButton>
                </ModalContent>

                {/* Counter */}
                <ImageCounter>
                    {currentIndex + 1} / {images.length}
                </ImageCounter>

                {/* Thumbnail Strip */}
                <ThumbnailStrip onClick={(e) => e.stopPropagation()}>
                    {images.map((img, i) => (
                        <Thumbnail
                            key={i}
                            $active={i === currentIndex}
                            onClick={() => setCurrentIndex(i)}
                        >
                            <img src={img} alt={`thumb-${i + 1}`} draggable="false" onContextMenu={(e) => e.preventDefault()} />
                        </Thumbnail>
                    ))}
                </ThumbnailStrip>
            </ModalOverlay>
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

    const closeGallery = useCallback(() => {
        setGalleryOpen(false);
        document.body.style.overflow = 'auto';
    }, []);

    const projectsData = [
        { 
            title: t('project_smartfile_title'), 
            description: t('project_smartfile_desc'), 
            tags: ["React", "Vite", "MUI", "Cloudflare"], 
            link: "https://smartfilehub.com/", 
            code: "#",
            image: `${import.meta.env.BASE_URL}projects/smartfilehub/1.png`,
            gallery: Array.from({ length: 17 }, (_, i) => `${import.meta.env.BASE_URL}projects/smartfilehub/${i + 1}.png`)
        },
        { 
            title: t('project_myshop_title'), 
            description: t('project_myshop_desc'), 
            tags: ["Laravel", "Livewire", "Tailwind CSS", "Stripe API", "MySQL"], 
            link: "#", 
            code: "https://github.com/Ayham1najeb/my-shop",
            image: `${import.meta.env.BASE_URL}projects/myshop/cover.jpg?v=2`,
            gallery: Array.from({ length: 21 }, (_, i) => `${import.meta.env.BASE_URL}projects/myshop/${i + 1}.png`)
        },
        { 
            title: t('project_velora_title'), 
            description: t('project_velora_desc'), 
            tags: ["React", "Styled Components", "REST API"], 
            link: "#", 
            code: "https://github.com/Ayham1najeb/velora-clinic-frontend",
            image: `${import.meta.env.BASE_URL}projects/velora/5.png`,
            gallery: Array.from({ length: 16 }, (_, i) => `${import.meta.env.BASE_URL}projects/velora/${i + 1}.png`)
        },
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
                            <ProjectImage onClick={() => project.gallery.length > 0 && openGallery(project.gallery, project.title)}>
                                <img src={project.image} alt={project.title} loading="lazy" draggable="false" onContextMenu={(e) => e.preventDefault()} />
                                {project.gallery.length > 0 && (
                                    <>

                                        <ImageOverlay>
                                            <ViewGalleryBtn>
                                                <FaImages /> عرض جميع الصور
                                            </ViewGalleryBtn>
                                        </ImageOverlay>
                                    </>
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
                                {project.link !== "#" ? (
                                    <LinkButton href={project.link} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }}>
                                        <FaExternalLinkAlt /> <span>{t('project_view')}</span> 
                                    </LinkButton>
                                ) : project.gallery.length > 0 ? (
                                    <LinkButton as="button" style={{ background: 'transparent', border: 'none', padding: 0 }} onClick={() => openGallery(project.gallery, project.title)} whileHover={{ scale: 1.05 }}>
                                        <FaImages /> <span>{t('project_gallery')}</span> 
                                    </LinkButton>
                                ) : (
                                    <LinkButton href={project.code} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }}>
                                        <FaExternalLinkAlt /> <span>{t('project_view')}</span> 
                                    </LinkButton>
                                )}
                                {project.code !== "#" ? (
                                    <LinkButton href={project.code} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }}>
                                        <FaGithub /> <span>{t('project_code')}</span>
                                    </LinkButton>
                                ) : project.gallery.length > 0 ? (
                                    <LinkButton as="button" style={{ background: 'transparent', border: 'none', padding: 0 }} onClick={() => openGallery(project.gallery, project.title)} whileHover={{ scale: 1.05 }}>
                                        <FaImages /> <span>{t('project_gallery')}</span> 
                                    </LinkButton>
                                ) : null}
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