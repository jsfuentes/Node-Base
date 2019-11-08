//modified from https://github.com/Abazhenov/express-async-handler/blob/master/index.js
//recommended from https://zellwk.com/blog/async-await-express/
//wraps an async (req, res, next) function
function asyncHandler(fn) {
  return function asyncHandlerWrap(...args) {
    const fnReturn = fn(...args); //call async ft getting promise
    const next = args[args.length - 1];
    return Promise.resolve(fnReturn).catch(next); //pass promise error into next to get to error handler
  };
}

module.exports = asyncHandler;
