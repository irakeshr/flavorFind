import React, { useEffect } from 'react';
import { getAllRestaurant } from '../services/allApi';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/bg2.png'

const Restaurants = () => {

    const [restaurants,setRestaurants]=useState([])
    useEffect(()=>{
const fetchRestaurants=async()=>{
    try{
        const response=await getAllRestaurant();
        console.log(response.data)
        if(response.status===200) setRestaurants(response.data)

    }catch(err){
        console.log(err)

    }
}
fetchRestaurants()
    },[])


    return (
        <div>

            <div className="bg-cover bg-center bg-no-repeat bg-fixed font-['Plus_Jakarta_Sans'] text-[#2B2D42]" style={{backgroundImage:`url(${img})`}}>
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <main className="flex flex-1 justify-center py-5 px-4 md:px-0">
            <div className="layout-content-container flex flex-col w-full max-w-7xl flex-1 gap-8">
              <div className="flex flex-col gap-4 px-4 md:px-0">
                <h1 className="text-[#ffffff] text-3xl md:text-4xl font-bold leading-tight tracking-[-0.015em]">
                  Restaurants in New York
                </h1>
                <p className="text-[#ffffff] text-base md:text-lg">
                  Discover the best places to eat in the city that never sleeps.
                </p>
              </div>
              <div className="w-full space-y-4 px-4 md:px-0">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="flex-grow w-full">
                    <label className="relative text-[#8D99AE] focus-within:text-[#E63946]">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2">
                        search
                      </span>
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden text-[#2B2D42] focus:ring-[#E63946] focus:border-[#E63946] border-[#E0E0E0] bg-white rounded-[9999px] h-12 placeholder:text-[#8D99AE] pl-10 pr-4 text-base font-normal leading-normal"
                        placeholder="Search for a restaurant..."
                        value=""
                      />
                    </label>
                  </div>
                  <button className="w-full md:w-auto flex items-center justify-center gap-2 rounded-[9999px] h-12 px-5 bg-[#E63946] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-colors">
                    <span className="material-symbols-outlined">tune</span>
                    <span className="truncate">Filters</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-3 items-center">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-[9999px] border border-[#E0E0E0] bg-white text-sm hover:border-[#E63946] hover:text-[#E63946] transition-colors">
                    Cuisine{' '}
                    <span className="material-symbols-outlined text-base">
                      expand_more
                    </span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-[9999px] border border-[#E0E0E0] bg-white text-sm hover:border-[#E63946] hover:text-[#E63946] transition-colors">
                    Price Range{' '}
                    <span className="material-symbols-outlined text-base">
                      expand_more
                    </span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-[9999px] border border-[#E0E0E0] bg-white text-sm hover:border-[#E63946] hover:text-[#E63946] transition-colors">
                    Rating{' '}
                    <span className="material-symbols-outlined text-base">
                      expand_more
                    </span>
                  </button>
                  <span className="text-sm text-[#ffffff]">
                    {restaurants.length} restaurants found
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-0">


                {restaurants.map((restaurant, index) => (
        <Link to={`/restaurants/${restaurant.id}`}   key={index}> <div
         
          className="flex flex-col gap-3 rounded-[1rem] bg-white shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
        >
    <div
  key={restaurant.id}
  className="flex flex-col gap-3 rounded-[1rem] bg-white shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
>
   
  <div
    className="w-full bg-center bg-no-repeat aspect-video bg-cover"
    data-alt={restaurant.name}
    style={{
      backgroundImage: `url("${restaurant.image_url}")`,
    }}
  ></div>

  <div className="flex flex-col flex-1 p-4 pt-0 gap-3">
    <h3 className="text-[#2B2D42] text-xl font-bold leading-normal">
      {restaurant.name}
    </h3>

    <p className="text-[#8D99AE] text-sm font-normal leading-normal">
      Location: {restaurant.location}
    </p>

    <div className="flex justify-between items-center text-sm text-[#8D99AE]">
      <div className="flex items-center gap-1">
        <span
          className="material-symbols-outlined rating-star !text-lg"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          star
        </span>
        <span className="font-bold text-[#2B2D42]">
          {restaurant.avgRating}
        </span>
        <span>({restaurant.reviews} reviews)</span>
      </div>
      <span className="text-sm">{restaurant.distance}</span>
    </div>
  </div>
</div>


        </div>

        </Link>
      ))}


              </div>
              <div className="flex justify-center items-center gap-2 pt-8">
                <button className="flex items-center justify-center size-10 rounded-[9999px] border border-[#E0E0E0] text-[#8D99AE] hover:bg-gray-100 transition-colors">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="flex items-center justify-center size-10 rounded-[9999px] bg-[#E63946] text-white text-sm font-bold">
                  1
                </button>
                <button className="flex items-center justify-center size-10 rounded-[9999px] text-[#2B2D42] text-sm font-bold hover:bg-gray-100 transition-colors">
                  2
                </button>
                <button className="flex items-center justify-center size-10 rounded-[9999px] text-[#2B2D42] text-sm font-bold hover:bg-gray-100 transition-colors">
                  3
                </button>
                <span className="text-[#8D99AE]">...</span>
                <button className="flex items-center justify-center size-10 rounded-[9999px] text-[#2B2D42] text-sm font-bold hover:bg-gray-100 transition-colors">
                  10
                </button>
                <button className="flex items-center justify-center size-10 rounded-[9999px] border border-[#E0E0E0] text-[#8D99AE] hover:bg-gray-100 transition-colors">
                  <span className="material-symbols-outlined">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
            
        </div>
    );
}

export default Restaurants;
