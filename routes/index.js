const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const routes = [];
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      routes.push({
        path: middleware.route.path,
        method: Object.keys(middleware.route.methods)[0].toUpperCase()
      });
    } else if (middleware.name === 'router') {
      middleware.handle.stack.forEach((handler) => {
        routes.push({
          path: middleware.regexp.toString(),
          method: handler.route.methods[Object.keys(handler.route.methods)[0]].toUpperCase()
        });
      });
    }
  });
  res.json(routes);
});

module.exports = router;