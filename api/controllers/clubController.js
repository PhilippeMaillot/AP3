const db = require("../config/db");
const model = require("../models/clubModel");
const nodemailer = require("nodemailer");

class ClubController {
    static addClub(req, res) {
        try {
        model.createClubs(db, req, (err, results) => {
            if (err) {
              res.status(500).json({ err: "Erreur serveur" });
            } else {
              res.status(200).json({ message: "Le club a bien été ajouté !" });
              const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'maillotphilippe78@gmail.com',
                  pass: 'sziz crev rbar fmwu'
                }
              });
              
              const mailOptions = {
                from: 'maillotphilippe78@gmail.com',
                to: 'maillotphilippe78@gmail.com',
                subject: 'Confirmation d\'ajout de club',
                text: `Le club ${req.body.club_name} a bien été ajouté !`
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
            }
          });
        } catch (err) {
          res.status(500).json({ err: "Erreur serveur" });
        }
    }

    static getUserId(req, res) {
      try {
          console.log('ID de l\'utilisateur reçu :', req.body.id_user);
          model.getUserId(db, req.body.id_user, (err, results) => {
              if (err) {
                  res.status(500).json({ err: "Erreur serveur" });
              } else {
                  res.status(200).json(results);
              }
          });
      } catch (err) {
          res.status(500).json({ err: "Erreur serveur" });
      }
  }

  static login(req, res) {
    try {
        console.log('Email de l\'utilisateur reçu :', req.body.club_mail);
        model.login(db, req.body.club_mail, (err, results) => {
            if (err) {
                res.status(500).json({ err: "Erreur serveur" });
            } else {
                res.status(200).json(results);
            }
        });
    } catch (err) {
        res.status(500).json({ err: "Erreur serveur" });
    }
}
}

module.exports = ClubController;