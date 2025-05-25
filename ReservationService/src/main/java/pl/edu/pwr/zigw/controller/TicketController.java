package pl.edu.pwr.zigw.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.edu.pwr.zigw.dto.TicketDto;
import pl.edu.pwr.zigw.service.TicketService;

@RestController
@RequestMapping("/tickets")
@RequiredArgsConstructor
@Tag(name = "Ticket Controller", description = "TODO")
public class TicketController {

    private final TicketService ticketService;

    @GetMapping("/{reservationId}")
    public TicketDto getTicket(@PathVariable Long reservationId) {
        return ticketService.getTicketByReservation(reservationId);
    }

    @PostMapping("/show")
    public TicketDto showTicket(@RequestParam Long userId, @RequestParam Long reservationId) {
        return ticketService.getTicketByReservation(reservationId);
    }
}
