import express from "express";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";
import { getAllEvents, getEvents, getAdminEvents, createNewEvent, deleteEvent } from "../controllers/eventController.js";

export const eventRouter = express.Router();


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