const isPassValid = (candidate) => {
  const LengthRule = candidate.length > 7 === true;
  const AtLeastOneNumberRule = candidate.match(/[1-4]/g) === null ? false : true;
  console.info("AtLeastOneNumberRule", AtLeastOneNumberRule);
  if (LengthRule === false || AtLeastOneNumberRule === false) {
    const errorsReport = {
      length: LengthRule,
      atLeastOneNumber: AtLeastOneNumberRule
    };
    return errorsReport;
  } else {
    return true;
  }
};
export { isPassValid as i };
