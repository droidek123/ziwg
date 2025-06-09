package pl.edu.pwr.zigw.repostiory;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.pwr.zigw.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
