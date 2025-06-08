package pl.edu.pwr.zigw.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pl.edu.pwr.zigw.domain.ReservationRequest;
import pl.edu.pwr.zigw.dto.ReservationDto;
import pl.edu.pwr.zigw.model.Reservation;
import pl.edu.pwr.zigw.model.Seat;
import pl.edu.pwr.zigw.model.Show;
import pl.edu.pwr.zigw.model.User;
import pl.edu.pwr.zigw.repostiory.ReservationRepository;
import pl.edu.pwr.zigw.repostiory.SeatRepository;
import pl.edu.pwr.zigw.repostiory.ShowRepository;
import pl.edu.pwr.zigw.repostiory.UserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final SeatRepository seatRepository;
    private final UserRepository userRepository;
    private final ShowRepository showRepository;

    public List<Reservation> getReservations() {
        return reservationRepository.findAll();
    }

    public Long addReservation(Reservation reservation) {
        return reservationRepository.save(reservation).getId();
    }

    public Reservation updateReservation(Reservation newReservation) {

        Reservation oldReservation = reservationRepository.findById(newReservation.getId()).orElse(null);
        if(oldReservation == null){
            return null; // todo rzucanie customowym wyjątkiem jak bedzie czas
        }
        return reservationRepository.save(newReservation);
    }

    public Boolean deleteReservation(Long id){
        Reservation reservation = reservationRepository.findById(id).orElse(null);
        if(reservation == null){
            return false; // todo rzucanie customowym wyjątkiem jak bedzie czas
        }
        reservationRepository.delete(reservation);
        return true;
    }

    public List<ReservationDto> getReservationsByUser(Long userId) {
        return reservationRepository.findByUserId(userId)
                .stream().map(ReservationDto::new).toList();
    }

    public ReservationDto getReservation(Long id) {
        return new ReservationDto(reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found")));
    }

    public ResponseEntity<?> reserveMovie(Long movieId, Long userId) {
        // Simplified
        Show show = showRepository.findFirstByMovieId(movieId)
                .orElseThrow(() -> new RuntimeException("Show not found"));
        User user = userRepository.findById(userId).orElseThrow();

        Reservation res = Reservation.builder()
                .status("PENDING")
                .user(user)
                .show(show)
                .build();

        reservationRepository.save(res);
        return ResponseEntity.ok(new ReservationDto(res));
    }

    public ResponseEntity<?> assignSeat(Long reservationId, Long seatId, Long userId) {
        Reservation res = reservationRepository.findById(reservationId).orElseThrow();
        Seat seat = seatRepository.findById(seatId).orElseThrow();
        res.setSeat(seat);
        reservationRepository.save(res);
        return ResponseEntity.ok("Seat assigned");
    }

    public ResponseEntity<?> updateStatus(Long id, String status) {
        Reservation res = reservationRepository.findById(id).orElseThrow();
        res.setStatus(status);
        reservationRepository.save(res);
        return ResponseEntity.ok("Status updated");
    }

    public ResponseEntity<?> removeReservation(Long id) {
        reservationRepository.deleteById(id);
        return ResponseEntity.ok("Reservation removed");
    }

    public Long addReservation(ReservationRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Show show = showRepository.findById(request.getShowId())
                .orElseThrow(() -> new RuntimeException("Show not found"));
        Seat seat = seatRepository.findById(request.getSeatId())
                .orElseThrow(() -> new RuntimeException("Seat not found"));

        Reservation reservation = Reservation.builder()
                .user(user)
                .show(show)
                .seat(seat)
                .status("CONFIRMED")
                .build();

        return reservationRepository.save(reservation).getId();
    }

    public boolean cancelReservation(Long reservationId) {
        return reservationRepository.findById(reservationId)
                .map(reservation -> {
                    reservation.setStatus("CANCELLED");
                    reservationRepository.save(reservation);
                    return true;
                })
                .orElse(false);
    }

    // todo  pewnie pobieranie reservacji per user
}
