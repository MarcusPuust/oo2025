package ee.marcusp.kumnevoistlus.controller;

import ee.marcusp.kumnevoistlus.entity.Athlete;
import ee.marcusp.kumnevoistlus.entity.Result;
import ee.marcusp.kumnevoistlus.repository.AthleteRepository;
import ee.marcusp.kumnevoistlus.repository.ResultRepository;
import ee.marcusp.kumnevoistlus.service.CalculateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173/")

@RestController
public class ResultController {

    @Autowired
    private ResultRepository resultRepository;

    @Autowired
    private AthleteRepository athleteRepository;

    @Autowired
    private CalculateService calculateService;

    //Tulemuste postitamine event, score, athlete {id}
    @PostMapping("results")
    public List<Result> addResult(@RequestBody Result result) {
        if (result.getEvent() == null || result.getEvent().isEmpty()) {
            throw new RuntimeException("ERROR_EVENT_MISSING");
        }
        if (result.getScore() <= 0) {
            throw new RuntimeException("ERROR_SCORE_MUST_BE_POSITIVE");
        }

        int points = calculateService.calculatePoints(result.getEvent(), result.getScore());
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
    // Tulemuste pärimine
    @GetMapping("results")
    public List<Result> getAllResults() {
        return resultRepository.findAll();
    }

    //Olemasoleva eventi(ala) sportlase tulemuse muutmine
    @PutMapping("results")
    public List<Result> updateResult(@RequestBody Result result) {
        if (result.getId() == null) {
            throw new RuntimeException("ERROR_CANNOT_EDIT_WITHOUT_ID");
        }
        if (result.getScore() <= 0) {
            throw new RuntimeException("ERROR_SCORE_MUST_BE_POSITIVE");
        }

        // Leiab olemasoleva tulemuse
        Result existingResult = resultRepository.findById(result.getId()).orElseThrow(() ->
                new RuntimeException("ERROR_RESULT_NOT_FOUND"));

        // Uuendab skoori ja arvutab uued punktid
        existingResult.setScore(result.getScore());
        int updatedPoints = calculateService.calculatePoints(existingResult.getEvent(), existingResult.getScore());
        existingResult.setPoints(updatedPoints);

        resultRepository.save(existingResult);

        //Leiab sportlase ja uuendab tema kogupunktid
        Athlete athlete = athleteRepository.findById(existingResult.getAthlete().getId()).orElseThrow(() ->
                new RuntimeException("ERROR_ATHLETE_NOT_FOUND"));

        //Leiab kõik tulemused selle sportlase kohta ja arvutab uued kogupunktid
        List<Result> athleteResults = resultRepository.findByAthleteId(athlete.getId());
        int totalPoints = athleteResults.stream().mapToInt(Result::getPoints).sum();
        athlete.setTotalPoints(totalPoints);

        athleteRepository.save(athlete);

        return resultRepository.findAll();
    }


    //Tulemuste kustutamine id alusel
    @DeleteMapping("results/{id}")
    public List<Result> deleteResult(@PathVariable Long id) {
        resultRepository.deleteById(id);
        return resultRepository.findAll();
    }
}

