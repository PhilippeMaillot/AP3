class FieldModel {
  static setFields(db, req, cb) {
    const { field_name, field_adress, field_city, sport_type } = req.body;

    const query = "INSERT INTO sportfields ( field_name, field_adress, field_city, sport_type) VALUES ( ?, ?, ?, ?)";
    db.query(query, [field_name, field_adress, field_city, sport_type],cb);
  }
}

module.exports = FieldModel;
