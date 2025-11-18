import React, { use, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, ModalBody, ModalHeader, Button } from "flowbite-react";
import {
  getAllReviews,
  deleteReviewApi,
  getReviewById,
  updateReviewApi,
} from "../services/allApi";

const ProfilePage = () => {
  const [reviews, setReviews] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editReviewData, setEditReviewData] = useState(null);

  //

  const [reviewData, setReviewData] = useState({
    userId: "",
    restaurantId: "",
    restaurantName: "", // Use optional chaining here
    userName: "",
 photos:[],
    ratings: {
      overall:0,
      food:0,
      service:0,
      ambiance:0,
    },
    reviewText: "",
    date: new Date().toISOString(),
  });

  //

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getAllReviews();
        if (response.status === 200) setReviews(response.data);
      } catch (err) {
        console.log(err);
      }
    }; fetchReviews();
  }, [openModal]);

  // handleDelete
  const handleDelete = async (id) => {
    try {
      const response = await deleteReviewApi(id);
      if (response.status === 200)
        setReviews((prevData) => prevData.filter((Data) => Data.id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  // handleFileChange

  const convert64 = (file) => {
    return new Promise((resolve, reject) => {
      const render = new FileReader();
      render.readAsDataURL(file);
      render.onload = () => {
        resolve(render.result);
      };
    });
  };

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    const base64Images = await Promise.all(
      selectedFiles.map((file) => convert64(file))
    );
    setReviewData((prevData) => ({
      ...prevData,
      photos: [...prevData.photos, ...base64Images],
    }));
  };


  // handleEdit

  const handleEdit = async (id) => {
    setOpenModal(true);
    try {
      const response = await getReviewById(id);
      if (response.status === 200) {
        setEditReviewData(response.data);
        setReviewData({
          ...response.data,
          photos: response.data.photos || [],
        });
        console.log(reviewData);
      }
    } catch (err) {
      console.log(err);
    }
   };

//    handle delete 

const handleDeletePhoto=(index)=>{
 const updatedImages=reviewData.photos.filter((_,i)=>i!==index);
 setReviewData((prevData)=>({
    ...prevData,photos:updatedImages
 }))
}
// handleSubmitForm


  const handleSubmitForm = async (i) => {
    const response = await updateReviewApi(i, reviewData);

    if (response.status === 200)setOpenModal(false)
  };

  return (
    <div>
      <div className="font-['Plus_Jakarta_Sans'] bg-[#F9F9F9]">
        <Modal show={openModal} onClose={() => setOpenModal(false)} size="7xl">
          <ModalHeader className="bg-[#1A1A1A] ">Edit Your Review</ModalHeader>
          <ModalBody className="bg-[#1A1A1A] overflow-auto  scrollbar-hide overflow-y-auto">
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
                                Editing Review for{" "}
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
                                    Or click to browse from your device. Show
                                    everyone what you ate!
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
                                    document
                                      .querySelector("#imag_input")
                                      .click();
                                  }}
                                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-100 text-dark-gray text-sm font-bold leading-normal tracking-[0.015em]"
                                >
                                  <span className="truncate">
                                    Browse Photos
                                  </span>
                                </button>
                              </div>
                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
                                {reviewData.photos && reviewData.photos.length > 0 && (
                                  <div className="grid w-100     grid-cols-3 gap-3 mt-4">
                                    {reviewData.photos.map((img, i) => (
                                      <div key={i} className="relative group">
                                        <img
                                          src={img}
                                          className="w-full h-28 object-cover rounded"
                                          alt="preview"
                                        />

                                        <button
                                          onClick={() => handleDeletePhoto(i)}
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
              (reviewData.ratings?.overall || editReviewData?.ratings.overall) >= star
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
                                <p className="text-dark-gray font-medium w-32">
                                  Food
                                </p>
                                <div className="flex items-center gap-1 ">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                      key={star}
                                      className={`material-symbols-outlined hover:text-yellow-500 cursor-pointer text-3xl sm:text-4xl transition 
            ${
              (reviewData.ratings?.food || editReviewData?.ratings.food) >= star
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
              (reviewData.ratings?.service || editReviewData?.ratings.service) >= star
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
              (reviewData.ratings?.ambiance || editReviewData?.ratings.ambiance) >= star
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
                              <textarea // Use defaultValue for initial render
                              defaultValue={editReviewData?.reviewText}
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
                                value={reviewData.reviewText} // Keep value for controlled component
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
                              onClick={()=>handleSubmitForm(reviewData.id)}
                              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-warm-yellow text-dark-gray text-base font-bold leading-normal tracking-[0.015em] shadow-lg hover:bg-yellow-400 transition-colors"
                            >
                              <span className="truncate">Save the Edit</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </main>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </Modal>
        <div className="relative flex min-h-screen w-full flex-col">
          <div className="container mx-auto flex flex-1 flex-col px-4 py-8 md:flex-row md:gap-8 md:py-12">
            {/* Left Column: Side Navigation & Profile */}
            <aside className="w-full shrink-0 md:w-64 lg:w-72">
              <div className="flex flex-col gap-6">
                {/* Profile Card */}
                <div className="flex flex-col items-center gap-4 rounded-xl border border-[#E0E0E0] bg-surface-light p-6 text-center">
                  <div className="relative">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-24 ring-4 ring-[#E63946]/20"
                      data-alt="A portrait of Eleanor Pena smiling."
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC_ChPeBzg9ryVtzjsAyGPqhxUHFYVyqgDtNFJHKgrI4vTwfVV8_TLRfq_qa8tvFOKQqx2PzXv9WuLZHgEwrZbC203pmYPwBQYTFnYxACuhvkvirxH9IAzLqSEVtc5XpWDoV3QEJNpWxWYHutQEgtjbW1lnwHQW0p_U4T9XUKQWjk5fa5ptfsWXuzsnYbB0cNzsr9W6ha7reUbaH8AvslOdQnheMkaA7P4TYzC8BTomnztYrE_Q6KWS1G0QS4Kx5vU41TOyBKb3Gs8")',
                      }}
                    ></div>
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-text-light-primary text-xl font-bold leading-normal">
                      Eleanor Pena
                    </h1>
                    <p className="text-text-light-secondary text-sm font-normal leading-normal">
                      @eleanor
                    </p>
                    <p className="text-text-light-secondary text-xs mt-2">
                      Member since Jan 2023
                    </p>
                  </div>
                </div>
                {/* Profile Stats */}
                <div className="flex w-full gap-3">
                  <div className="flex flex-1 flex-col gap-2 rounded-lg border border-[#E0E0E0] bg-surface-light p-3 items-center text-center">
                    <p className="text-text-light-primary tracking-light text-2xl font-bold leading-tight">
                      42
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-text-light-secondary text-sm font-normal leading-normal">
                        Reviews
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 rounded-lg border border-[#E0E0E0] bg-surface-light p-3 items-center text-center">
                    <p className="text-text-light-primary tracking-light text-2xl font-bold leading-tight">
                      128
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-text-light-secondary text-sm font-normal leading-normal">
                        Followers
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 rounded-lg border border-[#E0E0E0] bg-surface-light p-3 items-center text-center">
                    <p className="text-text-light-primary tracking-light text-2xl font-bold leading-tight">
                      210
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-text-light-secondary text-sm font-normal leading-normal">
                        Following
                      </p>
                    </div>
                  </div>
                </div>
                {/* SideNavBar */}
                <div className="flex flex-col gap-1 rounded-xl border border-[#E0E0E0] bg-surface-light p-2">
                  <Link
                    className="flex items-center gap-3 rounded-lg bg-[#E63946]/20 px-3 py-2.5 text-text-light-primary"
                    to="#"
                  >
                    <span className="material-symbols-outlined text-xl">
                      star
                    </span>
                    <p className="text-sm font-medium leading-normal">
                      My Reviews
                    </p>
                  </Link>
                  <Link
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-text-light-primary hover:bg-gray-100"
                    to="#"
                  >
                    <span className="material-symbols-outlined text-xl">
                      settings
                    </span>
                    <p className="text-sm font-medium leading-normal">
                      Account Settings
                    </p>
                  </Link>
                  <Link
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-text-light-primary hover:bg-gray-100"
                    to="#"
                  >
                    <span className="material-symbols-outlined text-xl">
                      favorite
                    </span>
                    <p className="text-sm font-medium leading-normal">
                      Liked Reviews
                    </p>
                  </Link>
                  <div className="my-2 h-px bg-[#E0E0E0]"></div>
                  <Link
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-accent-red hover:bg-accent-red/10"
                    to="#"
                  >
                    <span className="material-symbols-outlined text-xl">
                      logout
                    </span>
                    <p className="text-sm font-medium leading-normal">
                      Log Out
                    </p>
                  </Link>
                </div>
              </div>
            </aside>
            {/* Right Column: Main Content */}
            <main className="mt-8 flex-1 md:mt-0">
              <div className="flex flex-col gap-6">
                {/* Page Heading */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-text-light-primary text-4xl font-black leading-tight tracking-[-0.03em]">
                    Your Reviews
                  </p>
                </div>
                {/* Search & Filters */}
                <div className="flex flex-col gap-4 md:flex-row">
                  {/* SearchBar */}
                  <div className="flex-grow">
                    <label className="flex h-12 w-full flex-col">
                      <div className="flex h-full w-full flex-1 items-stretch rounded-lg">
                        <div className="flex items-center justify-center rounded-l-lg border border-r-0 border-[#E0E0E0] bg-surface-light pl-4 text-text-light-secondary">
                          <span className="material-symbols-outlined text-2xl">
                            search
                          </span>
                        </div>
                        <input
                          className="form-input h-full w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg border border-l-0 border-[#E0E0E0] bg-surface-light px-4 text-base font-normal leading-normal text-text-light-primary placeholder:text-text-light-secondary focus:border-[#E63946] focus:outline-0 focus:ring-2 focus:ring-[#E63946]/50"
                          placeholder="Search by restaurant or dish..."
                          value=""
                        />
                      </div>
                    </label>
                  </div>
                  {/* Chips */}
                  <div className="flex items-center gap-3 overflow-x-auto pb-2">
                    <button className="flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-lg border border-[#E0E0E0] bg-surface-light px-4 text-text-light-primary">
                      <p className="text-sm font-medium leading-normal">
                        Rating
                      </p>
                      <span className="material-symbols-outlined text-xl text-text-light-secondary">
                        expand_more
                      </span>
                    </button>
                    <button className="flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-lg border border-[#E0E0E0] bg-surface-light px-4 text-text-light-primary">
                      <p className="text-sm font-medium leading-normal">Date</p>
                      <span className="material-symbols-outlined text-xl text-text-light-secondary">
                        expand_more
                      </span>
                    </button>
                    <button className="flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-lg border border-[#E0E0E0] bg-surface-light px-4 text-text-light-primary">
                      <p className="text-sm font-medium leading-normal">
                        Sort By
                      </p>
                      <span className="material-symbols-outlined text-xl text-text-light-secondary">
                        expand_more
                      </span>
                    </button>
                  </div>
                </div>
                {/* Review Card Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {/* Review Card 1 */}
                  {reviews.map((review, index) => (
                    <div
                      key={index}
                      className="flex transform flex-col overflow-hidden rounded-xl border border-[#E0E0E0] bg-surface-light transition-shadow duration-300 hover:shadow-xl"
                    >
                      <div
                        className="aspect-video w-full bg-cover bg-center"
                        data-alt={review.restaurantName}
                        style={{
                          backgroundImage: `url(${
                            review.photos[0] ||
                            "https://via.placeholder.com/150"
                          })`,
                        }}
                      ></div>

                      <div className="flex flex-1 flex-col p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-text-light-primary">
                              {review.restaurantName}
                            </h3>
                            <p className="text-sm text-text-light-secondary">
                              {review.location}{" "}
                              {/* Assuming review object has location */}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 rounded-full bg-[#E63946]/20 px-2.5 py-1 text-sm font-bold text-yellow-700">
                            <span>{review.ratings.overall}</span>
                            <span className="material-symbols-outlined !text-base">
                              star
                            </span>
                          </div>
                        </div>

                        <p className="mt-3 flex-1 text-sm text-text-light-secondary">
                          "{review.reviewText}"
                        </p>
                        <p className="mt-4 text-xs text-text-light-secondary">
                          Reviewed on{" "}
                          {new Date(review.date).toLocaleDateString()}
                        </p>

                        {/* Buttons for Edit / Delete */}
                        <div className="mt-4 flex gap-2">
                          <button
                            className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
                            onClick={() => handleEdit(review.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                            onClick={() => handleDelete(review.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
