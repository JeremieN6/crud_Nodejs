const cmdcontroller = {};

// cmdcontroller.list = (req, res) => {
//     const { id } = req.params; 
//     req.getConnection((err, conn) => {
//     conn.query("SELECT commande_produit.*, produit.* FROM commande_produit JOIN produit USING(id_produit) WHERE id_commande = ?", [id], (error, rows) =>{
//         if (err) {
//             res.json(err);
//            }
//            res.render('produit_commande', {
//               data: rows
//            });
//           });
//         });
//       };


cmdcontroller.list = (req, res) => {
    const { id } = req.params; 
    req.getConnection((err, conn) => {
      conn.query("SELECT * FROM commande WHERE id_client = ?",[id], (err, commandes) => {
       if (err) {
        res.json(err);
       }
       res.render('commandes', {
          data: commandes
       });
      });
    });
  };

cmdcontroller.save = (req, res) => {
    const data = req.body;
    console.log(req.body);
    req.getConnection((err, connection) => {
      const query = connection.query("INSERT INTO commande SET ?", data, (err, commande) => {
        console.log(commande);
        res.redirect('/commandes');
      })
    })
  };

  
  cmdcontroller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
      conn.query("SELECT * FROM commande WHERE id_commande = ?", [id], (err, rows) => {
        res.render('commande_edit', {
          data: rows[0]
        })
      });
    });
  };
  
  cmdcontroller.update = (req, res) => {
    const { id } = req.params;
    const newCommande = req.body;
    req.getConnection((err, conn) => {
  
    conn.query('UPDATE commande SET ? WHERE id_commande = ?', [newCommande, id], (err, rows) => {
      res.redirect('/commandes');
    });
    });
  };
  
  cmdcontroller.delete = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, connection) => {
      connection.query('DELETE FROM commande WHERE id_commande = ?', [id], (err, rows) => {
        res.redirect('/commandes');
      });
    });
  }

module.exports = cmdcontroller;
