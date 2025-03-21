package ee.marcusp.kumnevoistlus.controller;

import ee.marcusp.kumnevoistlus.entity.Athlete;
import ee.marcusp.kumnevoistlus.repository.AthleteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173/")

@RestController
public class AthleteController {
    @Autowired //Controlleri ja Repository omavaheline sidumine
    AthleteRepository athleteRepository;

    // Lisatud sportlaste pärimine (GET)
    @GetMapping("athletes")
    public List<Athlete> getAthletes() {
        return athleteRepository.findAll();
    }
    // Sportlase lisamine nimi, riik ja vanus
    @PostMapping("athletes")
    public List<Athlete> addAthlete(@RequestBody Athlete athlete) {
        if (athlete.getName() == null || athlete.getName().isEmpty()) {
            throw new RuntimeException("ERROR_NAME_IS_MISSING");
        }
        if (athlete.getCountry() == null || athlete.getCountry().isEmpty()) {
            throw new RuntimeException("ERROR_COUNTRY_IS_MISSING");
        }
        if (athlete.getAge() == null){
            throw new RuntimeException("ERROR_AGE_IS_MISSING");
        }
        athleteRepository.save(athlete);
        return athleteRepository.findAll();
    }

    //Sportlase andmete muutmine samad (nimi, riik ja vanus)
    @PutMapping("athletes")
    public List<Athlete> editAthlete(@RequestBody Athlete athlete) {
        if (athlete.getName() == null || athlete.getName().isEmpty()) {
            throw new RuntimeException("ERROR_NAME_IS_MISSING");
        }
        if (athlete.getCountry() == null || athlete.getCountry().isEmpty()) {
            throw new RuntimeException("ERROR_COUNTRY_IS_MISSING");
        }
        if (athlete.getAge() == null){
            throw new RuntimeException("ERROR_AGE_IS_MISSING");
        }
        athleteRepository.save(athlete);
        return athleteRepository.findAll();
    }

    //Sportlase kustutamine ID alusel
    @DeleteMapping("athletes/{id}")
    public List<Athlete> deleteAthlete(@PathVariable Long id) {
        athleteRepository.deleteById(id);
        return athleteRepository.findAll();
    }
}

