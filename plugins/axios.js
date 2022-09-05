let baseURL;

if (!process.env.NODE_ENV || process.env.NODE_ENV === "production") {
  baseURL = "https://html-vendor.herokuapp.com"
} else {
  baseURL = "https://html-vendor.herokuapp.com";
}

export default function ({ $axios }, inject) {
  const axios = $axios.create({
    baseURL: baseURL
  });
  inject("axios", axios);
}
