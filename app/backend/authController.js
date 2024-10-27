exports.register = async (req, res) => {
    const { username, email, password, role } = req.body;
  
    db.serialize(() => {
      // Verificar si el usuario ya existe
      db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
        if (err) {
          return res.status(500).json({ message: 'Error al verificar el usuario', error: err });
        }
  
        if (row) {
          return res.status(400).json({ message: 'El usuario ya existe' });
        }
  
        // Insertar el nuevo usuario
        db.run("INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)", [username, email, password, role], function(err) {
          if (err) {
            return res.status(500).json({ message: 'Error al crear el usuario', error: err });
          }
          res.status(201).json({ id: this.lastID, username, email, role });
        });
      });
    });
  };
  