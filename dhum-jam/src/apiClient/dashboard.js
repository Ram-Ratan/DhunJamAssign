import axios from "axios";
import * as CONSTANT from "./api.constant";

export const getAdminDetails = async (id) => {
  const url = `${CONSTANT.API_URL}/account/admin/${id}`;
  const response = await axios.get(url);
  return response;
};

export const updateAdminDetails = async ({id,payload}) =>{
    const url = `${CONSTANT.API_URL}/account/admin/${id}`;
    const response = await axios.put(url,payload)
    return response;
}
