import React from 'react';

const Star = ({ filled }: { filled: boolean }) => (
  <svg
    width="35"
    height="35"
    viewBox="0 0 24 24"
    fill={filled ? 'var(--c-yellow)' : 'none'}
    stroke="#000000"
    strokeWidth="0.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`star-svg ${filled ? 'text-yellow-500' : 'text-gray-300'}`}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default Star;
