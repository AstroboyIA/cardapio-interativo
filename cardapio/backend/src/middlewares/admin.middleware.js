export const apenasAdmin = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }

    return res.status(401).json({ message: 'Acesso não autorizado. Faça login.' });
};
