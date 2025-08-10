// client/src/services/ReservationService.js
import api from './Api';

export default {
  createReservation(reservationData) {
    return api().post('/reservations', reservationData, {
      withCredentials: true,
    });
  },

  getAllReservations() {
    return api().get('/reservations', {
      withCredentials: true,
    });
  },

  getReservationById(id) {
    return api().get(`/reservations/${id}`, {
      withCredentials: true,
    });
  },
};
