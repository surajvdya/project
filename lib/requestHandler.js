module.exports = {
  sendSuccess: (response, message, data, code) => {
    code = code === undefined ? 200 : code;
    response.status(code).json({ status: true, message, data });
  },
  sendError: (response, message, data, code) => {
    code = code === undefined ? 400 : code;
    response.status(code).json({ status: false, message, data });
  }
};
