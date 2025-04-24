// AthleteController.java
package ee.marcusp.kumnevoistlus.controller;

import ee.marcusp.kumnevoistlus.entity.Athlete;
import ee.marcusp.kumnevoistlus.repository.AthleteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
public class AthleteController {
    @Autowired
    AthleteRepository athleteRepository;

    @GetMapping("athletes")
    public List<Athlete> getAthletes() {
        return athleteRepository.findAll();
    }

    @PostMapping("athletes")
    public List<Athlete> addAthlete(@RequestBody Athlete athlete) {
        if (athlete.getName() == null || athlete.getName().isEmpty()) {
            throw new RuntimeException("ERROR_NAME_IS_MISSING");
        }
        if (athlete.getCountry() == null || athlete.getCountry().isEmpty()) {
            throw new RuntimeException("ERROR_COUNTRY_IS_MISSING");
        }
        if (athlete.getAge() == null) {
            throw new RuntimeException("ERROR_AGE_IS_MISSING");
        }
        athleteRepository.save(athlete);
        return athleteRepository.findAll();
    }

    @PutMapping("athletes")
    public List<Athlete> editAthlete(@RequestBody Athlete athlete) {
        if (athlete.getName() == null || athlete.getName().isEmpty()) {
            throw new RuntimeException("ERROR_NAME_IS_MISSING");
        }
        if (athlete.getCountry() == null || athlete.getCountry().isEmpty()) {
            throw new RuntimeException("ERROR_COUNTRY_IS_MISSING");
        }
        if (athlete.getAge() == null) {
            throw new RuntimeException("ERROR_AGE_IS_MISSING");
        }
        athleteRepository.save(athlete);
        return athleteRepository.findAll();
    }

    @DeleteMapping("athletes/{id}")
    public List<Athlete> deleteAthlete(@PathVariable Long id) {
        athleteRepository.deleteById(id);
        return athleteRepository.findAll();
    }

    // Uus päring riigi ja lehekülje alusel
    @GetMapping("athletes-country")
    public Page<Athlete> getAthletesByCountry(
            @RequestParam String country,
            @RequestParam int page,
            @RequestParam int size) {

        Pageable pageable = PageRequest.of(page, size);
        if (country == null || country.isEmpty()) {
            return athleteRepository.findAll(pageable);
        } else {
            return athleteRepository.findByCountry(country, pageable);
        }
    }
}
