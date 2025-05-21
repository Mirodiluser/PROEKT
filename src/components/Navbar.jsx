import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const Navbar = () => {
  return (
    <div className="bg-gradient-to-r from-[#1e3a8a] to-[#9333ea] text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <BookOpen className="w-6 h-6 text-white" />
          <Link to="/" className="hover:text-yellow-300 transition duration-300">
            Boburnoma
          </Link>
        </div>

        <div className="flex gap-4">
          {['/', '/tarjimalar', '/fragmentlar'].map((path, idx) => {
            const label = {
              '/': 'Bosh Sahifa',
              '/tarjimalar': 'Tarjimalar',
              '/fragmentlar': 'Fragmentlar',
            }[path];

            return (
              <NavLink
                key={idx}
                to={path}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-2 font-medium transition duration-300
                  ${isActive
                    ? 'bg-white text-purple-700 shadow'
                    : 'hover:bg-white hover:text-purple-800'}`
                }
                end={path === '/'}
              >
                {label}
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
