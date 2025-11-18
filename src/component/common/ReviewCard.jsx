import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import StarRating from "./StarRating"; // Assuming StarRating component is in the same common folder
const ReviewCard = ({ review }) => {
  const navigate = useNavigate();
  console.log("review", review);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
      <img
        className="w-full h-48 md:w-56 md:h-full object-cover cursor-pointer"
        src={review.photos[0] || "https://via.placeholder.com/150"} // Fallback image
        alt={"image"}
      />
      <div className="p-5 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-white text-xl text-gray-900 cursor-pointer hover:underline">
            {review.reviewText}
          </h3>
         
          <div className="flex items-center gap-2 mb-3">
            <StarRating rating={review.ratings.overall} />
            <span className="text-gray-600 dark:text-[#ADB5BD] text-sm ml-1">
              {review.ratings.overall}
            </span>
          </div>
        </div>
        <p className="text-gray-500 text-sm mt-4">
          Reviewed {moment(review.date).fromNow()}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
