// authorization
import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");    // from the frontend, grabbing the authorization header (token will be set at this in the frontend)

        if (!token) {
            return res.status(403).send("Access Denied");
        }

        if (token.startsWith("Bearer ")) {  // should start with 'Bearer ', set in frontend.
            // take everything from the right-side of this "Bearer "
            token = token.slice(7, tokens.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();     // used for middleware, so next one is perceived to next step of fn
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}