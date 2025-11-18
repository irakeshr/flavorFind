import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { PostReviewAPI } from "../services/allApi";
import { useEffect } from "react";
import { getRestaurantDetailsAPI } from "../services/allApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const WriteReviewPage = () => {
const [restaurantDetails, setRestaurantDetails] = useState();
  const params = useParams();

      useEffect(() => {
        
        const fetchRestaurantDetaildata = async () => {
          try {
            const restaurantResponse= await  getRestaurantDetailsAPI(params.restaurantId)
             if (restaurantResponse.status === 200)
 setRestaurantDetails(restaurantResponse.data);
            console.log(reviewData)
          } catch (err) { 
            console.log(err);
          }
        };
        fetchRestaurantDetaildata();
        
      }, []);
      console.log(restaurantDetails);


  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const param = useParams();
  console.log(param);

  const [reviewData, setReviewData] = useState({
    userId: "",
    restaurantId: param.restaurantId,
    restaurantName: '', // Use optional chaining here
    userName:"",
    

    photos: [],
    ratings: {
      overall: 0,
      food: 0,
      service: 0,
      ambiance: 0,
    },
    reviewText: "",
    date:new Date().toISOString(),
    
  });

  useEffect(() => {
    if (restaurantDetails) {
      setReviewData(prevData => ({
        ...prevData,
        restaurantName: restaurantDetails.name,
      }));
    }
  }, [restaurantDetails]);


  // base64Convertion Function

  const base64Convertion = (file) => {
    return new Promise((resolve, reject) => {
      const render = new FileReader();
      render.readAsDataURL(file);
      render.onload = () => resolve(render.result);
    });
  };

  //   onHandleFileChange  Function
  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    const base64Images = await Promise.all(
      selectedFiles.map((file) => base64Convertion(file))
    ); // Use Promise.all to wait for all conversions



    setReviewData((prevData) => ({
      ...prevData,
      photos: [...prevData.photos, ...base64Images],
    }));
    console.log(reviewData);
  };
  const handleDelete = (index) => {
    const updatedphoto = reviewData.photos.filter((_, i) => i !== index);
    setReviewData((prevData) => ({
      ...prevData,
      photos: updatedphoto,
    }));
  };


//   form-submit

const handleSubmitForm = async () => {
    try {
        // check the reviews data is every thing is filled
        if ( reviewData.photos.length === 0 || !reviewData.reviewText || reviewData.ratings.overall === 0) {
            Swal.fire({
                position: "top",
                icon: "warning",
                title: "Please fill in all required fields and provide an overall rating.",
                showConfirmButton: true,
                timer: 3000
            });
            return;
        }
        
        const response = await PostReviewAPI(reviewData)
        if (response.status === 201) {
            console.log(response);
             Swal.fire({
  position: "top",
  icon: "success",
  title: "You Have Successfully Posted Your Review!!",
  text: "Your review has been submitted.", // Added text for more detail

  showConfirmButton: false,
  timer: 1500
    });  
    navigate(`/restaurants/${param.restaurantId}`);
   
        } else{
            throw new Error("Failed to post review");
        }
      
    } catch (error) {
        Swal.fire({
            position: "top",
            icon: "error",
            title: error,
            text: error.response?.data?.message || "Something went wrong!",
            showConfirmButton: true,
            timer: 2000
        });
    
    }
   
  



}

  return (
    <div>
      <div className="font-['Plus_Jakarta_Sans']">
        <div className="relative flex min-h-screen w-full flex-col bg-[#F9F9F9] group/design-root overflow-x-hidden">
          <div className="layout-container flex h-full grow flex-col">
            <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-4xl">
                <div className="flex flex-col gap-8">
                  <div className="flex flex-wrap justify-between gap-3">
                    <div className="flex min-w-72 flex-col gap-2">
                      <p className="text-dark-gray text-4xl font-black leading-tight tracking-[-0.033em]">
                        Share Your Experience!
                      </p>
                      <p className="text-medium-gray text-base font-normal leading-normal">
                        Reviewing{" "}
                        <span className="font-semibold text-dark-gray">
                          The Golden Spoon - 123 Flavor Town Ave
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <h2 className="text-dark-gray text-[22px] font-bold leading-tight tracking-[-0.015em] mb-4">
                      Add Your Photos
                    </h2>
                    <div className="flex flex-col">
                      <div className="flex flex-col items-center gap-6 rounded-xl border-2 border-dashed border-gray-300 px-6 py-10">
                        <div className="flex max-w-[480px] flex-col items-center gap-2">
                          <p className="text-dark-gray text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">
                            Drop your photos here
                          </p>
                          <p className="text-medium-gray text-sm font-normal leading-normal max-w-[480px] text-center">
                            Or click to browse from your device. Show everyone
                            what you ate!
                          </p>
                        </div>
                        <input
                          type="file"
                          multiple
                          id="imag_input"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                        <button
                          onClick={() => {
                            document.querySelector("#imag_input").click();
                          }}
                          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-100 text-dark-gray text-sm font-bold leading-normal tracking-[0.015em]"
                        >
                          <span className="truncate">Browse Photos</span>
                        </button>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
                        {reviewData.photos.length > 0 && (
                          <div className="grid w-100     grid-cols-3 gap-3 mt-4">
                            {reviewData.photos.map((img, i) => (
                              <div key={i} className="relative group">
                                <img
                                  src={img}
                                  className="w-full h-28 object-cover rounded"
                                  alt="preview"
                                />

                                <button
                                  onClick={() => handleDelete(i)}
                                  className="absolute top-1 right-1 bg-[#00000080] text-white text-xs rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <h2 className="text-dark-gray text-[22px] font-bold leading-tight tracking-[-0.015em] mb-4">
                      Rate Your Experience
                    </h2>
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <p className="text-dark-gray font-medium w-32">
                          Overall
                        </p>

                        {/* star */}
                        <div className="flex items-center gap-1 ">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              className={`material-symbols-outlined hover:text-yellow-500 cursor-pointer   text-3xl sm:text-4xl transition 
            ${
              reviewData.ratings?.overall >= star
                ? "text-yellow-500"
                : "text-gray-500"
            }`}
                              onClick={() =>
                                setReviewData({
                                  ...reviewData,
                                  ratings: {
                                    ...reviewData.ratings,
                                    overall: star,
                                  },
                                })
                              }
                            >
                              star
                            </span>
                          ))}
                        </div>
                        {/* start end */}
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <p className="text-dark-gray font-medium w-32">Food</p>
                        <div className="flex items-center gap-1 ">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              className={`material-symbols-outlined hover:text-yellow-500 cursor-pointer text-3xl sm:text-4xl transition 
            ${
              reviewData.ratings?.food >= star
                ? "text-yellow-500"
                : "text-gray-500"
            }`}
                              onClick={() =>
                                setReviewData({
                                  ...reviewData,
                                  ratings: {
                                    ...reviewData.ratings,
                                    food: star,
                                  },
                                })
                              }
                            >
                              star
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <p className="text-dark-gray font-medium w-32">
                          Service
                        </p>
                        <div className="flex items-center gap-1 ">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              className={`material-symbols-outlined hover:text-yellow-500 cursor-pointer text-3xl sm:text-4xl transition 
            ${
              reviewData.ratings?.service >= star
                ? "text-yellow-500"
                : "text-gray-500"
            }`}
                              onClick={() =>
                                setReviewData({
                                  ...reviewData,
                                  ratings: {
                                    ...reviewData.ratings,
                                    service: star,
                                  },
                                })
                              }
                            >
                              star
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <p className="text-dark-gray font-medium w-32">
                          Ambiance
                        </p>
                        <div className="flex items-center gap-1 ">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              className={`material-symbols-outlined hover:text-yellow-500 cursor-pointer text-3xl sm:text-4xl transition 
            ${
              reviewData.ratings?.ambiance >= star
                ? "text-yellow-500"
                : "text-gray-500"
            }`}
                              onClick={() =>
                                setReviewData({
                                  ...reviewData,
                                  ratings: {
                                    ...reviewData.ratings,
                                    ambiance: star,
                                  },
                                })
                              }
                            >
                              star
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <h2 className="text-dark-gray text-[22px] font-bold leading-tight tracking-[-0.015em] mb-4">
                      Write Your Review
                    </h2>
                    <div>
                      <textarea
                        onChange={(e) =>
                          setReviewData({
                            ...reviewData,
                            reviewText: e.target.value,
                          })
                        }
                        className="block w-full font-2xl font-bold p-4 rounded-lg border-gray-300 bg-gray-50 shadow-sm focus:border-[#E63946] focus:ring-[#E63946] sm:text-sm text-dark-gray placeholder:text-medium-gray"
                        id="review"
                        name="review"
                        placeholder="Tell us about the flavors, the atmosphere, and what you loved (or didn't)..."
                        rows="8"
                        value={reviewData.reviewText}
                        required
                      ></textarea>
                      <p className="mt-2 text-sm text-medium-gray">
                        0/2000 characters
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end items-center gap-4 pt-4">
                    <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-transparent text-medium-gray text-base font-bold leading-normal">
                      <span className="truncate">Cancel</span>
                    </button>
                    <button
                      onClick={handleSubmitForm}
                      className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-warm-yellow text-dark-gray text-base font-bold leading-normal tracking-[0.015em] shadow-lg hover:bg-yellow-400 transition-colors"
                    >
                      <span className="truncate">Post My Review</span>
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteReviewPage;
