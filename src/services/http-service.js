import Config from "../components/ReactConfig/index";
import axios from "axios";

import axiosInstance from "../axios/axiosInstance";

const baseUrl = Config.REACT_APP_API_URL;

export default class Http {
  static async get(_url, apiOptions = {}, handleDiscard = () => {}) {
    const url = `${baseUrl}${_url}`;
    try {
      const cancelGetRequest = axios.CancelToken.source();
      handleDiscard(cancelGetRequest);
      const response = await axiosInstance.get(url, {
        cancelToken: cancelGetRequest.token,
        ...apiOptions,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async post(
    _url,
    data,
    headers = {},
    otherOptions = {},
    handleDiscard = () => {}
  ) {
    const url = `${baseUrl}${_url}`;
    try {
      const cancelPostRequest = axios.CancelToken.source();
      handleDiscard(cancelPostRequest);
      const response = await axiosInstance.post(url, data, {
        headers: headers,
        cancelToken: cancelPostRequest.token,
        ...otherOptions,
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
      const response = await axiosInstance.delete(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
