import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', (req, res) => {
  const { senha } = req.body;

  if (senha !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ erro: 'Senha incorreta' });
  }

  const token = jwt.sign(
    { usuario: "admin" },
    { role: 'admin' },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );

  res.json({ token });
});

export default router;