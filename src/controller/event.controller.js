const {pool} = require("../database");

async function getEvent (request, response) {
    try {
        let sql;
        let respuesta;

        sql = `SELECT * FROM event`;

        let [result] = await pool.query(sql);
        respuesta = ({ error: false, code: 200, message: "Eventos obtenidos", dataEvent: result });
        
        response.send(respuesta);

    } catch (error) {
        console.log(error);
    };
};

async function addEvent (request, response) {
    try {
        let sql;
        let params;
        let respuesta;

        sql = `INSERT INTO event (img, title, description, date, time)
                VALUES (?,?,?,?,?)`;
        params = [
            request.body.img,
            request.body.title,
            request.body.description,
            request.body.date,
            request.body.time,
        ];

        let [result] = await pool.query(sql, params);
        respuesta = {error: false, code: 200, message: "Evento añadido correctamente", dataEvent: result};

        response.send(respuesta);

    } catch (error) {
        console.log(error);
    };   
};

async function putEvent(request, response) {
    try {
        let sql;
        let params;
        let respuesta;

        sql = `UPDATE event SET 
                img = COALESCE(?, img), 
                title = COALESCE(?, title), 
                description = COALESCE(?, description), 
                date = COALESCE(?, date), 
                time = COALESCE(?, time) 
                WHERE id_event = ?`;
        params = [
            request.body.img,
            request.body.title,
            request.body.description,
            request.body.date,
            request.body.time,
            request.body.id_event
        ];

        let [result] = await pool.query(sql, params);

        if (result.affectedRows > 0) {
            respuesta = {error: false, code: 200, message: "Evento actualizado correctamente", dataEvent: result,};
        } else {
            respuesta = {error: true, code: 200, message: "No se encontró el evento para actualizar"};
        }

        response.send(respuesta);

    } catch (error) {
        console.log(error);
    }
}

async function deleteEvent(request, response) {
    try {
        let sql;
        let params;
        let respuesta;

        sql = `DELETE FROM event WHERE id_event = ?`;
        params = [request.body.id_event];

        let [result] = await pool.query(sql, params);

        if (result.affectedRows > 0) {
            respuesta = {error: false, code: 200, message: "Evento eliminado correctamente"};
        } else {
            respuesta = {error: true, code: 200, message: "No se encontró el evento para eliminar"};
        }

        response.send(respuesta);

    } catch (error) {
        console.log(error);
    }
}


module.exports = {getEvent, addEvent, putEvent, deleteEvent};