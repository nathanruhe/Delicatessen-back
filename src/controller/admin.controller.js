const {pool} = require("../database");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

async function getAdmin (request, response) {
    try {
        let sql;
        let params;
        let respuesta;

        sql = `SELECT * FROM admin WHERE user = ?`;
        params = [request.body.user];

        let [result] = await pool.query(sql, params);

        if (result.length === 0) {
            respuesta = {error: true, codigo: 200, mensaje: "Los datos introducidos no son válidos"};
        } else {
            const admin = result[0];
            const passwordMatch = await bcrypt.compare(request.body.password, admin.password);

            if (!passwordMatch) {
                respuesta = {error: true, codigo: 200, mensaje: "Contraseña incorrecta"};
            } else {
                const token = jwt.sign({ id: admin.id_admin, user: admin.user }, JWT_SECRET, { expiresIn: '1h' });
                respuesta = { error: false, codigo: 200, mensaje: "Sesión iniciada", token: token };
            };
        };

        response.send(respuesta);

    } catch(error) {
        console.log(error);
    };
};

module.exports = {getAdmin};