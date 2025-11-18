import { commonApi } from "./commonApi";
import { serverURL } from "./serverURL";

export const getPopularRestaurantsAPI = async () => {
  return await commonApi(
    "get",
    `${serverURL}restaurants?_limit=4&_sort=avgRating&_order=desc`,
    ""
  );
};
export const getSuggestionsAPI = async () => {
  return await commonApi(
    "get",
    `${serverURL}restaurants?_limit=3&_start=4`,
    ""
  );
};

export const getRestaurantDetailsAPI = async (id) => {
  return await commonApi("get", `${serverURL}restaurants/${id}`, "");
};

export const getAllRestaurant = () => {
  return commonApi("get", `${serverURL}restaurants`, "");
};

export const getRestaurantReviewsAPI = async (restaurantId) => {
  return await commonApi(
    "get",
    `${serverURL}reviews?restaurantId=${restaurantId}`,
    ""
  );
};
export const PostReviewAPI = async (data) => {
  return await commonApi("post", `${serverURL}reviews`, data);
};

export const getAllReviews = () => {
  return commonApi("get", `${serverURL}reviews`, "");
};

export const deleteReviewApi=(id)=>{
   return commonApi("delete",`${serverURL}reviews/${id}`,``)
}

export const getReviewById=(id)=>{
  return commonApi("get",`${serverURL}reviews/${id}`,``)
}

export const updateReviewApi=(id,data)=>{
  return commonApi("put",`${serverURL}reviews/${id}`,data)
}