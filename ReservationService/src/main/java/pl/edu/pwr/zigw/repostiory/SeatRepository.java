package pl.edu.pwr.zigw.repostiory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.edu.pwr.zigw.model.Seat;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Long> {
}
