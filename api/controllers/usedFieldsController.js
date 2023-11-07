const db = require("../config/db");
const model = require("../models/usedFieldsModel");

class UsedFieldsController {
    static getUFields(req, res) {
        try {
            model.getFields(db, req, (err, results) => {
                if (err) {
                  res.status(500).json({ err: "Erreur serveur" });
                } else {
                  res.status(200).json({ message: "voici la liste des terrain utilisés !" });
                }
              });
            } catch (err) {
              res.status(500).json({ err: "Erreur serveur" });
            }
    }

}

module.exports = UsedFieldsController;