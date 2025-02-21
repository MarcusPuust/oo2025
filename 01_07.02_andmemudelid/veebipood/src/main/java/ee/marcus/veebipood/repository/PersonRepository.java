package ee.marcus.veebipood.repository;

import ee.marcus.veebipood.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;

// .findALL() --> List <Person>
// .save(Person)
//.findById(Long)
//.deleteById(Long)

public interface PersonRepository extends JpaRepository<Person, Long> {
}
