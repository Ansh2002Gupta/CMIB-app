import axios from "axios";

import useAxiosInstance from "../../axios/useAxiosInstance";

const useHttpService = () => {
  const { axiosInstance } = useAxiosInstance();
  class Http {
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

    static async patch(
      _url,
      data,
      headers = {},
      otherOptions = {},
      handleDiscard = () => {}
    ) {
      try {
        const cancelPatchRequest = axios.CancelToken.source();
        handleDiscard(cancelPatchRequest);
        const response = await axiosInstance.patch(_url, data, {
          headers: headers,
          cancelToken: cancelPatchRequest.token,
          ...otherOptions,
        });
        return response.data;
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

  return { Http };
};

export default useHttpService;
