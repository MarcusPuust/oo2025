package ee.marcus.PKontrolltoo2.repository;

import ee.marcus.PKontrolltoo2.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WordRepository extends JpaRepository<Word, Long> {
}


