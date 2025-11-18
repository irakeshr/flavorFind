import React from 'react';
import { Star } from 'lucide-react';


const StarRating = ({ rating, setRating, interactive = false }) => {
  const totalStars = 5;
  
  return (
    <div className={`flex items-center gap-0.5 ${interactive ? 'cursor-pointer' : ''}`}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= Math.floor(rating);
        const isHalfFilled = !isFilled && starValue - 0.5 <= rating;

        return (
          <Star
            key={index}
            className={`
              ${isFilled ? 'text-yellow-400' : 'text-gray-300'}
              ${isHalfFilled ? 'text-yellow-400' : ''}
              ${interactive ? 'hover:text-yellow-300' : ''}
            `}
            fill={isFilled || isHalfFilled ? 'currentColor' : 'none'}
            size={16}
            onClick={() => interactive && setRating(starValue)}
            onMouseEnter={() => interactive && setRating(starValue)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;


