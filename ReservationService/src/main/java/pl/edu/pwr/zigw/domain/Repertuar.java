package pl.edu.pwr.zigw.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Data
@Builder
public class Repertuar {
    Long showId;
    Long movieId;
    String title;

}
