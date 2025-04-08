package pl.edu.pwr.zigw.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.edu.pwr.zigw.model.Reservation;
import pl.edu.pwr.zigw.service.ReservationService;

import java.util.List;

@RestController
@RequestMapping("/reservation")
@RequiredArgsConstructor
@Tag(name = "Reservation Controller", description = "Handles reservation-related operations such as creating, retrieving, updating, and deleting reservations.")
public class ReservationController {

    private final ReservationService reservationService;

    @GetMapping("/reservations")
    @Operation(summary = "Get all reservations", description = "Returns a list or summary of all reservations.")
    public List<Reservation> getReservations() {
        return this.reservationService.getReservations();
    }

    @GetMapping
    @Operation(summary = "Get reservation by ID", description = "Retrieves a single reservation based on the provided ID.")
    public Reservation getReservation(@RequestParam Long id) {
        return this.reservationService.getReservationById(id);
    }

    @PostMapping("reservations/new")
    @Operation(summary = "Create a new reservation", description = "Adds a new reservation and returns its ID.")
    public Long addReservation(@RequestBody Reservation reservation) {
        return reservationService.addReservation(reservation);
    }

    @PutMapping
    @Operation(summary = "Update an existing reservation", description = "Updates the reservation with the given ID and returns the updated reservation.")
    public Reservation updateReservation(@RequestBody Reservation reservation) {
        return this.reservationService.updateReservation(reservation);
    }

    @DeleteMapping
    @Operation(summary = "Delete a reservation", description = "Deletes the reservation with the specified ID and returns whether the operation was successful.")
    public Boolean deleteReservation(@RequestParam Long id) {
        return reservationService.deleteReservation(id);
    }
}
