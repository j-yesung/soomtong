import axios from "axios";

export const BASE_HEADER = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

export const SOOMTONG_API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SITE_URL,
  headers: BASE_HEADER,
});

SOOMTONG_API.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

SOOMTONG_API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("인증 만료됨 — 로그인 페이지로 이동 필요");
    }
    return Promise.reject(error);
  },
);
