import ReactConfig from "../components/ReactConfig";

const appendAppBaseURl = (imageUrl) => {
  return ReactConfig.PUBLIC_URL + imageUrl;
};

export default appendAppBaseURl;
