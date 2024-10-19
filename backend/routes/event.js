const express = require("express");
const { isAdmin, isAuthenticated } = require("../middlewares/auth");
const { getAllEvents, getEvents, getAdminEvents, createNewEvent, deleteEvent } = require("../controllers/eventController");

const eventRouter = express.Router();


//create a new event

eventRouter.post("/create-new-event", createNewEvent);


//get all Events

eventRouter.get("/get-all-events", getAllEvents);

//get event of the shop

eventRouter.get("/get-all-events/:id", getEvents);

//delete a event of an shop

eventRouter.delete("/delete-event/:id", deleteEvent);

//events managed by admin

eventRouter.get("/admin-all-events", isAuthenticated, isAdmin("Admin"), getAdminEvents)

module.exports = eventRouter;