package pl.edu.pwr.zigw.repostiory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.edu.pwr.zigw.model.Movie;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
//    List<Movie> findByGenre(String genre);
//    @Query("SELECT DISTINCT m.genre FROM Movie m")
//    List<String> findDistinctGenres();
}
