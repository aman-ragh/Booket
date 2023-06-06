const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    "/sendEmailOtp",
    createProxyMiddleware({
      target: 'http://localhost:2000',
      changeOrigin: true,
    })
  );
  app.use(
    "/signinCheckBackend",
    createProxyMiddleware({
      target: 'http://localhost:2000',
      changeOrigin: true,
    })
  );
  app.use(
    '/accountBackend',
    createProxyMiddleware({
      target: 'http://localhost:2000',
      changeOrigin: true,
    })
  );
  app.use(
    '/signinBackend',
    createProxyMiddleware({
      target: 'http://localhost:2000',
      changeOrigin: true,
    })
  );
  
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