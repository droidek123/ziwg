package pl.edu.pwr.zigw.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.edu.pwr.zigw.model.Reservation;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReservationDto {
    private Long id;
    private String status;
    private Long userId;
    private Integer seatNumber;
    private Integer sector;
    private String title;
    private String cinemaRoom;
    private LocalDateTime dateTime;

    public ReservationDto(Reservation res) {
        System.out.println(res);
        this.id = res.getId();
        this.status = res.getStatus();
        this.userId = res.getUser() != null ? res.getUser().getId() : null;
        this.seatNumber = res.getSeat() != null ? res.getSeat().getSeatNumber() : null;
        this.sector = res.getSeat() != null ? res.getSeat().getSector() : null;
        this.title = res.getShow() != null ? res.getShow().getMovie().getTitle() : null;
        this.cinemaRoom = res.getShow() != null ? res.getShow().getCinemaRoom().getName() : null;
        this.dateTime = res.getShow() != null ? res.getShow().getDateTime() : null;
    }
}
