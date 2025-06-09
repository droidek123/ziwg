package pl.edu.pwr.zigw.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.pwr.zigw.dto.MovieDto;
import pl.edu.pwr.zigw.model.Movie;
import pl.edu.pwr.zigw.repostiory.MovieRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieRepository movieRepository;

    public final List<Movie> getMovies() {
        return movieRepository.findAll();
    }

    public Long addMovie(Movie movie) {return movieRepository.save(movie).getId();}

//    public List<MovieDto> getMoviesByGenre(String genre) {
//        if (genre == null || genre.isEmpty()) {
//            return movieRepository.findAll().stream().map(MovieDto::new).toList();
//        }
//        return movieRepository.findByGenre(genre).stream().map(MovieDto::new).toList();
//    }

    public MovieDto getMovieById(Long id) {
        return new MovieDto(movieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Movie not found")));
    }

//    public List<String> getAllGenres() {
//        return movieRepository.findDistinctGenres();
//    }

    public Movie findById(Long id) {
        return movieRepository.findById(id).orElse(null);
    }

    public void save(Movie movie) {
        movieRepository.save(movie);
    }
}
