const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Quizinautisagoodw$eb'; // Preferably use environment variables

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token'); // Ensure the token is being sent in the headers
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user; // Attach user data to req
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
};

module.exports = fetchuser;
