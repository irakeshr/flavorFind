import React from 'react';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';
const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="bg-gray-50 rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.12)]
 overflow-hidden cursor-pointer transform hover:-translate-y-1 transition-all duration-300 border border-gray-200
"
      onClick={() => navigate(`/restaurants/${restaurant.id}`)}
    >
      <img className="w-full h-48 object-cover" src={restaurant.image_url} alt={restaurant.name} />
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900">{restaurant.name}</h3>
        <p className="text-gray-600 text-sm">{restaurant.cuisine} • {restaurant.priceRange}</p>
        <div className="flex items-center mt-2">
          <StarRating rating={3.5} />
          <span className="text-gray-600 text-sm ml-2">{restaurant.avgRating}</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
