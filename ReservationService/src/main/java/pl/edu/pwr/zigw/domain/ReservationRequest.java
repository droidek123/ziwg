package pl.edu.pwr.zigw.domain;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReservationRequest {

    private Long seatId;
    private Long showId;
    private Long userId;
}
