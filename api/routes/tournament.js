const express = require("express");
const router = express.Router();
const tournamentController = require("../controllers/tournamentController");

router.get("/", tournamentController.getAllTouranements);

router.post("/set", tournamentController.setTournament);

router.post("/add", tournamentController.addClub);

router.post("/delete/:id_tournament", tournamentController.deleteTournament);

router.post("/deleteparticipant/", tournamentController.deleteParticipant);

router.post("/update", tournamentController.update);

router.post("/updateparticipant", tournamentController.updateParticipant);

router.get("/info/:id_tournament", tournamentController.getInfo);

router.get('/infopart/:id_tournament', tournamentController.infoParticipation);

module.exports = router;