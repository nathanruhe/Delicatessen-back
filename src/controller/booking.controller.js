const {pool} = require("../database");

async function getBooking (request, response) {
    try {
        let sql;
        let respuesta;

        sql = `SELECT * FROM booking`;

        let [result] = await pool.query(sql);
        respuesta = ({ error: false, code: 200, message: "Reservas obtenidas", dataBooking: result });
        
        response.send(respuesta);

    } catch (error) {
        console.log(error);
    };
};

async function addBooking (request, response) {
    try {
        let sql;
        let params;
        let respuesta;

        sql = `INSERT INTO booking (tipo, name, tel, email, date, time, guests, comment, confirmed)
                VALUES (?,?,?,?,?,?,?,?,?)`;
        params = [
            request.body.tipo,
            request.body.name,
            request.body.tel,
            request.body.email,
            request.body.date,
            request.body.time,
            request.body.guests,
            request.body.comment,
            request.body.confirmed,
        ];

        let [result] = await pool.query(sql, params);
        respuesta = {error: false, code: 200, message: "Reserva añadida correctamente", dataBooking: result};

        response.send(respuesta);

    } catch (error) {
        console.log(error);
    };   
};

async function updateBookingStatus(request, response) {
    try {
        let sql;
        let params;
        let respuesta;

        sql = `UPDATE booking SET confirmed = ? WHERE id_booking = ?`;
        params = [request.body.confirmed, request.body.id_booking];

        let [result] = await pool.query(sql, params);

        if (result.affectedRows > 0) {
            respuesta = { error: false, code: 200, message: "Reserva actualizada correctamente" };
        } else {
            respuesta = { error: true, code: 404, message: "No se encontró la reserva para actualizar" };
        }

        response.send(respuesta);
    } catch (error) {
        console.log(error);
    }
}

async function deleteBooking(request, response) {
    try {
        let sql;
        let params;
        let respuesta;

        sql = `DELETE FROM booking WHERE id_booking = ?`;
        params = [request.body.id_booking];

        let [result] = await pool.query(sql, params);

        if (result.affectedRows > 0) {
            respuesta = {error: false, code: 200, message: "Reserva eliminada correctamente"};
        } else {
            respuesta = {error: true, code: 200, message: "No se encontró la reserva para eliminar"};
        }

        response.send(respuesta);

    } catch (error) {
        console.log(error);
    }
}

module.exports = {getBooking, addBooking, updateBookingStatus, deleteBooking};