const {pool} = require("../database");

async function getReview (request, response) {
    try {
        let sql;
        let respuesta;

        sql = `SELECT * FROM review`;

        let [result] = await pool.query(sql);
        respuesta = ({ error: false, codigo: 200, mensaje: "Reseñas obtenidas", dataReview: result });
        
        response.send(respuesta);

    } catch (error) {
        console.log(error);
    };
};

async function addReview (request, response) {
    try {
        let sql;
        let params;
        let respuesta;

        sql = `INSERT INTO review (stars, name, message)
                VALUES (?,?,?)`;
        params = [
            request.body.stars,
            request.body.name,
            request.body.message,
        ];

        let [result] = await pool.query(sql, params);
        respuesta = {error: false, code: 200, message: "Valoración añadida correctamente", dataReview: result};

        response.send(respuesta);

    } catch (error) {
        console.log(error);
    };   
};

module.exports = {getReview, addReview};