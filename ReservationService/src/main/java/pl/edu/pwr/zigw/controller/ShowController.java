package pl.edu.pwr.zigw.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import pl.edu.pwr.zigw.domain.Repertuar;
import pl.edu.pwr.zigw.model.Show;
import pl.edu.pwr.zigw.service.ShowService;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/show")
@RequiredArgsConstructor
@Tag(name = "Show Controller", description = "Handles Show-related operations such as creating, retrieving, updating, and deleting shows.")
public class ShowController {

    private final ShowService showService;

    @GetMapping("/show/{id}")
    @Operation(summary = "Get show by id", description = "Adds a new show and returns its ID.")
    public Show getMovie(@RequestParam Long id) {
        return showService.getShowById(id);
    }

    @GetMapping("/shows")
    @Operation(summary = "Get list of shows", description = "Adds a new show and returns its ID.")
    public List<Repertuar> getMovieList(@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date showDate,
                                        @RequestParam(required = false) String genere) {
        return showService.getShows(showDate, genere);
    }

    @PostMapping("/show/new")
    @Operation(summary = "Create a new show", description = "Adds a new show and returns its ID.")
    public Long addMovie(@RequestBody Show show) {
        return showService.addShow(show);
    }
}
