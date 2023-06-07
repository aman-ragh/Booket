
const { createProxyMiddleware } = require('http-proxy-middleware');
const backendUrl="https://booket-server.onrender.com";

module.exports = function(app) {
  app.use(
    "/sendEmailOtp",
    createProxyMiddleware({
      target: backendUrl,
      changeOrigin: true,
    })
  );
  app.use(
    "/signinCheckBackend",
    createProxyMiddleware({
      target: backendUrl,
      changeOrigin: true,
    })
  );
  app.use(
    '/accountBackend',
    createProxyMiddleware({
      target: backendUrl,
      changeOrigin: true,
    })
  );
  app.use(
    '/signinBackend',
    createProxyMiddleware({
      target: backendUrl,
      changeOrigin: true,
    })
  );
  
  app.use("/uploadBackend", createProxyMiddleware({
    target: backendUrl,
    changeOrigin: true,
    }));
    
    app.use("/signupBackend", createProxyMiddleware({
      target: backendUrl,
      changeOrigin: true,
      }));
      app.use("/productsBackend", createProxyMiddleware({
        target: backendUrl,
        changeOrigin: true,
        }));
  
  
  
  
};