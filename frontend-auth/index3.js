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
import { p as post, B as BASE_API_URL, W as WORKFLOW_API_URL, g as SIGNIN_API_URL, s as styled, b as jsx, j as jsxs, r as react, A as AuthStateContext, a as AuthDispatchContext, E as EmoForm, I as InputArea, c as Button, d as EmoErrorMessage, e as emailRegex } from "./lib.js";
import { S as SuggestAction } from "./index2.js";
import { r as redirectToIndexPage } from "./redirectToIndexPage.js";
const signIn = async (data) => {
  const api = `${BASE_API_URL}${WORKFLOW_API_URL}${SIGNIN_API_URL}`;
  const config = {
    responseType: "json"
  };
  return await post(api, data, config);
};
const EmoButton = styled.span`
  transition: all 100ms ease;
  cursor: pointer;
  min-width: 40px;
  background: transparent;
  color: #2a4cfa;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 16px;
  gap: 10px;

  min-width: 40px;
  height: 30px;

  border: 1px solid #2a4cfa;
  border-radius: 4px;

  flex: none;
  order: 1;
  flex-grow: 0;

  &:hover {
    border: 1px solid #2a4cfa;
    color: #2a4cfa;
  }
`;
const ButtonOutlined = ({
  onClick,
  children,
  disabled
}) => {
  const handleClick = (event) => !disabled && onClick(event);
  return /* @__PURE__ */ jsx(EmoButton, {
    onClick: handleClick,
    disabled: Boolean(disabled),
    children
  });
};
const BannerDiv = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  padding-left: 8%;
  align-items: center;
  gap: 4%;

  width: 50%;
  height: 64px;
  background: #e9edff;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #323346;
  transition: all 0.1s;

  @media only screen and (max-width: 700px) {
    width: 100%;
    justify-content: center;
    align-items: center;
    padding-left: 0;
  }

  display: none;
  visibility: hidden;
`;
const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  line-height: 100%;
  font-family: inherit;
  font-style: inherit;
  font-weight: inherit;
  font-size: inherit;
  color: inherit;
`;
const SuggestionBanner = ({
  text,
  buttonText,
  onClick
}) => {
  return /* @__PURE__ */ jsxs(BannerDiv, {
    children: [/* @__PURE__ */ jsx(TextDiv, {
      children: text
    }), /* @__PURE__ */ jsx(ButtonOutlined, {
      onClick,
      children: buttonText
    })]
  });
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
  }
};
const WrapperDiv = styled.div`
  max-height: 100%;
`;
const SignIn = () => {
  const {
    signIn: signInState
  } = react.exports.useContext(AuthStateContext);
  const dispatch = react.exports.useContext(AuthDispatchContext);
  const [data, setData] = react.exports.useState(defaultState);
  const [status, setStatus] = react.exports.useState();
  const [message, setMessage] = react.exports.useState();
  const banner = {
    text: "Don't have an account?",
    buttonText: "Register now"
  };
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
  const handleGoToSignUp = () => {
    react.exports.startTransition(() => {
      dispatch({
        type: "currentScreen",
        payload: "signup"
      });
    });
  };
  const handleGoToRecovery = () => {
    react.exports.startTransition(() => {
      dispatch({
        type: "currentScreen",
        payload: "recovery"
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
        password: __spreadProps(__spreadValues({}, data.password), {
          value
        })
      }));
    }
  };
  const handleSubmitData = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setStatus("loading");
    const signInUserData = {
      email: data.email.value,
      password: data.password.value
    };
    signIn(signInUserData).then((res) => {
      redirectToIndexPage(res);
    }).catch((error) => {
      const {
        message: errorMessage
      } = error.response.data;
      setMessage(errorMessage);
      setStatus("error");
    });
  };
  return /* @__PURE__ */ jsxs(WrapperDiv, {
    children: [/* @__PURE__ */ jsxs(EmoForm, {
      onSubmit: handleSubmitData,
      children: [/* @__PURE__ */ jsx(InputArea, {
        fields: signInState == null ? void 0 : signInState.fields,
        onChange: handleInput,
        data
      }), /* @__PURE__ */ jsx(Button, {
        background: status,
        disabled,
        type: "submit",
        children: status === "error" ? signInState == null ? void 0 : signInState.buttonLabelError : signInState == null ? void 0 : signInState.buttonLabel
      }), message && /* @__PURE__ */ jsx("div", {
        style: {
          marginTop: "8px"
        },
        children: /* @__PURE__ */ jsx(EmoErrorMessage, {
          children: message
        })
      }), /* @__PURE__ */ jsx(SuggestAction, {
        text: "Forgot password?",
        linkText: "Reset",
        onClick: handleGoToRecovery
      })]
    }), /* @__PURE__ */ jsx(SuggestionBanner, {
      text: banner.text,
      buttonText: banner.buttonText,
      onClick: handleGoToSignUp
    })]
  });
};
export { SignIn as default };
