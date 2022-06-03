const express = require('express');
const router = express.Router();

const userRoutes = require('./usuarios');
const bitacoraRoutes = require('./bitacora');
router.use('/users', userRoutes);
router.use('/bitacoras', bitacoraRoutes);


module.exports = router;