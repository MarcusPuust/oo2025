package ee.marcusp.kumnevoistlus.controller;

import ee.marcusp.kumnevoistlus.entity.Athlete;
import ee.marcusp.kumnevoistlus.entity.Result;
import ee.marcusp.kumnevoistlus.repository.AthleteRepository;
import ee.marcusp.kumnevoistlus.repository.ResultRepository;
import ee.marcusp.kumnevoistlus.service.CalculateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ResultController {

    @Autowired
    private ResultRepository resultRepository;

    @Autowired
    private AthleteRepository athleteRepository;

    @Autowired
    private CalculateService calculateService; // Lisatud CalculateService

    @PostMapping("results")
    public List<Result> addResult(@RequestBody Result result) {
        if (result.getEvent() == null || result.getEvent().isEmpty()) {
            throw new RuntimeException("ERROR_EVENT_MISSING");
        }
        if (result.getScore() <= 0) {
            throw new RuntimeException("ERROR_SCORE_MUST_BE_POSITIVE");
        }

        int points = calculateService.calculatePoints(result.getEvent(), result.getScore()); // Uus meetodikõne
        if (points <= 0) {
            throw new RuntimeException("ERROR_POINTS_MUST_BE_POSITIVE");
        }

        result.setPoints(points);
        resultRepository.save(result);

        // lisame võistleja külge tema punktide kogusumma
        Athlete athlete = athleteRepository.findById(result.getAthlete().getId()).orElse(null);
        if (athlete != null) {
            List<Result> athleteResults = resultRepository.findByAthleteId(athlete.getId());

            int totalPoints = athleteResults.stream().mapToInt(Result::getPoints).sum();

            athlete.setTotalPoints(totalPoints);
            athleteRepository.save(athlete);

            return resultRepository.findAll();
        } else {
            throw new RuntimeException("ERROR_ATHLETE_NOT_FOUND");
        }
    }

    @GetMapping("results")
    public List<Result> getAllResults() {
        return resultRepository.findAll();
    }

    @PutMapping("results")
    public List<Result> updateResult(@RequestBody Result result) {
        if (result.getId() == null) {
            throw new RuntimeException("ERROR_CANNOT_EDIT_WITHOUT_ID");
        }
        if (result.getScore() <= 0) {
            throw new RuntimeException("ERROR_SCORE_MUST_BE_POSITIVE");
        }
        if (result.getPoints() <= 0) {
            throw new RuntimeException("ERROR_POINTS_MUST_BE_POSITIVE");
        }
        resultRepository.save(result);
        return resultRepository.findAll();
    }

    @DeleteMapping("results/{id}")
    public List<Result> deleteResult(@PathVariable Long id) {
        resultRepository.deleteById(id);
        return resultRepository.findAll();
    }
}

