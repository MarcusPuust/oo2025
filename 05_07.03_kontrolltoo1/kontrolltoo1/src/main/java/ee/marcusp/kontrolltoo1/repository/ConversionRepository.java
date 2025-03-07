package ee.marcusp.kontrolltoo1.repository;

import ee.marcusp.kontrolltoo1.entity.Conversion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConversionRepository extends JpaRepository<Conversion, Long> {
    List<Conversion> findByNumberId(Long numberId); // Tagasta kõik teisendused konkreetse numbri jaoks

    List<Conversion> findByConversionType(String conversionType);
}
