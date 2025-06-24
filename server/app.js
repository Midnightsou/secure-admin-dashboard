const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');

dotenv.config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

const authroutes = require('./routes/auth');
app.use('/api/auth', authroutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('Mongo error:', err));

    app.get('/', (req, res) => res.send('secure admin dashboard API'));

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log('Server running on port', PORT));