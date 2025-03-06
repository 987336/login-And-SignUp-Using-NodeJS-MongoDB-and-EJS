const { getUser } = require("../services/auth");

async function restrictForNotLoggedIn(req,res,next) {
    const userUUID = req.cookies?.uid;
    if(!userUUID) return res.status(401).redirect("/login");
    const user = await getUser(userUUID);
    if(!user) return res.status(401).redirect("/login");
    req.user = user;
    next();

}

module.exports={
    restrictForNotLoggedIn
}