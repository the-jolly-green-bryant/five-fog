import React, {createContext, useContext, useMemo, useState} from 'react'

export const LANGUAGES = ['ja-hrkt', 'ja-roma', 'ko', 'zh-hant', 'fr', 'de', 'es', 'it', 'en', 'cs', 'ja', 'zh-hans', 'pt-br'] as const
export type LanguageCode = typeof LANGUAGES[number]

const DEFAULT_LANGUAGE: LanguageCode = 'en'
const STORAGE_KEY = 'five-fog.language'

const isLanguageCode = (value: string | null): value is LanguageCode =>
    LANGUAGES.includes(value as LanguageCode)

type LanguageContextValue = {
    language: LanguageCode
    setLanguage: (language: LanguageCode) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [language, setLanguageState] = useState<LanguageCode>(() => {
        if (typeof window === 'undefined') {
            return DEFAULT_LANGUAGE
        }

        const saved = localStorage.getItem(STORAGE_KEY)
        return isLanguageCode(saved) ? saved : DEFAULT_LANGUAGE
    })

    const setLanguage = (next: LanguageCode) => {
        localStorage.setItem(STORAGE_KEY, next)
        setLanguageState(next)
    }

    const value = useMemo(() => ({
        language,
        setLanguage,
    }), [language])

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguage = () => {
    const context = useContext(LanguageContext)

    if (!context) {
        throw new Error('useLanguage must be used inside LanguageProvider')
    }

    return context
}