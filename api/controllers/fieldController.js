const db = require("../config/db");
const model = require("../models/fieldModel");

class FieldController {
  static addField(req, res) {
    try {
    model.setFields(db, req, (err, results) => {
        if (err) {
          res.status(500).json({ err: "Erreur serveur" });
        } else {
          res.status(200).json({ message: "Le terrain a bien été ajouté !" });
        }
      });
    } catch (err) {
      res.status(500).json({ err: "Erreur serveur" });
    }
  }
}

module.exports = FieldController;
