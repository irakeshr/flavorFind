import React, { useEffect } from 'react';
import {getPopularRestaurantsAPI, getSuggestionsAPI} from '../services/allApi';
import { useState } from 'react';
import { Search,MapPin } from 'lucide-react';
import RestaurantCard from '../component/common/RestaurantCard';
import StarRating from '../component/common/StarRating';
import bg_image from '../assets/bg.png'
import bg_img2 from '../assets/bg2.png'

const HomePage = () => {

  const [popular, setPopular] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        const [popularRes, suggestionsRes] = await Promise.all([
          getPopularRestaurantsAPI(),
          getSuggestionsAPI()
        ]);

        if (popularRes.status === 200) setPopular(popularRes.data);
        if (suggestionsRes.status === 200) setSuggestions(suggestionsRes.data);
      } catch (error) {
        console.error("Failed to fetch homepage data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomepageData();
  }, []);
  const img=bg_image
    
    return (
     <div className="bg-white">
  {/* Hero Section */}
  <div className="relative h-[700px] w-full bg-cover bg-center bg-no-repeat bg-fixed" style={{backgroundImage:`url(${img})`}}>
    

    {/* Overlay */}
    <div className="absolute inset-0  bg-opacity-50 flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-3 tracking-tight">
        Find Your Next Favorite Meal
      </h1>

      <p className="text-lg md:text-xl text-gray-200 mb-6">
        Discover the best food and restaurants around you.
      </p>

      {/* Static Location */}
      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full border border-white/20">
        <MapPin className="text-red-400" size={22} />
        <span className="text-white text-lg font-semibold">Kochi</span>
      </div>
    </div>
  </div>

  {/* Main Content */}
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-3 bg-cover bg-center bg-no-repeat bg-fixed" style={{backgroundImage:`url(${bg_img2})`}}>

    {/* Popular Restaurants */}
    <section>
      <h2 className="text-3xl font-bold text-gray-50 mb-6">Popular Restaurants</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popular.map(r => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      )}
    </section>

    {/* Suggestions Near You */}
    <section className="mt-14">
      <h2 className="text-3xl font-bold text-white  mb-6">Suggestions Near You</h2>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-6 p-5">
          {suggestions.map(r => (
            <div 
              key={r.id}
              className="bg-gray-50 rounded-xl shadow-lg overflow-hidden flex hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <img className="w-32 h-32 object-cover" src={r.imageUrl} alt={r.name} />

              <div className="p-4 flex flex-col justify-center">
                <h3 className="font-bold text-lg text-gray-900">{r.name}</h3>

                <div className="flex items-center mt-1">
                  <StarRating rating={r.avgRating} />
                  <span className="text-gray-600 text-sm ml-2">{r.avgRating}</span>
                </div>

                <p className="text-gray-600 text-sm mt-1">
                  {r.distance} • {r.priceRange} • {r.cuisine}
                </p>

                {r.options?.length > 0 && (
                  <span className="mt-2 text-xs font-medium bg-green-100 text-green-800 px-2 py-0.5 rounded-full w-fit">
                    {r.options[0]}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>

  </div>
</div>

    );
}

export default HomePage;
