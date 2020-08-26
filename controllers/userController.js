const userManager = require('../managers/userManager');

module.exports.getAllUsers = async (req, res) => {
    return res.json(await userManager.getAllUsers())
}

module.exports.createUser = async(req, res) => {
    return res.json(await userManager.createUser(req.body));
}

module.exports.getUserById = async(req, res) => {
    try{
        return res.json(await userManager.getUserById(req.params.id));
    }
    catch(err){
        res.json({ error: "Can`t find this ID :(" })
        return false;
    }
}

