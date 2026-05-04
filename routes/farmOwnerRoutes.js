const express = require("express");
const { registerFarmOwner, getAllFarmOwners, deleteFarmOwner } = require("../controllers/farmOwnerController");

const Ownerroute = express.Router();

Ownerroute.post("/register", registerFarmOwner);
Ownerroute.get("/all", getAllFarmOwners);
Ownerroute.delete("/:id", deleteFarmOwner);

module.exports = Ownerroute;
