package pl.edu.pwr.zigw.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.pwr.zigw.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
