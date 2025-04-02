package pl.edu.pwr.zigw.service;

import lombok.AllArgsConstructor;
import models.Reservation;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ReservationService {

    public Reservation getReservations() {
        Reservation reservation = Reservation.builder()
                .id(1L)
                .status("Test")
                .build();
        return reservation;
    }
}
