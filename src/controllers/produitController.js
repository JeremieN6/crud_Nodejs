const prdcontroller = {};

prdcontroller.list = (req, res) => {
    const { id } = req.params; 
    req.getConnection((err, conn) => {
    conn.query("SELECT commande_produit.*, produit.* FROM commande_produit JOIN produit USING(id_produit) WHERE id_commande = ?", [id], (error, rows) =>{
        if (err) {
            res.json(err);
           }
           res.render('produit_commande', {
              data: rows
           });
          });
        });
      };

module.exports = prdcontroller;
