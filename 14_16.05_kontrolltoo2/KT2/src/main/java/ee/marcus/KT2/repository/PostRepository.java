package ee.marcus.KT2.repository;

import ee.marcus.KT2.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
