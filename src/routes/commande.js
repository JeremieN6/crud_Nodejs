const router = require('express').Router();

const commandeController = require('../controllers/commandeController');
const produitController = require('../controllers/produitController');

router.get('/commandes/:id', commandeController.list);
// router.get('/commandes', commandeController.list);
router.get('/commandes/:id/produits', produitController.list);
router.post('/add', commandeController.save);
router.get('/update/:id', commandeController.edit);
router.post('/update/:id', commandeController.update);
router.get('/delete/:id', commandeController.delete);

module.exports = router;