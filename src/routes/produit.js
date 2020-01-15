const router = require('express').Router();

const produitController = require('../controllers/produitController');

router.get('/commandes/:id/produits', produitController.list);

module.exports = router;