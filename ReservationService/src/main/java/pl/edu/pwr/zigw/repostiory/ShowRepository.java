package pl.edu.pwr.zigw.repostiory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.edu.pwr.zigw.model.Show;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface ShowRepository extends JpaRepository<Show, Long> {

    List<Show> findAllByDate(Date date);
    Optional<Show> findFirstByMovieId(Long movieId);
}
