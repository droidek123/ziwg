package pl.edu.pwr.zigw.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.edu.pwr.zigw.model.Movie;
import pl.edu.pwr.zigw.service.MovieService;

import java.util.List;

@RestController
@RequestMapping("/movie")
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;

    @GetMapping("/movie/{id}")
    @Operation(summary = "Get movie by id", description = "Adds a new reservation and returns its ID.")
    public Movie getMovie(@RequestParam Long id) {
        return movieService.getMovieById(id);
    }

    @GetMapping("/movies")
    @Operation(summary = "Get movie list", description = "Adds a new reservation and returns its ID.")
    public List<Movie> getMovieList() {
        return movieService.getMovies();
    }

    @PostMapping("/movie/new")
    @Operation(summary = "Create a new movie", description = "Adds a new reservation and returns its ID.")
    public Long addMovie(@RequestBody Movie movie) {
        return movieService.addMovie(movie);
    }
}
