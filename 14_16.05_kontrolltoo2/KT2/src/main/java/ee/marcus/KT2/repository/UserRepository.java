package ee.marcus.KT2.repository;

import ee.marcus.KT2.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Users, Long> {
}

