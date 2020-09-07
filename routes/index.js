var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.json({
    welcome: "Welcome, this is Mediu Clone api;",
    baseURL: "https://medium-clone-v1-expressjs-api.herokuapp.com/",
    developer: "Gaiya M. Obed",
    endpoints: {
      register: {
        url: "api/users/register",
        method: "POST",
        status: 200,
      },
      login: {
        url: "api/users/login",
        method: "POST",
        status: 200,
      },
      password_change: {
        url: "api/users/id",
        method: "PATCH",
        status: 201,
      },
      delete_account: {
        url: "api/users/id",
        method: "DELETE",
        status: 200,
      },
      get_a_user: {
        url: "api/users/id",
        method: "GET",
        status: 200,
      },
    }
  });
});

module.exports = router;
