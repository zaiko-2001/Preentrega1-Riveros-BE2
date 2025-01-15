import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { comparePassword } from '../utils/password.js';

// Login de usuario
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !comparePassword(password, user.password)) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ sub: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res
      .cookie('token', token, { httpOnly: true })
      .status(200)
      .json({ message: 'Login exitoso', user: { email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener el usuario actual
export const current = (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: 'No autenticado' });
  }
  res.json({ user });
};
