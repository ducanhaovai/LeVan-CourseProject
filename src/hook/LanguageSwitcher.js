"use client"

import { useState, useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { Globe } from "lucide-react"

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div ref={ref} className="fixed bottom-8 right-8 z-50 mr-14">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-12 h-12 text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          aria-label="Language switcher"
        >
          <Globe className="w-6 h-6" />
        </button>

        <div
          className={`absolute right-0 w-32 mb-2 bottom-full origin-bottom-right bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 transition-all duration-300 ${
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="language-menu">
            {["en", "vi"].map((lang) => (
              <button
                key={lang}
                onClick={() => changeLanguage(lang)}
                className={`block w-full px-4 py-2 text-sm text-left transition-colors duration-200 transform ${
                  lang === i18n.language
                    ? "text-white bg-gradient-to-r from-blue-500 to-indigo-600"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
                role="menuitem"
              >
                {lang === "en" ? "English" : "Tiếng Việt"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LanguageSwitcher
