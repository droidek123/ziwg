package pl.edu.pwr.zigw.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.pwr.zigw.dto.TicketDto;
import pl.edu.pwr.zigw.repostiory.ReservationRepository;
import pl.edu.pwr.zigw.repostiory.TicketRepository;

@Service
@RequiredArgsConstructor
public class TicketService {
    private final TicketRepository ticketRepository;
    private final ReservationRepository reservationRepository;

    public TicketDto getTicketByReservation(Long reservationId) {
        return new TicketDto(ticketRepository.findByReservationId(reservationId)
                .orElseThrow(() -> new RuntimeException("Ticket not found")));
    }
}
