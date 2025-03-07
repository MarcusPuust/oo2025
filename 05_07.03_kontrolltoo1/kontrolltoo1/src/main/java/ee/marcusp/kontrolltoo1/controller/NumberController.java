package ee.marcusp.kontrolltoo1.controller;

import ee.marcusp.kontrolltoo1.entity.Number;
import ee.marcusp.kontrolltoo1.repository.NumberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class NumberController {

    @Autowired
    private NumberRepository numberRepository;

    // GET: localhost:8080/conversions (arvude vaatamiseks)
    @GetMapping("conversions")
    public List<Number> getAllNumbers() {
        return numberRepository.findAll();
    }

    // localhost:8080/conversions  (arvude lisamiseks)
    @PostMapping("conversions")
    public List<Number> addNumber(@RequestBody Number number) {
        if (number.getId() != null) {
            throw new RuntimeException("ERROR_CANNOT_ADD_WITH_ID");
        }
        if (number.getNumber() < 0) {
            throw new RuntimeException("ERROR_CANNOT_ADD_NEGATIVE_VALUES_TO_NUMBER");
        }
        numberRepository.save(number);
        return numberRepository.findAll();
    }

    // POST: localhost:8080/conversions/convert
    @PostMapping("conversions/convert")
    public String convertNumber(@RequestBody Map<String, Object> request) {
        if (!request.containsKey("id") || !request.containsKey("conversionType")) {
            throw new RuntimeException("ERROR_ID_AND_OR_TYPE_MISSING");
        }

        Long id = Long.parseLong(request.get("id").toString());
        String conversionType = (String) request.get("conversionType");

        Optional<Number> number = numberRepository.findById(id);
        if (number.isEmpty()) {
            throw new RuntimeException("ERROR_CANNOT_CONVERT_NUMBER");
        }

        int numberInt = number.get().getNumber();

        if (conversionType.equalsIgnoreCase("binary")) {
            return "Binary: " + Integer.toBinaryString(numberInt);
        } else if (conversionType.equalsIgnoreCase("octal")) {
            return "Octal: " + Integer.toOctalString(numberInt);
        } else if (conversionType.equalsIgnoreCase("hexadecimal")) {
            return "Hexadecimal: " + Integer.toHexString(numberInt);
        } else {
            throw new RuntimeException("PLEASE_PICK_CORRECT_CONVERSION_TYPE");
        }
    }
}


