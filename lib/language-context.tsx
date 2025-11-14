'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'en' | 'hi' | 'mr'

interface Translations {
  [key: string]: {
    en: string
    hi: string
    mr: string
  }
}

const translations: Translations = {
  'dashboard': {
    en: 'Dashboard',
    hi: 'डैशबोर्ड',
    mr: 'डॅशबोर्ड'
  },
  'sales_records': {
    en: 'Sales Records',
    hi: 'बिक्री रिकॉर्ड',
    mr: 'विक्रय नोंदी'
  },
  'my_products': {
    en: 'My Products',
    hi: 'मेरे उत्पाद',
    mr: 'माझे उत्पादने'
  },
  'transporters': {
    en: 'Transporters',
    hi: 'परिवहन',
    mr: 'वाहतूक'
  },
  'product_demand': {
    en: 'Product Demand',
    hi: 'उत्पाद की मांग',
    mr: 'उत्पाद मागणी'
  },
  'select_product': {
    en: 'Select Product',
    hi: 'उत्पाद चुनें',
    mr: 'उत्पाद निवडा'
  },
  'current_month': {
    en: 'Current Month',
    hi: 'वर्तमान महीना',
    mr: 'सध्याचा महिना'
  },
  'add_product': {
    en: 'Add Product',
    hi: 'उत्पाद जोड़ें',
    mr: 'उत्पाद जोडा'
  },
  'record_sale': {
    en: 'Record Sale',
    hi: 'बिक्री रिकॉर्ड करें',
    mr: 'विक्रय नोंद करा'
  },
  'quantity': {
    en: 'Quantity',
    hi: 'मात्रा',
    mr: 'प्रमाण'
  },
  'price': {
    en: 'Price',
    hi: 'कीमत',
    mr: 'किंमत'
  },
  'date': {
    en: 'Date',
    hi: 'तारीख',
    mr: 'तारीख'
  },
  'contact': {
    en: 'Contact',
    hi: 'संपर्क',
    mr: 'संपर्क'
  },
  'rating': {
    en: 'Rating',
    hi: 'रेटिंग',
    mr: 'रेटिंग'
  }
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  const t = (key: string): string => {
    return translations[key]?.[language] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
