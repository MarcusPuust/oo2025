package ee.marcusp.libisevkeskmine.Repository;

import ee.marcusp.libisevkeskmine.entity.Figure;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FigureRepository extends JpaRepository<Figure, Integer> {
}
