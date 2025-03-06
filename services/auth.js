const sessionUserID = new Map();

function setUser(id,loginUser){
    sessionUserID.set(id,loginUser);
}
function getUser(id){
   return sessionUserID.get(id);
}

module.exports={
    setUser,
    getUser
}