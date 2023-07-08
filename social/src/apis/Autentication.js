import axios from "axios";

const URL_API = "http://localhost:5000/api/user/";

export const LoginAPI = async ({ email, password }) => {
  const url = `${URL_API}login`;
  const headers = {
    "Content-Type": "application/json",
  };
  const newUser = {
    email,
    password,
  };
  return await axios.post(url, newUser, { headers }).then((response) => {
    return response.data;
  });
};

export const RegisterAPI = async ({ fullName, email, password }) => {
  const newUser = {
    fullName,
    email,
    password,
  };
  const url = URL_API;
  const headers = {
    "Content-Type": "application/json",
  };

  return await axios.post(url, newUser, { headers }).then((response) => {
    return response.data;
  });
};
