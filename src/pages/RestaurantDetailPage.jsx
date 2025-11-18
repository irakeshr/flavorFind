import React, { useEffect } from "react";
import { useState } from "react";
import{ Link }from 'react-router-dom'
import {
  getRestaurantDetailsAPI,
  getRestaurantReviewsAPI,
} from "../services/allApi";
import { useParams } from "react-router-dom";
import ReviewCard from "../component/common/ReviewCard";

const RestaurantDetailPage = () => {
  const [restaurantDetails, setRestaurantDetails] = useState();
  const [reviews, setReviews] = useState([]);
  const params = useParams();

  useEffect(() => {
    const fetchRestaurantDetaildata = async () => {
      try {
        const [reviewResponse, restaurantResponse] = await Promise.all([
          getRestaurantReviewsAPI(params.restaurantId),
          getRestaurantDetailsAPI(params.restaurantId),
        ]);
        if (reviewResponse.status === 200) setReviews(reviewResponse.data);
        if (restaurantResponse.status === 200)
          setRestaurantDetails(restaurantResponse.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRestaurantDetaildata();
  }, []);
  console.log(restaurantDetails);
  console.log(reviews);

  return (
    <div>
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-[#F9F9F9] dark:bg-[#2B2D42] font-['Plus_Jakarta_Sans'] text-[#2B2D42] dark:text-[#F9F9F9]">
        <div className="layout-container flex h-full grow flex-col">
          <main className="flex-1 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-64 md:h-96 rounded-[1rem] overflow-hidden">
                <div
                  className="md:col-span-2 w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url("${restaurantDetails?.image_url}")`,
                  }}
                >

                    
                </div>

                <div className="w-full ">
                  <div className="sticky top-28">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-[1rem] border border-[#E0E0E0] dark:border-[#495057]">
                      <h3 className="text-xl font-bold mb-4">
                        Restaurant Info
                      </h3>
                      <ul className="space-y-3 text-[#8D99AE] dark:text-[#ADB5BD]">
                        <li className="flex items-start gap-3">
                          <span className="material-symbols-outlined mt-0.5 text-[#E63946]">
                            location_on
                          </span>
                          <span className="flex-1">
                             {restaurantDetails?.location}
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="material-symbols-outlined mt-0.5 text-[#E63946]">
                            call
                          </span>
                          <span className="flex-1">{restaurantDetails?.phone}</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="material-symbols-outlined mt-0.5 text-[#E63946]">
                            language
                          </span>
                          <span className="flex-1 text-[#E63946] dark:text-[#FFC700] hover:underline">
            <Link to={restaurantDetails?.website}> Website</Link>
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="material-symbols-outlined mt-0.5 text-[#E63946]">
                            schedule
                          </span>
                          <div className="flex-1">
                            <p className="font-semibold text-[#2B2D42] dark:text-[#F9F9F9]">
                              Open Now
                            </p>
                            <p>Mon - Fri: 12pm - 10pm</p>
                            <p>Sat - Sun: 11am - 11pm</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
              </div>
              
              <div className="mt-8 flex flex-col lg:flex-row gap-8 lg:gap-12">
                <div className="w-full lg:w-2/3">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <div>
                      <h1 className="text-4xl font-bold text-[#2B2D42] dark:text-[#F9F9F9]">
                        {restaurantDetails?.name}
                      </h1>
                      <div className="mt-2 flex items-center gap-4 text-[#8D99AE] dark:text-[#ADB5BD]">
                        <div className="flex items-center gap-1">
                          <span
                            className="material-symbols-outlined rating-star"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            star
                          </span>
                          <span className="font-bold text-[#2B2D42] dark:text-[#F9F9F9] text-lg">
                            4.5
                          </span>
                          <span className="text-sm">({reviews.length} reviews)</span>
                        </div>
                        <span className="text-sm">•</span>
                        <span className="text-sm">{restaurantDetails?.cuisine}</span>
                        
                      </div>
                    </div>
                    <Link
                      className="mt-4 md:mt-0 flex-shrink-0 flex items-center justify-center gap-2 rounded-[9999px] h-12 px-6 bg-[#E63946] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-colors"
                     to={`/restaurants/${params.restaurantId}/write-review`}
                    >
                      <span className="material-symbols-outlined">edit</span>
                      <span>Write a Review</span>
                    </Link>
                  </div>
                 <div className="mt-8 border-t border-[#E0E0E0] dark:border-[#495057] pt-8">
  <h2 className="text-2xl font-bold text-[#2B2D42] dark:text-[#F9F9F9] mb-4">
    Menu
  </h2>

  <p className="text-lg text-[#2B2D42] dark:text-[#F9F9F9] font-semibold mb-2">
    Highlights
  </p>

  <p className="text-[#8D99AE] dark:text-yellow-500 font-bold leading-relaxed">
    {restaurantDetails?.menu || "Menu details not available"}
  </p>
</div>

                  <div className="mt-8 border-t border-[#E0E0E0] dark:border-[#495057] pt-8">
                    <h2 className="text-2xl font-bold text-[#2B2D42] dark:text-[#F9F9F9] mb-4">
                      Reviews
                    </h2>
                    <div className="space-y-6">
                      {/* reviews */}
                      {reviews.map((review,index)=>(
                       <ReviewCard review={review} key={index}/>
                        
                   ))}
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
            
          </main>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailPage;
