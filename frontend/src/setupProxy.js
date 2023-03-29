const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // app.use(
  //   "/sendEmailOtp",
  //   createProxyMiddleware({
  //     target: 'http://localhost:2000',
  //     changeOrigin: true,
  //   })
  // );
  // app.use(
  //   "/sendMobOtp",
  //   createProxyMiddleware({
  //     target: 'http://localhost:2000',
  //     changeOrigin: true,
  //   })
  // );
  // app.use(
  //   '/userSignup',
  //   createProxyMiddleware({
  //     target: 'http://localhost:2000',
  //     changeOrigin: true,
  //   })
  // );
  // app.use(
  //   '/userLoginBackend',
  //   createProxyMiddleware({
  //     target: 'http://localhost:2000',
  //     changeOrigin: true,
  //   })
  // );
  // app.use(
  //   '/userWelcomeBackend',
  //   createProxyMiddleware({
  //     target: 'http://localhost:2000',
  //     changeOrigin: true,
  //   })
  // );
  // app.use(
  //   '/adminRouteBackend',
  //   createProxyMiddleware({
  //     target: 'http://localhost:2000',
  //     changeOrigin: true,
  //   })
  // );
  // app.use(
  //   '/adminLoginBackend',
  //   createProxyMiddleware({
  //     target: 'http://localhost:2000',
  //     changeOrigin: true,
  //   })
  // );
  
  // // Organisation
  // app.use("/organisationCreateBackend", createProxyMiddleware({
  //   target: "http://localhost:2000",
  //   changeOrigin: true,
  // }));
  // app.use("/organisationLogin", createProxyMiddleware({
  //   target: "http://localhost:2000",
  //   changeOrigin: true,
  // }));
  // app.use("/organisationSignup", createProxyMiddleware({
  //   target: "http://localhost:2000",
  //   changeOrigin: true,
  //   }));
    
  // app.use("/organisationRoute", createProxyMiddleware({
  //   target: "http://localhost:2000",
  //   changeOrigin: true,
  // }));
  app.use("/uploadBackend", createProxyMiddleware({
    target: "http://localhost:2000",
    changeOrigin: true,
    }));
    
    app.use("/signupBackend", createProxyMiddleware({
      target: "http://localhost:2000",
      changeOrigin: true,
      }));
      app.use("/productsBackend", createProxyMiddleware({
        target: "http://localhost:2000",
        changeOrigin: true,
        }));
  
  
  
  
};