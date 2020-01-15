const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM client', (err, customers) => {
     if (err) {
      res.json(err);
     }
     res.render('customers', {
        data: customers
     });
    });
  });
};

controller.save = (req, res) => {
  const data = req.body;
  const user = {
    nom: req.body.nom,
    prenom: req.body.prenom,
    adresse: req.body.adresse,
    date_naissance: req.body.date_naissance,
    civilite: req.body.civilite,
    numero: Math.floor(Math.random() * Math.floor(1000)).toString(),
    id_ville: req.body.id_ville
  }
  console.log(user)
  // console.log(data);
  req.getConnection((err, connection) => {
    const query = connection.query("INSERT INTO client SET ?", user, (err, customer) => {
      if (err) {
        console.log(err)
      }
      res.redirect('/clients'); 
    })
  })
};


controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM client WHERE id_client = ?", [id], (err, rows) => {
      res.render('customers_edit', {
        data: rows[0]
      })
    });
  });
};

controller.update = (req, res) => {
  const { id } = req.params;
  const newCustomer = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE client SET ? WHERE id_client = ?', [newCustomer, id], (err, rows) => {
    res.redirect('/clients');
  });
  });
};

controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM client WHERE id_client = ?', [id], (err, rows) => {
      res.redirect('/clients');
    });
  });
}

module.exports = controller;
