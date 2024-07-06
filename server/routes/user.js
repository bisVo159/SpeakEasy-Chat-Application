import express from "express"
import {acceptFriendRequest, getMyFriends, getMyNotifications, getMyProfile, logOut, login, newUser, searchUser, sendFriendRequest} from "../controllers/user.js"
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { acceptRequestValidator, loginValidator, registerValidator, sendRequestValidator, validateHandler } from "../lib/validtors.js";

const app=express.Router();

app.post("/new",singleAvatar,registerValidator(),validateHandler,newUser)
app.post("/login",loginValidator(),validateHandler,login)

// after here user must be logged in to access the routes
app.use(isAuthenticated)
app.get("/me",getMyProfile)
app.get("/logout",logOut)
app.get("/search",searchUser)
app.put("/sendrequest",
    sendRequestValidator(),
    validateHandler,
    sendFriendRequest)

app.put("/acceptrequest",
    acceptRequestValidator(),
    validateHandler,
    acceptFriendRequest)

app.get("/notifications",getMyNotifications)
app.get("/friends",getMyFriends)

export default app