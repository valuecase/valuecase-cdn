var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import { p as post, B as BASE_API_URL, W as WORKFLOW_API_URL, h as SET_PASSWORD_API_URL, r as react, A as AuthStateContext, j as jsxs, E as EmoForm, b as jsx, I as InputArea, c as Button } from "./lib.js";
import { r as redirectToIndexPage } from "./redirectToIndexPage.js";
const resetPassword = async (data) => {
  const api = `${BASE_API_URL}${WORKFLOW_API_URL}${SET_PASSWORD_API_URL}`;
  const config = {
    responseType: "json"
  };
  return await post(api, data, config);
};
const defaultState = {
  password: {
    value: "",
    error: false,
    message: ""
  },
  repassword: {
    value: ""
  }
};
const ResetPassword = () => {
  const url = new URL(window.location.href);
  const resetToken = url.searchParams.get("reset_token") || "";
  const isNewUser = url.searchParams.get("new_user");
  const {
    resetPassword: resetPassword$1,
    resetPasswordNewUser
  } = react.exports.useContext(AuthStateContext);
  const resetPasswordState = (() => {
    if (isNewUser)
      return resetPasswordNewUser;
    return resetPassword$1;
  })();
  const [data, setData] = react.exports.useState(defaultState);
  const [status, setStatus] = react.exports.useState();
  const disabled = react.exports.useMemo(() => {
    const {
      error,
      value
    } = data.password;
    return !value || error || status === "success" || status === "loading";
  }, [data, status]);
  const handleInput = (event) => {
    const {
      id,
      value
    } = event.target;
    if (id === "password") {
      setData(__spreadProps(__spreadValues({}, data), {
        password: {
          value,
          error: value !== data.repassword.value,
          message: value !== data.repassword.value ? "Passwords do not match" : ""
        }
      }));
    } else if (id === "repassword") {
      setData(__spreadProps(__spreadValues({}, data), {
        password: __spreadProps(__spreadValues({}, data.password), {
          error: value !== data.password.value,
          message: value !== data.password.value ? "Passwords do not match" : ""
        }),
        repassword: __spreadProps(__spreadValues({}, data.repassword), {
          value
        })
      }));
    }
  };
  const handleSubmitData = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setStatus("loading");
    const resetPasswordData = {
      password: data.password.value,
      token: resetToken
    };
    resetPassword(resetPasswordData).then((res) => {
      setStatus(res.data.status);
      redirectToIndexPage(res);
    }).catch((error) => {
      console.error(error);
      setStatus("error");
    });
  };
  return /* @__PURE__ */ jsxs(EmoForm, {
    onSubmit: handleSubmitData,
    autoComplete: "on",
    children: [/* @__PURE__ */ jsx(InputArea, {
      fields: resetPasswordState == null ? void 0 : resetPasswordState.fields,
      onChange: handleInput,
      data
    }), /* @__PURE__ */ jsx(Button, {
      background: status,
      disabled,
      type: "submit",
      children: status === "success" ? resetPasswordState == null ? void 0 : resetPasswordState.buttonLabelSuccess : resetPasswordState == null ? void 0 : resetPasswordState.buttonLabel
    })]
  });
};
export { ResetPassword as default };
