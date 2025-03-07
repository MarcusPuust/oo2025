package ee.marcusp.hulknurk.controller;

import ee.marcusp.hulknurk.entity.Coordinate;
import ee.marcusp.hulknurk.repository.CoordinateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class CoordinateController {
    @Autowired
    CoordinateRepository coordinateRepository;

    @PostMapping("coordinate")
    public List<Coordinate> addCoordinate(@RequestBody Coordinate coordinate) {
        if (coordinate.getX() == 0 || coordinate.getY() == 0) {
            throw new RuntimeException("ERROR_COORDINATE_CANNOT_BE_NULL");
        }
        coordinateRepository.save(coordinate);
        return coordinateRepository.findAll();
    }

    @GetMapping("coordinate")
    public List<Coordinate> getCoordinates() {
        return coordinateRepository.findAll();
    }

    // kujundi ümbermõõt
    @GetMapping("coordinate/perimeter")
    public double getCoordinatePerimeter() {
        List<Coordinate> coordinates = coordinateRepository.findAll();

        if (coordinates.size() < 3) {
            throw new RuntimeException("ERROR_NOT_ENOUGH_COORDINATES_FOR_PERIMETER");
        }

        double perimeter = 0.0;

        for (int i = 0; i < coordinates.size(); i++) {
            int nextIndex = (i + 1) % coordinates.size();
            perimeter += calculateDistance(coordinates.get(i), coordinates.get(nextIndex));
        }

        return perimeter;
    }

    //  X koordinaatide uuendamine
    @PostMapping("coordinate/updateX")
    public List<Coordinate> updateX(@RequestBody int increment) {
        List<Coordinate> coordinates = coordinateRepository.findAll();
        for (Coordinate coordinate : coordinates) {
            coordinate.setX(coordinate.getX() + increment);
            coordinateRepository.save(coordinate);
        }
        return coordinateRepository.findAll();
    }

    // Y koordinaatide uuendamine
    @PostMapping("coordinate/updateY")
    public List<Coordinate> updateY(@RequestBody int increment) {
        List<Coordinate> coordinates = coordinateRepository.findAll();
        for (Coordinate coordinate : coordinates) {
            coordinate.setY(coordinate.getY() + increment);
            coordinateRepository.save(coordinate);
        }
        return coordinateRepository.findAll();
    }

    // Kahe koordinaadi vahelise kauguse arvutamine
    private double calculateDistance(Coordinate current, Coordinate next) {
        int x1 = current.getX();
        int y1 = current.getY();
        int x2 = next.getX();
        int y2 = next.getY();

        // 2D kauguse valem
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    //Koordinaatide kustutamine ID alusel
    @DeleteMapping("coordinate/{id}")
    public List<Coordinate> deleteCoordinate(@PathVariable Long id) {
        coordinateRepository.deleteById(id);
        return coordinateRepository.findAll();
    }
}