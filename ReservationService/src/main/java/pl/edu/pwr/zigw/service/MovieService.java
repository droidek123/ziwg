package pl.edu.pwr.zigw.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.pwr.zigw.model.Movie;
import pl.edu.pwr.zigw.repostiory.MovieRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieRepository movieRepository;

    public final Movie getMovieById(Long id) {
        return movieRepository.findById(id).orElse(null);
    }

    public final List<Movie> getMovies() {
        return movieRepository.findAll();
    }

    public Long addMovie(Movie movie) {return movieRepository.save(movie).getId();}
}
