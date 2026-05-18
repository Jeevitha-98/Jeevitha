import API from "./api";


export const loginUser = async (mobile) => {
  const response = await API.post("/auth/login", { mobile });
  return response.data;
};


export const registerUser = async (data) => {
  const response = await API.post("/auth/register", data);
  return response.data;
};