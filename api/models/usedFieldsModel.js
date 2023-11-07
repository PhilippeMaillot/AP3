class UsedFieldsModel {
    static getFields(db, req, cb) {
        // Exemple avec MySQL
        db.query("SELECT schedule FROM tournament", (error, results) => {
            if (error) {
                console.error("Erreur lors de l'exécution de la requête SQL :", error);
                cb(error, null);
            } else {
                // Renvoyer les résultats au rappel (callback)
                cb(null, results);
            }
        });
    }
}

module.exports = UsedFieldsModel;
