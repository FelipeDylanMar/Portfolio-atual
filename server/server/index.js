const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config(); 

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); 

// Conexão com o MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch(err => console.error("Erro ao conectar ao MongoDB:", err));

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Rota de exemplo
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Rota de SignUp (Cadastro de Usuário)
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
  }
});

// Rota de Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login bem-sucedido!', token });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acesso não autorizado. Token não fornecido.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido.' });
    }
    req.user = decoded; 
    next(); 
  });
};

app.get('/home', authMiddleware, (req, res) => {
  res.json({ message: 'Bem-vindo à página inicial!' });
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
