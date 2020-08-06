/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const auth = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new Error();
        }
        next();
    } catch {
        res.status(403).send({
            error: 'Not authorized to access this resource',
        });
    }
};

module.exports = auth;
