import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import parse from 'html-react-parser';
import { useNavigate } from 'react-router-dom';

const LANGUAGES = [
  { code: 'uzbek', label: "O‘zbekcha", icon: '🇺🇿' },
  { code: 'kazakh', label: 'Qazaqsha', icon: '🇰🇿' },
  { code: 'turkish', label: 'Türkçe', icon: '🇹🇷' },
];

const Fragmentlar = () => {
  const [language, setLanguage] = useState('uzbek');
  const [fragments, setFragments] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [rightSelectedLangs, setRightSelectedLangs] = useState(new Set(['kazakh', 'turkish']));

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/fragments/html/${language}`)
      .then((res) => res.text())
      .then((data) => {
        const regex = /<div\s+data-number="(\d+)">([\s\S]*?)<\/div>/gi;
        const arr = [];
        let match;
        while ((match = regex.exec(data)) !== null) {
          arr.push({ number: Number(match[1]), text: match[2] });
        }
        setFragments(arr);
        setSelected(new Set());
      })
      .catch(() => setFragments([]));
  }, [language]);

  const toggleSelect = (num) => {
    setSelected((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(num)) newSet.delete(num);
      else newSet.add(num);
      return newSet;
    });
  };

  const toggleRightLang = (code) => {
    if (code === language) return; 
  
    setRightSelectedLangs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(code)) newSet.delete(code);
      else newSet.add(code);
      return newSet;
    });
  };

  const handleAddClick = () => {
    if (selected.size === 0 || rightSelectedLangs.size === 0) {
      alert('Iltimos, kamida bitta gap va tilni tanlang!');
      return;
    }

    navigate('/selected-translations', {
      state: {
        selectedNumbers: Array.from(selected),
        sourceLanguage: language,
        targetLanguages: Array.from(rightSelectedLangs),
      },
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto flex gap-6">
      <div className="flex-1 max-w-[calc(100%-180px)] flex flex-col">
        <div className="flex justify-end gap-4 mb-6">
          {LANGUAGES.map(({ code, label, icon }) => (
            <button
              key={code}
              onClick={() => setLanguage(code)}
              className={`btn px-4 py-2 rounded-md font-medium flex items-center gap-2
                ${
                  language === code
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                }`}
            >
              <span className="text-xl">{icon}</span> {label}
            </button>
          ))}
        </div>

        <div className="space-y-3 flex-grow overflow-auto border border-purple-300 rounded-md p-4 bg-white shadow-sm">
          {fragments.length === 0 && (
            <p className="text-center text-gray-500">Maʼlumotlar topilmadi</p>
          )}

          {fragments.map(({ number, text }) => (
            <div
              key={number}
              className={`flex items-start rounded-md p-4 shadow-sm relative cursor-pointer
                ${
                  selected.has(number)
                    ? 'border-2 border-green-500 bg-green-50'
                    : 'border-2 border-purple-300 bg-white hover:border-purple-500'
                }`}
              onClick={() => toggleSelect(number)}
            >
              {/* Галочка */}
              <div className="absolute top-3 right-3 text-gray-400">
                {selected.has(number) ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </div>

              <div>
                <div className="text-sm text-gray-500 mb-1">#{number}</div>
                <div className="prose max-w-none">{parse(text)}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleAddClick}
            className="bg-purple-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-purple-700 transition"
          >
            Qo'shish
          </button>
        </div>
      </div>

      <div className="w-40 border border-gray-300 rounded-md p-4 shadow bg-white select-none">
        <h3 className="font-semibold mb-3 text-gray-700">Tillar</h3>
        <div className="flex flex-col gap-3">
          {LANGUAGES.filter((lang) => lang.code !== language).map(({ code, label, icon }) => {
            const isSelected = rightSelectedLangs.has(code);
            return (
              <div
                key={code}
                onClick={() => toggleRightLang(code)}
                className={`flex items-center gap-2 cursor-pointer rounded px-2 py-1 
                  ${
                    isSelected
                      ? 'bg-purple-100 text-purple-800 font-semibold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                {isSelected ? (
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-300" />
                )}
                <span>{icon} {label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Fragmentlar;
