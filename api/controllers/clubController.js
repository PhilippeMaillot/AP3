require("dotenv").config(); // Add this line to load environment variables from .env file
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const model = require("../models/clubModel");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const { generateToken } = require("../middleware/jwtUtils");

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
      model.login(db, req.body.club_mail, async (err, results) => {
        if (err) {
          res.status(500).json({ err: "Erreur serveur" });
        } else {
          if (results.length === 0) {
            res.status(404).json({ message: "Utilisateur non trouvé" });
          } else {
            const user = results[0];
            const passwordMatch = await bcrypt.compare(
              req.body.password,
              user.password_hash
            );
            if (passwordMatch) {
              const token = generateToken(user);
              res.status(200);
              res.json({ message: "User logged in", token });
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

  static getUserInfo(userId, res) {
    model.getUserInfo(db, userId, (err, results) => {
      if (err) {
        console.log(
          "Erreur lors de la récupération des informations de l'utilisateur :",
          err
        );
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(200).json(results);
      }
    });
  }

  static getUserAndClubInfo(userId, res) {
    model.getUserAndClubInfo(db, userId, (err, results) => {
      if (err) {
        console.log(
          "Erreur lors de la récupération des informations de l'utilisateur :",
          err
        );
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(200).json(results);
      }
    });
  }
}

module.exports = ClubController;
