package pl.edu.pwr.zigw.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import models.Reservation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.pwr.zigw.service.ReservationService;

@RestController
@AllArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    @GetMapping("/reservations")
    @Operation(summary = "Przykładowy endpoint", description = "Zwraca powitanie")
    public Reservation getReservation() {
        return this.reservationService.getReservations();
    }
}
