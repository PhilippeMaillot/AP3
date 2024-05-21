const express = require("express");
const router = express.Router();
const betController = require("../controllers/betController");

router.get("/", betController.getAllBets);

router.post("/add", betController.add);

router.post("/delete", betController.delete);

router.post("/update", betController.update);

router.get("/info/:id_bet", betController.getInfo);

router.get("/user/:id_user", betController.getByUser);

module.exports = router;