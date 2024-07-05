import axios from "axios";
const config = { headers: { "Content-Type": `multipart/form-data` } };
const API_URL = "http://localhost:3000/api/";
class services {
  API_URL = "http://localhost:3000/api/";
  setLogin(data) {
    return axios(data);
  }
  getCategory(token) {
    const config = {
      method: "get",
      url: this.API_URL + "auth/products/categories",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    return axios(config);
  }
  getProducts(token, limit = 10, skip = 0, categoryID) {
    const queryParams = `?limit=${limit}&skip=${skip}${
      categoryID ? `&categoryID=${categoryID}` : ""
    }`;

    const config = {
      method: "get",
      url: `${this.API_URL}auth/products${queryParams}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    return axios(config);
  }
  getCart(token, UserID) {
    const config = {
      method: "get",
      url: this.API_URL + `auth/cart/getCart?UserID=${UserID}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    return axios(config);
  }

  addToCart(token, UserID, ProductId, Quantity) {
    const config = {
      method: "post",
      url: this.API_URL + "auth/cart/add",
      data: { UserID, ProductId, Quantity },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    return axios(config);
  }

  removeFromCart(token, ProductId, UserID) {
    const config = {
      method: "delete",
      url: this.API_URL + "auth/cart/removeCart",
      data: { ProductId, UserID },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    return axios(config);
  }
  getProductDetails(token, productId) {
    debugger;
    const config = {
      method: "get",
      url: `${this.API_URL}auth/products/details?ProductId=${productId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    return axios(config);
  }

  updatePassword(token, UserID, FullName, UserName, Password) {
    debugger
    const config = {
      method: "post",
      url: `${API_URL}auth/user/updatepassword`,
      data: { UserID, FullName, UserName, Password },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    return axios(config);
  }

  getUser(token, UserID) {
    const config = {
      method: "get",
      url: `${API_URL}auth/user/getuser?UserID=${UserID}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    return axios(config);
  }
}
export default new services();
