import React from 'react';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <span aria-label={`${rating} stars`}>
      {Array(fullStars).fill().map((_, i) => (
        <span key={`full-${i}`} style={{ color: '#FFD700' }}>★</span>
      ))}
      {halfStar && <span style={{ color: '#FFD700' }}>☆</span>}
      {Array(emptyStars).fill().map((_, i) => (
        <span key={`empty-${i}`} style={{ color: '#ccc' }}>★</span>
      ))}
    </span>
  );
};

export default StarRating;
