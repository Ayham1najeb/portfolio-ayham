import React, { createContext, useState, useEffect, useContext } from 'react';

// إنشاء السياق (Context) بقيمة أولية فارغة
const ThemeContext = createContext(null); 

// دالة مخصصة لاستخدام السياق في أي مكان
export const useTheme = () => {
    // 💡 هذا التحقق يمنع الخطأ إذا تم استدعاء الدالة خارج المزود (Provider)
    const context = useContext(ThemeContext);
    if (context === null) {
        throw new Error('useTheme يجب أن تُستخدم داخل ThemeProvider');
    }
    return context;
};

// مُزوّد الثيم (Provider)
export const ThemeProvider = ({ children }) => {
    // حالة الثيم الافتراضية: 'light' (لتبدأ بـ #F9FAFB)
    const [theme, setTheme] = useState('light'); 

    // عند تحميل المكون أو تغيير الثيم، نطبق الكلاس على الجسم (body)
    useEffect(() => {
        document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
    }, [theme]);

    // دالة تبديل الثيم
    const toggleTheme = () => {
        setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};