package ee.marcusp.kumnevoistlus.repository;

import ee.marcusp.kumnevoistlus.entity.Athlete;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AthleteRepository extends JpaRepository<Athlete, Long> {
}
