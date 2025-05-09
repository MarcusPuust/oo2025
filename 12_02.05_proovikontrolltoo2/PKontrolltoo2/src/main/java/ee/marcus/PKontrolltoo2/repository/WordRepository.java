package ee.marcus.PKontrolltoo2.repository;

import ee.marcus.PKontrolltoo2.entity.Word;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WordRepository extends JpaRepository<Word, Long> {
    List<Word> findByManagerId(Long ManagerId);
    Page<Word>findByManagerId(Long ManagerId, Pageable pageable);

    Page<Word> findByManager_Id(Long managerId, Pageable pageable);
}


