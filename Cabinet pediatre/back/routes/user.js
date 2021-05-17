import express from "express";
const router = express.Router();

import {fetchUser, signin, signup, updateUser} from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.patch("/:id",updateUser);
router.get("/",fetchUser);


export default router;