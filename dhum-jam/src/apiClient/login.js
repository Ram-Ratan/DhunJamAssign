import axios from "axios";
import * as CONSTANT from "./api.constant";


export const logIn = async (payload) => {
  const url = `${CONSTANT.API_URL}/account/admin/login`;
  const response = axios.post(url, payload);
  return response;
};
