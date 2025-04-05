package pl.edu.pwr.zigw.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import models.Reservation;
import org.springframework.web.bind.annotation.*;
import pl.edu.pwr.zigw.service.ReservationService;

@RestController
@RequestMapping("/reservation")
@RequiredArgsConstructor
@Tag(name = "Reservation Controller", description = "Handles reservation-related operations such as creating, retrieving, updating, and deleting reservations.")
public class ReservationController {

    private final ReservationService reservationService;

    @GetMapping("/reservations")
    @Operation(summary = "Get all reservations", description = "Returns a list or summary of all reservations.")
    public Reservation getReservations() {
        return this.reservationService.getReservations();
    }

    @GetMapping
    @Operation(summary = "Get reservation by ID", description = "Retrieves a single reservation based on the provided ID.")
    public Reservation getReservation(@RequestParam Long id) {
        return this.reservationService.getReservations();
    }

    @PostMapping
    @Operation(summary = "Create a new reservation", description = "Adds a new reservation and returns its ID.")
    public Long addReservation() {
        return 1L; // placeholder - should call reservationService.addReservation(...)
    }

    @PutMapping
    @Operation(summary = "Update an existing reservation", description = "Updates the reservation with the given ID and returns the updated reservation.")
    public Reservation updateReservation(@RequestParam Long id) {
        return this.reservationService.getReservations();
    }

    @DeleteMapping
    @Operation(summary = "Delete a reservation", description = "Deletes the reservation with the specified ID and returns whether the operation was successful.")
    public Boolean deleteReservation(@RequestParam Long id) {
        return true;
    }
}
