package pl.edu.pwr.zigw.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.edu.pwr.zigw.model.Movie;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
}
