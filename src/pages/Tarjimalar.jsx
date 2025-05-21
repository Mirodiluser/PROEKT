import React from 'react'
import { useNavigate } from 'react-router-dom';

const Tarjimalar = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-100 flex flex-col justify-center items-center px-4 py-10">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-primary mb-10">
        Boburnoma Tarjimalari
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {/* Uzbek */}
        <button
          onClick={() => navigate('/book/uzbek')}
          className="btn btn-outline btn-primary text-lg py-6 rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
        >
          🇺🇿 Uzbekcha
        </button>

        {/* Kazakh */}
        <button
          onClick={() => navigate('/book/kazakh')}
          className="btn btn-outline btn-secondary text-lg py-6 rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
        >
          🇰🇿 Qazaqsha
        </button>

        {/* Turkish */}
        <button
          onClick={() => navigate('/book/turkish')}
          className="btn btn-outline btn-accent text-lg py-6 rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
        >
          🇹🇷 Türkçe
        </button>
      </div>
    </div>
  );
}

export default Tarjimalar