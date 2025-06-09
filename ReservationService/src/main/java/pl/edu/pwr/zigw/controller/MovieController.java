package pl.edu.pwr.zigw.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.edu.pwr.zigw.dto.MovieDto;
import pl.edu.pwr.zigw.model.Movie;
import pl.edu.pwr.zigw.service.MovieService;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/movie")
@RequiredArgsConstructor
@Tag(name = "Movies Controller", description = "Handles movies-related operations such as creating, retrieving, updating, and deleting reservations.")
public class MovieController {

    private final MovieService movieService;
    private final Path uploadDir = Paths.get("uploads");

    {
        try {
            Files.createDirectories(uploadDir);
        } catch (IOException e) {
            throw new RuntimeException("Nie udało się utworzyć katalogu uploads", e);
        }
    }

    @GetMapping("/movie/{id}")
    @Operation(summary = "Get movie by id", description = "Adds a new reservation and returns its ID.")
    public MovieDto getMovie(@RequestParam Long id) {
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

    @GetMapping("/movies/repertuar")
    @Operation(summary = "Get repertuar", description = "Get repertuar")
    public List<Movie> getRepertuar() {
        return movieService.getMovies();
    }

    @PostMapping("/movie/{id}/upload-poster")
    @Operation(summary = "Upload poster for movie", description = "Upload image file and assign it to movie")
    public ResponseEntity<String> uploadPoster(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            Movie movie = movieService.findById(id);
            if (movie == null) return ResponseEntity.notFound().build();

            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = uploadDir.resolve(filename);
            file.transferTo(filePath);

            movie.setPosterFilename(filename);
            movieService.save(movie);

            return ResponseEntity.ok("Poster uploaded successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error while uploading file.");
        }
    }

    @GetMapping("/movie/{id}/poster")
    @Operation(summary = "Get movie poster", description = "Returns movie poster image")
    public ResponseEntity<Resource> getPoster(@PathVariable Long id) throws MalformedURLException {
        Movie movie = movieService.findById(id);
        if (movie == null || movie.getPosterFilename() == null) {
            return ResponseEntity.notFound().build();
        }

        Path filePath = uploadDir.resolve(movie.getPosterFilename());
        Resource resource = new UrlResource(filePath.toUri());

        if (!resource.exists() || !resource.isReadable()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + movie.getPosterFilename() + "\"")
                .contentType(MediaType.IMAGE_JPEG)
                .body(resource);
    }

    @DeleteMapping("/movie/{id}/poster")
    @Operation(summary = "Delete movie poster", description = "Deletes poster image and clears reference in database")
    public ResponseEntity<String> deletePoster(@PathVariable Long id) {
        Movie movie = movieService.findById(id);
        if (movie == null || movie.getPosterFilename() == null) {
            return ResponseEntity.notFound().build();
        }

        Path filePath = uploadDir.resolve(movie.getPosterFilename());

        try {
            Files.deleteIfExists(filePath);
            movie.setPosterFilename(null);
            movieService.save(movie);
            return ResponseEntity.ok("Poster deleted.");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Could not delete poster.");
        }
    }
}
