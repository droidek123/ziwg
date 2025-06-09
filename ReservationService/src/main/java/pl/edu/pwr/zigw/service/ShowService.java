package pl.edu.pwr.zigw.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.pwr.zigw.domain.Repertuar;
import pl.edu.pwr.zigw.model.Show;
import pl.edu.pwr.zigw.repostiory.ShowRepository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ShowService {

    private final ShowRepository showRepository;

    public final Show getShowById(Long id) {
        return showRepository.findById(id).orElse(null);
    }

    public final List<Repertuar> getShows(LocalDateTime showDateTime, String genere) {
        List<Show> shows = showRepository.findAllByDateTime(showDateTime);
        return shows.stream().map(Translator::translateShowToRepertuar).toList();
    }

    public Long addShow(Show show) {
        return showRepository.save(show).getId();
    }
}
