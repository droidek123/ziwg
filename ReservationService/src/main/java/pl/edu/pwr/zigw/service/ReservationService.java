package pl.edu.pwr.zigw.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.pwr.zigw.model.Reservation;
import pl.edu.pwr.zigw.repostiory.ReservationRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;

    public List<Reservation> getReservations() {
        return reservationRepository.findAll();
    }

    public Reservation getReservationById(Long id) {
        return reservationRepository.findById(id).orElse(null);
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

    // todo  pewnie pobieranie reservacji per user
    // todo ogarnąć czy na froncie nie ma jakieś paginacji
    // todo
}
