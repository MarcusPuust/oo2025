package ee.marcusp.kontrolltoo1.repository;

import ee.marcusp.kontrolltoo1.entity.Number;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NumberRepository extends JpaRepository<Number, Long> {
}

