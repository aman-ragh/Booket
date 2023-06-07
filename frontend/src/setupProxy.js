
const { createProxyMiddleware } = require('http-proxy-middleware');
const backendUrl="https://booket-server.onrender.com";

module.exports = function(app) {
  app.use(
    "/api/sendEmailOtp",
    createProxyMiddleware({
      target: backendUrl,
      changeOrigin: true,
    })
  );
  app.use(
    "/api/signinCheckBackend",
    createProxyMiddleware({
      target: backendUrl,
      changeOrigin: true,
    })
  );
  app.use(
    '/api/accountBackend',
    createProxyMiddleware({
      target: backendUrl,
      changeOrigin: true,
    })
  );
  app.use(
    '/api/signinBackend',
    createProxyMiddleware({
      target: backendUrl,
      changeOrigin: true,
    })
  );
  
  app.use("/api/uploadBackend", createProxyMiddleware({
    target: backendUrl,
    changeOrigin: true,
    }));
    
    app.use("/api/signupBackend", createProxyMiddleware({
      target: backendUrl,
      changeOrigin: true,
      }));
      app.use("/api/productsBackend", createProxyMiddleware({
        target: backendUrl,
        changeOrigin: true,
        }));
  
  
  
  
};