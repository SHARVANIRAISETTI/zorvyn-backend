const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { handleError } = require('./src/utils/error.utils');

const authRoutes = require('./src/routes/auth.routes');
const recordRoutes = require('./src/routes/record.routes');
const aggregationRoutes = require('./src/routes/aggregation.routes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/records', recordRoutes);
app.use('/api/aggregations', aggregationRoutes);

app.use((req, res) => res.status(404).json({ message: 'Route not found' }));
app.use(handleError);

module.exports = app;
