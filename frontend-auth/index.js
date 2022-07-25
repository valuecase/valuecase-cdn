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
import { p as post, B as BASE_API_URL, W as WORKFLOW_API_URL, S as SIGNUP_API_URL, r as react, A as AuthStateContext, a as AuthDispatchContext, j as jsxs, E as EmoForm, b as jsx, I as InputArea, c as Button, F as Fragment, d as EmoErrorMessage, e as emailRegex } from "./lib.js";
import { r as redirectToIndexPage } from "./redirectToIndexPage.js";
import { i as isPassValid } from "./check-password.js";
import { S as SuggestAction } from "./index2.js";
const signUp = async (data) => {
  const api = `${BASE_API_URL}${WORKFLOW_API_URL}${SIGNUP_API_URL}`;
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
  },
  password: {
    value: "",
    error: false,
    message: ""
  },
  repassword: {
    value: ""
  }
};
const SignUp = () => {
  const {
    signUp: signUpState
  } = react.exports.useContext(AuthStateContext);
  const dispatch = react.exports.useContext(AuthDispatchContext);
  const [data, setData] = react.exports.useState(defaultState);
  const [status, setStatus] = react.exports.useState();
  const [message, setMessage] = react.exports.useState();
  react.exports.useEffect(() => {
    setStatus(void 0);
    setMessage(void 0);
  }, [setStatus, data]);
  const disabled = react.exports.useMemo(() => {
    const {
      error: emailError,
      value: emailValue
    } = data.email;
    const {
      error: passwordError,
      value: passwordValue
    } = data.password;
    return !emailValue || !passwordValue || emailError || passwordError || status === "loading";
  }, [data, status]);
  const buttonLabel = react.exports.useMemo(() => {
    if (status === "error")
      return signUpState == null ? void 0 : signUpState.buttonLabelError;
    if (status === "success")
      return signUpState == null ? void 0 : signUpState.buttonLabelSuccess;
    return signUpState == null ? void 0 : signUpState.buttonLabel;
  }, [status, signUpState]);
  const handleGoToSignIn = () => {
    react.exports.startTransition(() => {
      dispatch({
        type: "currentScreen",
        payload: "signin"
      });
    });
  };
  const handleInput = (event) => {
    const {
      id,
      value
    } = event.target;
    if (id === "email") {
      if (data.email.error) {
        setData(__spreadProps(__spreadValues({}, data), {
          email: {
            value,
            error: value === "" ? false : !emailRegex.test(value),
            message: value === "" || emailRegex.test(value) ? "" : "Invalid email"
          }
        }));
      } else {
        setData(__spreadProps(__spreadValues({}, data), {
          email: {
            value,
            error: !emailRegex.test(value),
            message: !emailRegex.test(value) ? "Invalid email" : ""
          }
        }));
      }
    } else if (id === "password") {
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
  react.exports.useState(void 0);
  const handleSubmitData = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const result = isPassValid(data.password.value);
    console.info("password check", result);
    if (result === true) {
      setStatus("loading");
      const newUserData = {
        email: data.email.value,
        password: data.password.value
      };
      signUp(newUserData).then((res) => {
        setStatus("success");
        redirectToIndexPage(res);
      }).catch((error) => {
        const {
          message: errorMessage
        } = error.response.data;
        setStatus("error");
        setMessage(errorMessage);
      });
    } else {
      if (result.atLeastOneNumber === false || result.length === false) {
        setMessage("Password must contain at least 8 charachters and one number.");
      }
    }
  };
  return /* @__PURE__ */ jsxs(EmoForm, {
    onSubmit: handleSubmitData,
    children: [/* @__PURE__ */ jsx(InputArea, {
      fields: signUpState == null ? void 0 : signUpState.fields,
      onChange: handleInput,
      data
    }), /* @__PURE__ */ jsx(Button, {
      background: status,
      disabled,
      type: "submit",
      children: buttonLabel
    }), message ? /* @__PURE__ */ jsx(Fragment, {
      children: /* @__PURE__ */ jsx("div", {
        style: {
          marginTop: "8px"
        },
        children: /* @__PURE__ */ jsx(EmoErrorMessage, {
          children: message
        })
      })
    }) : /* @__PURE__ */ jsx(Fragment, {}), /* @__PURE__ */ jsx(SuggestAction, {
      text: "Have an account?",
      linkText: "Sign in",
      onClick: handleGoToSignIn
    })]
  });
};
export { SignUp as default };
