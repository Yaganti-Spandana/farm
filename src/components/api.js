import axios from "axios";

const API = "https://farm-pgi5.onrender.com/api/";

export const signup = (data) => axios.post(API + "register/", data);
export const login = (data) => axios.post(API + "login/", data);

export const logout = () => {
  localStorage.removeItem("token");
};

export const getProducts = () =>
  axios.get("https://farm-pgi5.onrender.com/api/products/");

export const addToWishlist = (id) =>
  axios.post(API + "wishlist/add/", 
    { subproduct: id },
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );

export const addToCart = (id) =>
  axios.post(API + "cart/add/",
    { subproduct: id },
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );
