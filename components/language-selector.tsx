'use client'

import { useLanguage } from '@/lib/language-context'
import { Button } from '@/components/ui/button'

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex gap-2">
      <Button
        variant={language === 'en' ? 'default' : 'outline'}
        onClick={() => setLanguage('en')}
        size="sm"
      >
        English
      </Button>
      <Button
        variant={language === 'hi' ? 'default' : 'outline'}
        onClick={() => setLanguage('hi')}
        size="sm"
      >
        हिंदी
      </Button>
      <Button
        variant={language === 'mr' ? 'default' : 'outline'}
        onClick={() => setLanguage('mr')}
        size="sm"
      >
        मराठी
      </Button>
    </div>
  )
}
