// import Config from "react-native-config";
import Config from "../components/ReactConfig/index";
import axios from "axios";
import { Platform } from "@unthinkable/react-core-components";

import axiosInstance from "../axios/axiosInstance";

// const baseUrl = Platform.OS !== "web" ? Config.REACT_APP_API_URL : process.env.REACT_APP_API_URL;
const baseUrl=Config.REACT_APP_API_URL;

export default class Http {
  static async get(_url, handleDiscard = () => {}) {
    const url = `${baseUrl}${_url}`;
    try {
      const cancelGetRequest = axios.CancelToken.source();
      handleDiscard(cancelGetRequest);
      const response = await axiosInstance.get(url, {
        cancelToken: cancelGetRequest.token,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async post(_url, data, handleDiscard = () => {}) {
    const url = `${baseUrl}${_url}`;
    try {
      const cancelPostRequest = axios.CancelToken.source();
      handleDiscard(cancelPostRequest);
      const response = await axiosInstance.post(url, data, {
        cancelToken: cancelPostRequest.token,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async put(_url, data) {
    const url = `${baseUrl}${_url}`;
    try {
      const response = await axios.put(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  static async delete(_url) {
    const url = `${baseUrl}${_url}`;
    try {
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
