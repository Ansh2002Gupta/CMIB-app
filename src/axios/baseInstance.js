import axios from "axios";
import Config from "../components/ReactConfig/ReactConfig";

import { API_VERSION_NUMBER } from "../constants/constants";

const baseInstance = axios.create({
  baseURL: Config.REACT_APP_API_URL,
});

baseInstance.interceptors.request.use(async (request) => {
  request.headers["api-version"] = API_VERSION_NUMBER;

  return request;
});

export default baseInstance;
