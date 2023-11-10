const util = require('util');

class UsedFieldsModel {
    static getFields(db, id_tournament, cb) {
        // Exemple avec MySQL
        const query = util.promisify(db.query).bind(db);
        query(`SELECT start_schedule FROM tournament WHERE id_tournament = ${id_tournament}`)
            .then((results) => {
                // Renvoyer les résultats au rappel (callback)
                cb(null, results);
            })
            .catch((error) => {
                console.error("Erreur lors de l'exécution de la requête SQL :", error);
                cb(error, null);
            });
    }
}

module.exports = UsedFieldsModel;
