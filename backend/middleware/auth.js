const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_TTL = '7d';

// Fail loudly at boot rather than signing every token with a guessable value.
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not set. Add it to backend/.env before starting the server.');
}

function issueToken(user) {
  return jwt.sign(
    { sub: String(user._id), email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: TOKEN_TTL }
  );
}

function readToken(req) {
  const header = req.headers.authorization || '';
  return header.startsWith('Bearer ') ? header.slice(7).trim() : null;
}

// Rejects the request unless it carries a valid token for an existing user.
async function authRequired(req, res, next) {
  const token = readToken(req);
  if (!token) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    // Read the role from the database, not the token, so a demotion takes
    // effect immediately instead of when the token happens to expire.
    const user = await User.findById(payload.sub).select('-password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Account no longer exists' });
    }
    req.user = user;
    next();
  } catch (error) {
    const expired = error.name === 'TokenExpiredError';
    return res.status(401).json({
      success: false,
      message: expired ? 'Session expired, please sign in again' : 'Invalid authentication token'
    });
  }
}

function adminOnly(req, res, next) {
  if (!req.user || req.user.role !== 'Admin') {
    return res.status(403).json({ success: false, message: 'Administrator access required' });
  }
  next();
}

// Allows a user to act on their own record; administrators may act on any.
function selfOrAdmin(getTargetId) {
  return (req, res, next) => {
    const targetId = getTargetId(req);
    if (req.user.role === 'Admin' || String(req.user._id) === String(targetId)) {
      return next();
    }
    return res.status(403).json({ success: false, message: 'You may only modify your own account' });
  };
}

module.exports = { issueToken, authRequired, adminOnly, selfOrAdmin, TOKEN_TTL };
