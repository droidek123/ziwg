package pl.edu.pwr.zigw.repostiory;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.pwr.zigw.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
