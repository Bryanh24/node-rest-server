const { JsonWebTokenError } = require("jsonwebtoken");

const jwt = require("jsonwebtoken");
const { json } = require("body-parser");

//========
//VERIFICAR TOKEN
//========

let verificaToken = (req, res, next) => {
    let token = req.get("token");

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: 'token no valido'
            });
        }

        req.usuario = decoded.usuario;
        next();
    });
};

//================
//VERIFICA ADMIN_ROLE
//================

let verificaAdminRole = (req, res, next) => {

        let usuario = req.usuario

        if (usuario.role === 'ADMIN_ROLE') {
            next();
        } else {
            return res.json({
                ok: false,
                err: {
                    message: 'No tiene los permisos para realizar esta accion.'
                }
            })
        }


    }
    //=====================
    //VERIFICA PARA IMAGEN
    //=====================
let verificaTokenImg = (req, res, next) => {
    let token = req.query.token;
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: 'token no valido'
            });
        }

        req.usuario = decoded.usuario;
        next();
    });
}
module.exports = {
    verificaToken,
    verificaAdminRole,
    verificaTokenImg,
};