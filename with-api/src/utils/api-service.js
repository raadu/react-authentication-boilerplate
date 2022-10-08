import axios from "axios";
import cookies from "js-cookie";
import { BASE_URL } from './constants'

const base_url = `${BASE_URL}`;

const getAuthToken = () => {
    if (cookies.get("react_auth_user_data")) {
        const userDataObject = JSON.parse(cookies.get("react_auth_user_data"));
        if (userDataObject?.accessToken) {
            return userDataObject.accessToken;
        } else {
            return false;
        }
    } else {
        return false;
    }
};

const hasSession = () =>
  localStorage.getItem("User") &&
  JSON.parse(localStorage.getItem("User"))?.client_session_key;

const generateHeaders = () => {
  if (getAuthToken()) return { authorization: `Bearer ${getAuthToken()}` };
  else if (hasSession()) return { "session-key": hasSession() };
  else return false;
};

export const getData = async (query, data, no_token) => {
  try {
    console.log('ss', `${base_url}/${query}`);
    
    let result = await axios({
      method: "GET",
      url: `${base_url}/${query}`,
      params: data,
      headers: no_token ? {} : generateHeaders(),
    });
    return result.data;
  } catch (error) {
    if (error?.response?.status === 401) {
      localStorage.removeItem("User");
      window.location = "/";
    }
  }
};

export const postData = async (query, data, no_token) => {
  try {
    let result = await axios({
      method: "POST",
      url: `${base_url}/${query}`,
      headers: no_token ? {} : generateHeaders(),
      data: data,
    });
    return result.data;
  } catch (error) {
    if (error?.response?.status === 401) {
      localStorage.removeItem("user");
      window.location = "/";
    }
  }
};
