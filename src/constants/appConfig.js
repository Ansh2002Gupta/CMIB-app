import ReactConfig from "../components/ReactConfig";

const appConfig = {
  ROUTER_BASE_NAME: "/app",
  DOMAIN: ReactConfig.REACT_APP_CMIB_APP_DOMAIN, // If the deployed domain changes in future, remember to update this otherwise the Cookie remove method will not work.
};

export default appConfig;
