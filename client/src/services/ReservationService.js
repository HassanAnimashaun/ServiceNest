// client/src/services/ReservationService.js
import api from './Api';

export default {
  createReservation(reservationData) {
    return api().post('/reservations', reservationData, {
      withCredentials: true,
    });
  },
};
