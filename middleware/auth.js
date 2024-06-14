
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  
  const token = authHeader.split(' ')[1]
  console.log(token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};