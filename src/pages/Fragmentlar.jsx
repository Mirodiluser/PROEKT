import React, { useState, useEffect } from 'react';

const LANGUAGES = [
  { code: 'uzbek', label: 'Uzbek', icon: '🇺🇿' },
  { code: 'kazakh', label: 'Kazakh', icon: '🇰🇿' },
  { code: 'turkish', label: 'Turkish', icon: '🇹🇷' },
];

const Fragmentlar = () => {
  const [language, setLanguage] = useState('uzbek');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(`/api/fragments/html/${language}`)
      .then((res) => res.text())
      .then((data) => setContent(data))
      .catch(() => setContent('<p>Ошибка загрузки данных</p>'));
  }, [language]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-end gap-4 mb-6">
        {LANGUAGES.map(({ code, label, icon }) => (
          <button
            key={code}
            onClick={() => setLanguage(code)}
            className={`px-4 py-2 rounded border transition-all font-medium ${
              language === code
                ? 'bg-purple-600 text-white shadow'
                : 'border-gray-400 hover:bg-gray-100'
            } flex items-center gap-2`}
          >
            <span className="text-xl">{icon}</span> {label}
          </button>
        ))}
      </div>

      <div
        className="prose max-w-none border p-4 rounded-md bg-white shadow-sm"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default Fragmentlar;
