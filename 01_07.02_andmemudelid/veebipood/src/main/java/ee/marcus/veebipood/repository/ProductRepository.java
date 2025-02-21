package ee.marcus.veebipood.repository;

import ee.marcus.veebipood.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
