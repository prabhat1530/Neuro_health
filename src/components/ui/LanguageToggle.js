"use client";
import { useLanguage } from "./LanguageProvider";

export default function LanguageToggle() {
    const { language, toggleLanguage } = useLanguage();

    return (
        <button
            onClick={toggleLanguage}
            className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium text-sm hover:bg-blue-200 transition-colors"
        >
            {language === "en" ? "हिंदी में देखें" : "View in English"}
        </button>
    );
}
