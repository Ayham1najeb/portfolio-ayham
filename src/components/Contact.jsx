import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import emailjs from 'emailjs-com';
// 💡 الأيقونات المُعبأة (Fa) للاتصال والتواصل الاجتماعي
import { FaEnvelope, FaPhoneAlt, FaLinkedinIn, FaFacebookF, FaGithub } from 'react-icons/fa'; 

// 🛑 المكونات المنسوخة من Hero.jsx لتصميم أيقونات التواصل الاجتماعي
const IconWrapper = styled(motion.span)`
    /* الخلفية الدائرية المطابقة لـ Hero */
    background-color: rgba(79, 70, 229, 0.1); 
    border-radius: 50%;
    width: 2.5rem; /* أصغر قليلاً من القديم لتطابق تصميم الهيرو */
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s;
`;

const IconLink = styled.a`
    /* لون الأيقونة المطابق لـ Hero */
    color: var(--color-accent); 
    font-size: 1.375rem; /* حجم الأيقونة داخل الدائرة */
    display: flex;
`;
// 🛑 نهاية المكونات المنسوخة

// Styled Components
const ContactWrapper = styled(motion.div)`
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem 2rem;
    text-align: center; 
`;

const Title = styled(motion.h2)`
    font-size: 3.8rem;
    font-weight: 800;
    color: var(--color-text); 
    /* شريط التمييز أسفل العنوان */
    margin-bottom: 3rem; 
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
    margin-bottom: 4.5rem;

    @media (max-width: 768px) {
        font-size: 1.1rem;
        margin-bottom: 2rem;
    }
`;

const ContentGrid = styled.div`
    display: flex;
    gap: 3.5rem; 
    text-align: right; 
    
    @media (max-width: 900px) {
        flex-direction: column;
    }
`;

const InfoSidebar = styled(motion.div)`
    flex: 0 0 380px; 
    display: flex;
    flex-direction: column;
    gap: 1.5rem; /* التباعد الرأسي بين البطاقات */

    @media (max-width: 900px) {
        order: 2; 
        flex: 1;
    }
`;

const InfoCard = styled(motion.div)`
    background-color: var(--color-card-bg);
    padding: 2rem; 
    border-radius: 0.7rem;
    margin-bottom: 0; 
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    border: 1px solid var(--color-border);
    display: flex;
    align-items: center;
    gap: 1.2rem; /* استبدال الـ margin ليكون متوافق مع RTL */
    transition: box-shadow 0.3s;
    
    & > svg { 
        color: var(--color-accent);
        font-size: 2rem; 
    }

    &:hover {
        box-shadow: 0 0 20px rgba(79, 70, 229, 0.3);
    }

    @media (max-width: 768px) {
        padding: 1.2rem;
        gap: 1rem;

        & > svg {
            font-size: 1.5rem;
        margin-bottom: 2rem;
    }
`;

const ContactContent = styled.div`
    display: flex;
    flex-direction: row; 
    gap: 4rem;

    @media (max-width: 992px) {
        flex-direction: column;
        gap: 2rem;
    }
`;

const InfoSection = styled(motion.div)`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const InfoCard = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 1.5rem;
    background-color: var(--color-card-bg);
    border-radius: 0.5rem;
    border: 1px solid var(--color-border);
    transition: transform 0.3s;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    }
`;

const IconWrapper = styled.div`
    font-size: 2rem;
    color: var(--color-accent);
    background-color: rgba(79, 70, 229, 0.1);
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
`;

const InfoText = styled.div`
    h4 {
        font-size: 1.2rem;
        color: var(--color-text);
        margin-bottom: 0.25rem;
    }
    p {
        font-size: 1rem;
        color: var(--color-text);
        opacity: 0.8;
    }
`;

const FormSection = styled(motion.form)`
    flex: 1.5;
    background-color: var(--color-card-bg);
    padding: 3rem;
    border-radius: 1rem;
    border: 1px solid var(--color-border);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    @media (max-width: 768px) {
        padding: 1.5rem;
    }
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Label = styled.label`
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-text);
`;

const Input = styled.input`
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid var(--color-border);
    background-color: var(--color-background);
    color: var(--color-text);
    font-size: 1rem;
    transition: border-color 0.3s;
    font-family: inherit;

    &:focus {
        outline: none;
        border-color: var(--color-accent);
        box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
    }
`;

const TextArea = styled.textarea`
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid var(--color-border);
    background-color: var(--color-background);
    color: var(--color-text);
    font-size: 1rem;
    min-height: 150px;
    resize: vertical;
    transition: border-color 0.3s;
    font-family: inherit;

    &:focus {
        outline: none;
        border-color: var(--color-accent);
        box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
    }
`;

const SubmitButton = styled(motion.button)`
    background-color: var(--color-accent);
    color: var(--color-background);
    font-weight: bold;
    font-size: 1.1rem;
    padding: 1rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
        background-color: #3730A3;
    }

    @media (max-width: 768px) {
        padding: 1rem;
        font-size: 1.1rem;
    }
`;

const StatusMessage = styled.p`
    margin-top: 1.5rem; 
    text-align: center;
    font-weight: 600;
    color: ${props => props.$success ? '#34D399' : '#F87171'}; 
`;



const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus("جاري الإرسال...");
        setIsSuccess(false);

        // 🛑 IDs المستخدمة في الكود (مفترض أنها صحيحة الآن)
        const SERVICE_ID = "service_uszqsto"; 
        const TEMPLATE_ID = "template_svh9u6f";
        const USER_ID = "Plji6Sr9AJJ6-4tUx";

        emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, USER_ID)
            .then(() => {
                setStatus("تم إرسال رسالتك بنجاح! سأرد عليك في أقرب وقت.");
                setIsSuccess(true);
                setFormData({ name: '', email: '', message: '' });
            }, () => {
                setStatus("حدث خطأ أثناء الإرسال. يرجى المحاولة لاحقاً.");
                setIsSuccess(false);
            });
    };

    return (
        <ContactWrapper
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
        >
            <Title>تواصل معي</Title>
            <Subtitle>
                لا تتردد في التواصل معي في أي وقت، يسعدني جداً الاستماع إليك!
            </Subtitle>

              <ContentGrid>
                
                {/* === Info Sidebar (Contact Details) === */}
                <InfoSidebar 
                    initial={{ x: 50, opacity: 0 }} 
                    whileInView={{ x: 0, opacity: 1 }} 
                    transition={{ duration: 0.6 }} 
                    viewport={{ once: true }}
                >
                    {/* Email Card */}
                    <InfoCard>
                        <FaEnvelope /> 
                        <div> 
                            <p style={{ color: 'var(--color-text)', fontWeight: 'bold' }}>البريد الإلكتروني</p>
                            <p style={{ color: '#6B7280', fontSize: '1rem', direction: 'ltr', textAlign: 'right' }}>ayhamoy2@gmail.com</p>
                        </div>
                    </InfoCard>

                    {/* Phone Card */}
                    <InfoCard>
                        <FaPhoneAlt /> 
                        <div> 
                            <p style={{ color: 'var(--color-text)', fontWeight: 'bold' }}>رقم الهاتف</p>
                            <p style={{ color: '#6B7280', fontSize: '1rem', direction: 'ltr', textAlign: 'right' }}>05519547382</p>
                        </div>
                    </InfoCard>
                    
                    {/* 🛑 Social Links */}
                    <SocialsContainer>
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
                    </SocialsContainer>

                </InfoSidebar>

                {/* === Form Submission Area === */}
                <FormArea onSubmit={handleSubmit} 
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    
                    <NameEmailGroup>
                        <FormGroup>
                            <Input type="text" id="name" name="name" placeholder="اسمك" value={formData.name} onChange={handleChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Input type="email" id="email" name="email" placeholder="بريدك الإلكتروني" value={formData.email} onChange={handleChange} required />
                        </FormGroup>
                    </NameEmailGroup>
                    
                    <FormGroup>
                        <TextArea id="message" name="message" placeholder="رسالتك..." value={formData.message} onChange={handleChange} required rows="6"></TextArea> 
                    </FormGroup>
                    
                    <SubmitButton type="submit">
                        إرسال الرسالة
                    </SubmitButton>

                    {/* Submission Status */}
                    {status && (
                        <StatusMessage $success={isSuccess}>
                            {status}
                        </StatusMessage>
                    )}
                </FormArea>
            </ContentGrid>
        </ContactWrapper>
    );
};

export default Contact;