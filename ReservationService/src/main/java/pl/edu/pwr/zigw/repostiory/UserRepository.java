package pl.edu.pwr.zigw.repostiory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.edu.pwr.zigw.model.CinemaRoom;
import pl.edu.pwr.zigw.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
