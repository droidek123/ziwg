package pl.edu.pwr.zigw.repostiory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.edu.pwr.zigw.model.Reservation;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {


}
