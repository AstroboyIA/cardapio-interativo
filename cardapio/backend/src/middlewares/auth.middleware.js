import jwt from 'jsonwebtoken';

export function autenticarToken(req, res, next) {
  // Lê o header Authorization: Bearer <token>
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  // Divide o header para pegar apenas o token
  const token = authHeader.split(' ')[1];

  // Valida o token com a chave do .env
  jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
    if (err) {
      return res.status(403).json({ erro: 'Token inválido' });
    }

    // Salva o usuario no request para proximos handlers
    req.usuario = usuario;
    next();
  });
}

export function apenasAdmin(req, res, next) {
  // Garante que o usuario seja admin
  if (!req.usuario || req.usuario.role !== 'admin') {
    return res.status(403).json({ erro: 'Acesso restrito ao administrador' });
  }

  next();
}
