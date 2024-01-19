import axios from "axios";

import axiosInstance from "../axios/axiosInstance";

export default class Http {
  static async get(_url, apiOptions = {}, handleDiscard = () => {}) {
    try {
      const cancelGetRequest = axios.CancelToken.source();
      handleDiscard(cancelGetRequest);
      const response = await axiosInstance.get(_url, {
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
    try {
      const cancelPostRequest = axios.CancelToken.source();
      handleDiscard(cancelPostRequest);
      const response = await axiosInstance.post(_url, data, {
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
    try {
      const response = await axiosInstance.put(_url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async delete(_url) {
    try {
      const response = await axiosInstance.delete(_url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
