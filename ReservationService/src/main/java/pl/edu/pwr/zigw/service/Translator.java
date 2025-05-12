package pl.edu.pwr.zigw.service;

import org.springframework.stereotype.Service;
import pl.edu.pwr.zigw.domain.Repertuar;
import pl.edu.pwr.zigw.model.Show;

import java.util.List;

@Service
public class Translator {

    public static Repertuar translateShowToRepertuar(Show show) {
         return Repertuar.builder()
                .showId(show.getId())
                .movieId(show.getMovie().getId())
                .title(show.getMovie().getTitle())
                .build();
    }
}
