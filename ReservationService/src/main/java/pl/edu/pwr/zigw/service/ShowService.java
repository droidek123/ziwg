package pl.edu.pwr.zigw.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.pwr.zigw.model.Show;
import pl.edu.pwr.zigw.repostiory.ShowRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ShowService {

    private final ShowRepository showRepository;

    public final Show getShowById(Long id) {
        return showRepository.findById(id).orElse(null);
    }

    public final List<Show> getShows() {
        return showRepository.findAll();
    }

    public Long addShow(Show show) {
        return showRepository.save(show).getId();
    }
}
