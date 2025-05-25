package pl.edu.pwr.zigw.repostiory;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.pwr.zigw.model.Ticket;

import java.util.Optional;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    Optional<Ticket> findByReservationId(Long reservationId);
}
