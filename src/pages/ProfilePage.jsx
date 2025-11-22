 /*  src/pages/ProfilePage.jsx  */
import React, { useEffect, useState, useMemo, useRef } from "react";   // NEW: useRef
import { Link } from "react-router-dom";
import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import jsPDF from "jspdf";                                           // NEW
import html2canvas from "html2canvas";                               // NEW
import {
  getAllReviews,
  deleteReviewApi,
  getReviewById,
  updateReviewApi,
} from "../services/allApi";

const ProfilePage = () => {
  /* --------------------  STATE  -------------------- */
  const [reviews, setReviews] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editReviewData, setEditReviewData] = useState(null);

  /* filter states */
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("newest");
  const [sortBy, setSortBy] = useState("date");

  /* form state */
  const [reviewData, setReviewData] = useState({
    userId: "",
    restaurantId: "",
    restaurantName: "",
    userName: "",
    photos: [],
    ratings: { overall: 0, food: 0, service: 0, ambiance: 0 },
    reviewText: "",
    date: new Date().toISOString(),
  });

   
  const printRef = useRef();

  
  useEffect(() => {
    (async () => {
      try {
        const { data, status } = await getAllReviews();
        if (status === 200) setReviews(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [openModal]);

  
  const filtered = useMemo(() => {
    let list = [...reviews];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (r) =>
          r.restaurantName?.toLowerCase().includes(q) ||
          r.reviewText?.toLowerCase().includes(q)
      );
    }
    if (ratingFilter !== "All") {
      list = list.filter((r) => r.ratings?.overall === Number(ratingFilter));
    }
    list.sort((a, b) =>
      dateFilter === "oldest"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date)
    );
    if (sortBy === "rating") {
      list.sort((a, b) => b.ratings?.overall - a.ratings?.overall);
    }
    return list;
  }, [reviews, search, ratingFilter, dateFilter, sortBy]);

  
  const downloadPDF = async () => {
    const canvas = await html2canvas(printRef.current, {
      scale: 2,                
      useCORS: true,           
      backgroundColor: null,   
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = pdfHeight;
    let position = 0;

    
    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
    heightLeft -= pdf.internal.pageSize.getHeight();

     while (heightLeft >= 0) {
      position = heightLeft - pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();
    }

    pdf.save("my-reviews.pdf");
  };

   const handleDelete = async (id) => {
    try {
      const { status } = await deleteReviewApi(id);
      if (status === 200) setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch (e) {
      console.log(e);
    }
  };

  const handleEdit = async (id) => {
    setOpenModal(true);
    try {
      const { data, status } = await getReviewById(id);
      if (status === 200) {
        setEditReviewData(data);
        setReviewData({ ...data, photos: data.photos || [] });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const convert64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const imgs = await Promise.all(files.map((f) => convert64(f)));
    setReviewData((p) => ({ ...p, photos: [...p.photos, ...imgs] }));
  };

  const handleDeletePhoto = (idx) =>
    setReviewData((p) => ({
      ...p,
      photos: p.photos.filter((_, i) => i !== idx),
    }));

  const handleSubmitForm = async (id) => {
    try {
      const { status } = await updateReviewApi(id, reviewData);
      if (status === 200) setOpenModal(false);
    } catch (e) {
      console.log(e);
    }
  };
 
  return (
    <div className="font-['Plus_Jakarta_Sans'] bg-[#F9F9F9]">
       
      <Modal show={openModal} onClose={() => setOpenModal(false)} size="7xl">
        <ModalHeader className="bg-[#1A1A1A]">Edit Your Review</ModalHeader>
        <ModalBody className="bg-[#1A1A1A] overflow-auto scrollbar-hide">
          <div className="p-6 bg-[#1A1A1A] text-white space-y-6">
            {/* photos */}
            <div>
              <input
                type="file"
                multiple
                id="imgInput"
                className="hidden"
                onChange={handleFileChange}
              />
              <button
                onClick={() => document.getElementById("imgInput").click()}
                className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
              >
                Browse Photos
              </button>
              <div className="grid grid-cols-3 gap-3 mt-4">
                {reviewData.photos.map((img, i) => (
                  <div key={i} className="relative group">
                    <img
                      src={img}
                      alt=""
                      className="w-full h-28 object-cover rounded"
                    />
                    <button
                      onClick={() => handleDeletePhoto(i)}
                      className="absolute top-1 right-1 bg-black/60 text-white w-6 h-6 rounded-full opacity-0 group-hover:opacity-100"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* ratings */}
            {["overall", "food", "service", "ambiance"].map((cat) => (
              <div key={cat} className="flex items-center justify-between">
                <span className="capitalize">{cat}</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span
                      key={s}
                      onClick={() =>
                        setReviewData((p) => ({
                          ...p,
                          ratings: { ...p.ratings, [cat]: s },
                        }))
                      }
                      className={`cursor-pointer text-2xl ${
                        (reviewData.ratings?.[cat] || 0) >= s
                          ? "text-yellow-400"
                          : "text-gray-500"
                      }`}
                    >
                      star
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* text */}
            <textarea
              value={reviewData.reviewText}
              onChange={(e) =>
                setReviewData((p) => ({ ...p, reviewText: e.target.value }))
              }
              rows={6}
              className="w-full p-3 rounded bg-gray-800 text-white"
              placeholder="Tell us about your experience..."
            />

            {/* buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSubmitForm(reviewData.id)}
                className="px-4 py-2 rounded bg-yellow-500 text-black font-bold hover:bg-yellow-400"
              >
                Save Edit
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>

      {/* --------------  PAGE LAYOUT  -------------- */}
      <div className="relative flex min-h-screen w-full flex-col">
        <div className="container mx-auto flex flex-1 flex-col px-4 py-8 md:flex-row md:gap-8 md:py-12">
          {/* LEFT - profile card / nav */}
          <aside className="w-full shrink-0 md:w-64 lg:w-72">
            <div className="flex flex-col gap-6">
              {/* profile */}
              <div className="rounded-xl border border-[#E0E0E0] bg-white p-6 text-center">
                <div
                  className="mx-auto mb-4 h-24 w-24 rounded-full bg-cover bg-center ring-4 ring-[#E63946]/20"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC_ChPeBzg9ryVtzjsAyGPqhxUHFYVyqgDtNFJHKgrI4vTwfVV8_TLRfq_qa8tvFOKQqx2PzXv9WuLZHgEwrZbC203pmYPwBQYTFnYxACuhvkvirxH9IAzLqSEVtc5XpWDoV3QEJNpWxWYHutQEgtjbW1lnwHQW0p_U4T9XUKQWjk5fa5ptfsWXuzsnYbB0cNzsr9W6ha7reUbaH8AvslOdQnheMkaA7P4TYzC8BTomnztYrE_Q6KWS1G0QS4Kx5vU41TOyBKb3Gs8")',
                  }}
                />
                <h2 className="text-xl font-bold">Eleanor Pena</h2>
                <p className="text-sm text-gray-500">@eleanor</p>
                <p className="text-xs text-gray-400 mt-1">Member since Jan 2023</p>
              </div>

              {/* stats */}
              <div className="flex gap-3">
                {[
                  { label: "Reviews", val: reviews.length },
                  { label: "Followers", val: 42 },
                  { label: "Following", val: 210 },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="flex-1 rounded-lg border border-[#E0E0E0] bg-white p-3 text-center"
                  >
                    <p className="text-2xl font-bold">{s.val}</p>
                    <p className="text-xs text-gray-500">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* nav */}
              <nav className="rounded-xl border border-[#E0E0E0] bg-white p-2">
                <Link className="flex items-center gap-3 rounded-lg bg-[#E63946]/20 px-3 py-2.5 text-gray-800" to="#">
                  <span className="material-symbols-outlined">star</span>
                  <span className="text-sm font-medium">My Reviews</span>
                </Link>
                <Link className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-gray-100" to="#">
                  <span className="material-symbols-outlined">settings</span>
                  <span className="text-sm font-medium">Account Settings</span>
                </Link>
                <Link className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-gray-100" to="#">
                  <span className="material-symbols-outlined">favorite</span>
                  <span className="text-sm font-medium">Liked Reviews</span>
                </Link>
                <div className="my-2 h-px bg-gray-200" />
                <Link className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-red-600 hover:bg-red-50" to="#">
                  <span className="material-symbols-outlined">logout</span>
                  <span className="text-sm font-medium">Log Out</span>
                </Link>
              </nav>
            </div>
          </aside>

          {/* RIGHT - reviews */}
          <main className="mt-8 flex-1 md:mt-0">
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-4xl font-black tracking-tight">Your Reviews</h1>
                <button
                  onClick={downloadPDF}
                  className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
                >
                  <span className="material-symbols-outlined !text-base">download</span>
                  Download PDF
                </button>
              </div>

              {/* search + filters */}
              <div className="flex flex-col gap-4 md:flex-row">
                {/* search */}
                <div className="flex-grow">
                  <label className="relative flex h-12 w-full">
                    <div className="flex h-full w-full items-stretch">
                      <div className="flex items-center rounded-l-lg border border-r-0 border-gray-300 bg-white pl-4 text-gray-500">
                        <span className="material-symbols-outlined">search</span>
                      </div>
                      <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-r-lg border border-l-0 border-gray-300 bg-white px-4 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200"
                        placeholder="Search by restaurant or dish..."
                      />
                    </div>
                  </label>
                </div>

                {/* chips become native selects */}
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  <select
                    value={ratingFilter}
                    onChange={(e) => setRatingFilter(e.target.value)}
                    className="h-12 rounded-lg border border-gray-300 bg-white px-4 text-sm appearance-none cursor-pointer"
                  >
                    <option value="All">Rating</option>
                    {[5, 4, 3, 2, 1].map((r) => (
                      <option key={r} value={r}>
                        {r} ★
                      </option>
                    ))}
                  </select>

                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="h-12 rounded-lg border border-gray-300 bg-white px-4 text-sm appearance-none cursor-pointer"
                  >
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="h-12 rounded-lg border border-gray-300 bg-white px-4 text-sm appearance-none cursor-pointer"
                  >
                    <option value="date">Sort by Date</option>
                    <option value="rating">Sort by Rating</option>
                  </select>
                </div>
              </div>

              {/* ----------  NEW: wrap cards for PDF snapshot  ---------- */}
              <div ref={printRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div
                      className="aspect-video w-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${
                          review.photos?.[0] ||
                          "https://via.placeholder.com/400x225/cccccc?text=No+Image"
                        })`,
                      }}
                    />
                    <div className="p-4 flex flex-col">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-gray-800">
                            {review.restaurantName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {review.location || "Location N/A"}
                          </p>
                        </div>
                        <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-sm font-bold text-yellow-700">
                          {review.ratings?.overall}
                          <span className="material-symbols-outlined !text-base">star</span>
                        </span>
                      </div>

                      <p className="mt-3 text-sm text-gray-600 flex-1">
                        “{review.reviewText}”
                      </p>
                      <p className="mt-4 text-xs text-gray-400">
                        Reviewed on {new Date(review.date).toLocaleDateString()}
                      </p>

                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => handleEdit(review.id)}
                          className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(review.id)}
                          className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 text-sm"
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
  );
};

export default ProfilePage;