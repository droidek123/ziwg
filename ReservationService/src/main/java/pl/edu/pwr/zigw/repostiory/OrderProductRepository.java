package pl.edu.pwr.zigw.repostiory;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.pwr.zigw.model.OrderProduct;

public interface OrderProductRepository  extends JpaRepository<OrderProduct, Long> {
}
