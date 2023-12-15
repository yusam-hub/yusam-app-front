//DEP_WEBPACK_DEV_SERVER_ON_BEFORE_SETUP_MIDDLEWARE
//DEP_WEBPACK_DEV_SERVER_ON_AFTER_SETUP_MIDDLEWARE
//app/node_modules/react-scripts/config/webpackDevServer.config.js
module.exports = function (proxy, allowedHost) {
  const disableFirewall =
    !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true';
  return {
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined')
      }

      if (fs.existsSync(paths.proxySetup)) {
        require(paths.proxySetup)(devServer.app)
      }

      middlewares.push(
          evalSourceMapMiddleware(devServer),
          redirectServedPath(paths.publicUrlOrPath),
          noopServiceWorkerMiddleware(paths.publicUrlOrPath)
      )

      return middlewares;
    },
  };
};
