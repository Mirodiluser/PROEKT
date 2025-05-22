import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import { ArrowLeft } from 'lucide-react'; // не забудь установить lucide-react

const LANGUAGES = {
  uzbek: "O‘zbekcha",
  kazakh: "Qazaqsha",
  turkish: "Türkçe",
};

const SelectedTranslations = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { selectedNumbers, sourceLanguage, targetLanguages } = location.state || {};

  const [allFragments, setAllFragments] = useState({}); // { langCode: [{number, text}] }

  useEffect(() => {
    if (!selectedNumbers || !sourceLanguage || !targetLanguages) {
      navigate('/');
      return;
    }
  
    // Убираем sourceLanguage из targetLanguages, если он там есть
    const filteredTargets = targetLanguages.filter(lang => lang !== sourceLanguage);
  
    const langsToLoad = [sourceLanguage, ...filteredTargets];
  
    Promise.all(
      langsToLoad.map((lang) =>
        fetch(`/api/fragments/html/${lang}`)
          .then(res => res.text())
          .then(data => {
            const regex = /<div\s+data-number="(\d+)">([\s\S]*?)<\/div>/gi;
            const arr = [];
            let match;
            while ((match = regex.exec(data)) !== null) {
              arr.push({ number: Number(match[1]), text: match[2] });
            }
            return { lang, fragments: arr };
          })
      )
    ).then(results => {
      const fragmentsMap = {};
      results.forEach(({ lang, fragments }) => {
        fragmentsMap[lang] = fragments;
      });
      setAllFragments(fragmentsMap);
    }).catch(() => {
      setAllFragments({});
    });
  }, [selectedNumbers, sourceLanguage, targetLanguages, navigate]);

  if (!selectedNumbers || !sourceLanguage || !targetLanguages) {
    return <p className="p-6 text-center text-red-600">Ma'lumotlar topilmadi. Iltimos, to'g'ri sahifaga qayting.</p>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Кнопка назад */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-purple-600 hover:text-purple-800"
        aria-label="Orqaga"
      >
        <ArrowLeft className="w-6 h-6" />
        <span>Orqaga</span>
      </button>

      <h1 className="text-2xl font-bold mb-6">Tanlangan tarjimalar</h1>

      {selectedNumbers.map((num) => (
        <div key={num} className="mb-6 border border-gray-300 rounded p-4 shadow-sm bg-white">
            <h2 className="font-semibold mb-2">Gap #{num}</h2>

            {[sourceLanguage, ...targetLanguages.filter(lang => lang !== sourceLanguage)].map((lang) => {
            const frag = allFragments[lang]?.find(f => f.number === num);
            return (
                <div key={lang} className="mb-3">
                <div className="font-medium text-purple-700">
                    {LANGUAGES[lang] || lang}:
                </div>
                <div className="prose max-w-none text-gray-800">
                    {frag ? parse(frag.text) : <i>Ma'lumot topilmadi</i>}
                </div>
                </div>
            );
            })}
        </div>
        ))}
    </div>
  );
};

export default SelectedTranslations;
