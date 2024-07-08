export const catchAsyncError = (passwedFunction) => (req, res, next) => {
  Promise.resolve(passwedFunction(req, res, next)).catch(next);
};
