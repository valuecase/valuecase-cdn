import { s as styled, j as jsxs, b as jsx } from "./lib.js";
const WrapperDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  margin-top: 1rem;
  font-family: 'Roboto';
  font-size: 12px;
  font-weight: regular;
`;
const Link = styled.a`
  text-decoration: none;
  color: #2a4cfa;
`;
const SuggestAction = ({
  text,
  linkText,
  onClick
}) => {
  return /* @__PURE__ */ jsxs(WrapperDiv, {
    children: [text, /* @__PURE__ */ jsx(Link, {
      href: "#",
      onClick,
      children: linkText
    })]
  });
};
export { SuggestAction as S };
