package ee.marcusp.libisevkeskmine.controller;

import ee.marcusp.libisevkeskmine.Repository.FigureRepository;
import ee.marcusp.libisevkeskmine.entity.Figure;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class FigureController {

    @Autowired
    FigureRepository figureRepository;

    // localhost:8080/figures  (arvude vaatamiseks)
    @GetMapping("figures")
    public List<Figure> getFigures() {
        return figureRepository.findAll();
    }

    // localhost:8080/figures  (arvude lisamiseks)
    @PostMapping("figures")
    public List<Figure> addFigure(@RequestBody Figure figure) {
        if (figure.getId() != null) {
            throw new RuntimeException("ERROR_CANNOT_ADD_WITH_ID");
        }
        if (figure.getNumber() <= 0) {
            throw new RuntimeException("ERROR_NUMBER_MUST_BE_POSITIVE");
        }
        figureRepository.save(figure); //INSERT INTO products
        return figureRepository.findAll();
    }
    //Kõikide arvude summa leidmine
    @GetMapping("figures/sum")
    public double getSum() {
        return figureRepository.findAll().stream().mapToDouble(Figure::getNumber).sum();
    }
    //Kõikide arvude keskmise leidmine
    @GetMapping("figures/average")
    public double getAverage() {
        List<Figure> figures = figureRepository.findAll();

        return figures.stream().mapToDouble(Figure::getNumber).average().orElse(0.0);
    }
    //Suurima lisatud arvu leidmine
    @GetMapping("figures/max")
    public double getMax() {
        return figureRepository.findAll().stream().mapToDouble(Figure::getNumber).max().orElse(0.0);
    }

    // GET: localhost:8080/figures/movingaverage (libisev keskmine)
    @GetMapping("figures/movingaverage")
    public List<Double> getMovingAverage() {
        List<Double> numbers = figureRepository.findAll().stream()
                .map(Figure::getNumber)
                .mapToDouble(Integer::doubleValue)
                .boxed()
                .toList();

        List<Double> movingAverages = new ArrayList<>();

        for (int i = 0; i < numbers.size() - 2; i++) {
            double avg = (numbers.get(i) + numbers.get(i + 1) + numbers.get(i + 2)) / 3.0;
            movingAverages.add(avg);
        }
        return movingAverages;
    }
}
//test