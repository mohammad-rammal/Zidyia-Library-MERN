const jwt = require("jsonwebtoken");

// Verify Token
function verifyToken(req, res, next) {
    const authToken = req.headers.authorization;
    if (authToken) {
        const token = authToken.split(" ")[1];
        try {
            const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decodedPayload;
            next();
        } catch (error) {
            return res.status(401).json({ message: "Invalid token, access denied" })
        }
    } else {
        return res.status(401).json({ message: "No token provided, access denied" });
    }
}

//Verify Token and Admin
function verifyTokenAndAdmin(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.role === 'admin') {
            next();
        } else {
            return res.status(403).json({ message: "Not allowed, only admin" });
        }
    });
}

//Verify Token and Only User Himself
function verifyTokenAndOnlyUser(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id) {
            next();
        } else {
            return res.status(403).json({ message: "Not allowed, only user himself" });
        }
    });
}

//Verify Token and Admin or Only User Himself (Verify Token & Authorization)
function verifyTokenAndAuthorization(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.role === 'admin') {
            next();
        } else {
            return res.status(403).json({ message: "Not allowed, only user himself or admin!!" });
        }
    });
}

//Verify Token and SuperAdmin
function verifyTokenAndSuperAdmin(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.role === 'superadmin') {
            next();
        } else {
            return res.status(403).json({ message: "Not allowed, only super admin" });
        }
    });
}

module.exports = {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndOnlyUser,
    verifyTokenAndAuthorization,
    verifyTokenAndSuperAdmin
}
