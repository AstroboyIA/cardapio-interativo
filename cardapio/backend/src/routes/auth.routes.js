import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', (req, res) => {
  // Recebe a senha do admin
  const { senha } = req.body;

  // Compara com a senha definida no .env
  if (senha !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ erro: 'Senha incorreta' });
  }

  // Gera token JWT valido por 2 horas
  const token = jwt.sign(
    { usuario: "admin", role: 'admin' },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );

  res.json({ token });
});

export default router;
