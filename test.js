var jwt = require('jsonwebtoken');
require('dotenv').config();
const accessToken =jwt.sign("user.username",process.env.ACCESS_TOKEN_SECRET);
console.log (accessToken);