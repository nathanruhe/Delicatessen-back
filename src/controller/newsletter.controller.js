const {pool} = require("../database");

async function addNewsLetter (request, response) {
    try {
        let sql;
        let params;
        let respuesta;

        sql = `SELECT * FROM newsletter WHERE email = ?`;
        params = [request.body.email];

        let [existe] = await pool.query(sql, params);

        if (existe.length > 0) {
            respuesta = {error: true, code: 200, message: "El email introducido ya existe"};
        } else {
            sql = `INSERT INTO newsletter (email)
                    VALUES (?)`;
            params = [request.body.email];

            let [result] = await pool.query(sql, params);
            respuesta = {error: false, code: 200, message: "Subscrito correctamente", data: result};
        };

        response.send(respuesta);

    } catch (error) {
        console.log(error);
    };   
};

module.exports = {addNewsLetter};