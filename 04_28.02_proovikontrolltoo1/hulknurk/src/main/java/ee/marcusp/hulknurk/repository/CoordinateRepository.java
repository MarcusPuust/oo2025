package ee.marcusp.hulknurk.repository;

import ee.marcusp.hulknurk.entity.Coordinate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CoordinateRepository extends JpaRepository<Coordinate, Long> {}
