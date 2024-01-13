class FieldModel {
  static setFields(db, req, cb) {
    const {field_adress, field_town, sport_type } = req.body;

    const query = "INSERT INTO sportfields (field_adress, sport_type, field_town) VALUES (?, ?, (SELECT town_name FROM town WHERE town_name = ?))";;
    db.query(query, [field_adress, sport_type, field_town],cb);
  }
}

module.exports = FieldModel;
