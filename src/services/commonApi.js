import axios from "axios";
export const commonApi = async (httpMethod, url, data) => {
  const reqConfig = {
    method: httpMethod,
    url,
    data,
  };

  return await axios(reqConfig)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
