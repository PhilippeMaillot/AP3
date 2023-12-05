require("dotenv").config(); // Add this line to load environment variables from .env file
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const model = require("../models/clubModel");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

class ClubController {
  static addClub(req, res) {
    try {
      model.createClubs(db, req, (err, results) => {
        if (err) {
          res.status(500).json({ err: "Erreur serveur" });
        } else {
          res.status(200).json({ message: "Le club a bien été ajouté !" });
          const mail_key = process.env.MAIL_KEY;
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "maillotphilippe78@gmail.com",
              pass: mail_key,
            },
          });

          const mailOptions = {
            from: "maillotphilippe78@gmail.com",
            to: "maillotphilippe78@gmail.com",
            subject: "Confirmation d'ajout de club",
            text: `Le club ${req.body.club_name} a bien été ajouté !`,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
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
      console.log("ID de l'utilisateur reçu :", req.body.id_user);
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

  static async login(req, res) {
    try {
      console.log("Email de l'utilisateur reçu :", req.body);
      model.login(db, req.body.club_mail, async (err, results) => {
        if (err) {
          res.status(500).json({ err: "Erreur serveur" });
        } else {
          if (results.length === 0) {
            res.status(404).json({ message: "Utilisateur non trouvé" });
          } else {
            const user = results[0];
            console.log("Utilisateur trouvé :", user);
            const passwordMatch = await bcrypt.compare(
              req.body.password,
              user.password_hash
            );
            if (passwordMatch) {
              res.status(200);
              let token = jwt.sign({ id_user: user.id_user }, process.env.MY_SECRET_KEY, { expiresIn: "1h" });
              res.cookie("token", token, { expires: new Date(Date.now() + 900000), httpOnly: true, secure: true });
              res.json({
                token,
                user: {
                  id_user: user.id_user,
                  id_club: user.id_club,
                  club_name: user.club_name,
                  club_mail: user.club_mail,
                },
              })
              console.log("Token généré :", token);
              const mail_key = process.env.MAIL_KEY;
              const mail_to = req.body.club_mail;
              const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  user: "maillotphilippe78@gmail.com",
                  pass: mail_key,
                },
              });

              const mailOptions = {
                from: "maillotphilippe78@gmail.com",
                to: mail_to,
                subject: "Confirmation de connexion",
                text: `Votre compte Omnimatch est connecté !`,
              };

              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                  console.log("Erreur lors de l'envoi du mail");
                } else {
                  console.log("Email sent: " + info.response);
                }
              });
            } else {
              res.status(401).json({ message: "Mot de passe incorrect" });
            }
          }
        }
      });
    } catch (err) {
      res.status(500).json({ err: "Erreur serveur" });
    }
  }
}

module.exports = ClubController;
