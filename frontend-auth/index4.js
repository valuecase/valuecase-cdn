import { p as post, B as BASE_API_URL, W as WORKFLOW_API_URL, R as RECOVERY_API_URL, r as react, a as AuthDispatchContext, A as AuthStateContext, j as jsxs, E as EmoForm, b as jsx, I as InputArea, c as Button, e as emailRegex } from "./lib.js";
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
    const {
      value
    } = event.target;
    if (data.email.error) {
      setData({
        email: {
          value,
          error: value === "" ? false : !emailRegex.test(value),
          message: value === "" || emailRegex.test(value) ? "" : "Invalid email"
        }
      });
    } else {
      setData({
        email: {
          value,
          error: !emailRegex.test(value),
          message: !emailRegex.test(value) ? "Invalid email" : ""
        }
      });
    }
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
      data
    }), /* @__PURE__ */ jsx(Button, {
      background: status,
      disabled,
      type: "submit",
      children: status === "success" ? requestResetPasswordState == null ? void 0 : requestResetPasswordState.buttonLabelSuccess : requestResetPasswordState == null ? void 0 : requestResetPasswordState.buttonLabel
    }), /* @__PURE__ */ jsx(SuggestAction, {
      text: "Changed your mind?",
      linkText: "Sign in",
      onClick: handleGoToSignIn
    })]
  });
};
export { RequestResetPassword as default };
