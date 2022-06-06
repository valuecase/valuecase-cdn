import { f as BASE_URL } from "./lib.js";
const redirectToIndexPage = (res) => {
  const { token, user_id } = res.data.response;
  token && user_id && window.location.replace(BASE_URL);
};
export { redirectToIndexPage as r };
