package pl.edu.pwr.zigw.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.edu.pwr.zigw.model.Reservation;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReservationDto {
    private Long id;
    private String status;
    private Long userId;
    private Long seatId;

    public ReservationDto(Reservation res) {
        this.id = res.getId();
        this.status = res.getStatus();
        this.userId = res.getUser() != null ? res.getUser().getId() : null;
        this.seatId = res.getSeat() != null ? res.getSeat().getId() : null;
    }
}
