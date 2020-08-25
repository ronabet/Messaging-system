const userManager = require('../managers/userManager');
var exports = module.exports;

exports.getAllUsers = async (req, res) => {
    return res.json(await userManager.getAllUsers())
}

exports.createUser = async(req, res) => {
    return res.json(await userManager.createUser(req.body));
}

exports.getUserById = async(req, res) => {
    try{
        res.json(await userManager.getUserById(req.params.id));
    }
    catch(err){
        res.json({ error: "Can`t find this ID :(" })
        return false;
    }
}

