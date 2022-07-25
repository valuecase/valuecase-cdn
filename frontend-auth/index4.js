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
import { p as post, B as BASE_API_URL, W as WORKFLOW_API_URL, R as RECOVERY_API_URL, r as react, a as AuthDispatchContext, A as AuthStateContext, j as jsxs, E as EmoForm, b as jsx, I as InputArea, c as Button, F as Fragment, d as EmoErrorMessage, e as emailRegex } from "./lib.js";
import { S as SuggestAction } from "./index2.js";
const requestResetPassword = async (data) => {
  const api = `${BASE_API_URL}${WORKFLOW_API_URL}${RECOVERY_API_URL}`;
  const config = {
    responseType: "json"
  };
  return await post(api, data, config);
};
const defaultState = {
  email: {
    value: "",
    error: false,
    message: ""
  }
};
const RequestResetPassword = () => {
  const dispatch = react.exports.useContext(AuthDispatchContext);
  const {
    requestResetPassword: requestResetPasswordState
  } = react.exports.useContext(AuthStateContext);
  const [data, setData] = react.exports.useState(defaultState);
  const [status, setStatus] = react.exports.useState();
  const disabled = react.exports.useMemo(() => {
    const {
      error: emailError,
      value: emailValue
    } = data.email;
    return !emailValue || emailError || status === "success" || status === "loading";
  }, [data, status]);
  const handleGoToSignIn = () => {
    react.exports.startTransition(() => {
      dispatch({
        type: "currentScreen",
        payload: "signin"
      });
    });
  };
  const handleInput = (event) => {
    setErrMessage(void 0);
    const {
      value
    } = event.target;
    setData((prev) => ({
      email: __spreadProps(__spreadValues({}, prev.email), {
        value,
        error: false,
        message: ""
      })
    }));
  };
  const [Errmessage, setErrMessage] = react.exports.useState();
  const handleOnBlur = (event) => {
    setErrMessage(void 0);
    const {
      value
    } = event.target;
    setData({
      email: {
        value,
        error: !emailRegex.test(value),
        message: !emailRegex.test(value) ? "Invalid email" : ""
      }
    });
  };
  const handleSubmitData = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setStatus("loading");
    const resetPasswordData = {
      email: data.email.value
    };
    requestResetPassword(resetPasswordData).then((res) => {
      setStatus(res.data.status);
    }).catch((error) => {
      console.error(error);
      setStatus("error");
    });
  };
  return /* @__PURE__ */ jsxs(EmoForm, {
    onSubmit: handleSubmitData,
    autoComplete: "on",
    children: [/* @__PURE__ */ jsx(InputArea, {
      fields: requestResetPasswordState == null ? void 0 : requestResetPasswordState.fields,
      onChange: handleInput,
      onBlur: handleOnBlur,
      data
    }), /* @__PURE__ */ jsx(Button, {
      background: status,
      disabled,
      type: "submit",
      children: status === "success" ? requestResetPasswordState == null ? void 0 : requestResetPasswordState.buttonLabelSuccess : requestResetPasswordState == null ? void 0 : requestResetPasswordState.buttonLabel
    }), Errmessage ? /* @__PURE__ */ jsx(Fragment, {
      children: /* @__PURE__ */ jsx("div", {
        style: {
          marginTop: "8px"
        },
        children: /* @__PURE__ */ jsx(EmoErrorMessage, {
          children: Errmessage
        })
      })
    }) : /* @__PURE__ */ jsx(Fragment, {}), /* @__PURE__ */ jsx(SuggestAction, {
      text: "Changed your mind?",
      linkText: "Sign in",
      onClick: handleGoToSignIn
    })]
  });
};
export { RequestResetPassword as default };
