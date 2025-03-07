package ee.marcusp.kontrolltoo1.controller;

import ee.marcusp.kontrolltoo1.entity.Number;
import ee.marcusp.kontrolltoo1.entity.Conversion;
import ee.marcusp.kontrolltoo1.repository.NumberRepository;
import ee.marcusp.kontrolltoo1.repository.ConversionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class NumberController {

    @Autowired
    private NumberRepository numberRepository;

    @Autowired
    private ConversionRepository conversionRepository;

    // GET: localhost:8080/conversions (Kõik numbrid)
    @GetMapping("conversions")
    public List<Number> getAllNumbers() {
        return numberRepository.findAll();
    }

    // GET: localhost:8080/conversions/history (Kõik teisendused)
    @GetMapping("conversions/history")
    public List<Conversion> getAllConversions() {
        // Sorteeri teisendused ID järgi (väiksemast suuremaks)
        List<Conversion> conversions = conversionRepository.findAll();
        conversions.sort((c1, c2) -> c1.getNumber().getId().compareTo(c2.getNumber().getId()));
        return conversions;
    }


    // POST: localhost:8080/conversions (Uute numbrite lisamine)
    @PostMapping("conversions")
    public List<Number> addNumbers(@RequestBody List<Number> numbers) {
        if (numbers.size() != 8) {
            throw new RuntimeException("ERROR_MUST_ADD_EIGHT_NUMBERS");
        }
        for (Number number : numbers) {
            if (number.getId() != null) {
                throw new RuntimeException("ERROR_CANNOT_ADD_WITH_ID");
            }
            if (number.getNumber() < 0) {
                throw new RuntimeException("ERROR_CANNOT_ADD_NEGATIVE_VALUES_TO_NUMBER");
            }
        }
        numberRepository.saveAll(numbers);
        return numberRepository.findAll();
    }


    // POST: localhost:8080/conversions/convert (Teisendamine)
    @PostMapping("conversions/convert")
    public List<String> convertNumbers(@RequestBody Map<String, Object> request) {
        if (!request.containsKey("conversionType")) {
            throw new RuntimeException("ERROR_CONVERSION_TYPE_MISSING");
        }

        String conversionType = (String) request.get("conversionType");

        List<Number> lastEightNumbers = numberRepository.findTop8ByOrderByIdDesc();
        if (lastEightNumbers.isEmpty()) {
            throw new RuntimeException("ERROR_NO_NUMBERS_TO_CONVERT");
        }

        List<String> results = new ArrayList<>();
        for (Number num : lastEightNumbers) {
            int numberInt = num.getNumber();
            String convertedValue;

            // Teisenduse teostamine
            switch (conversionType.toLowerCase()) {
                case "binary":
                    convertedValue = Integer.toBinaryString(numberInt);
                    break;
                case "octal":
                    convertedValue = Integer.toOctalString(numberInt);
                    break;
                case "hexadecimal":
                    convertedValue = Integer.toHexString(numberInt);
                    break;
                default:
                    throw new RuntimeException("PLEASE_PICK_CORRECT_CONVERSION_TYPE");
            }

            // Salvestame teisenduse andmebaasi
            Conversion conversion = new Conversion();
            conversion.setNumber(num);
            conversion.setConversionType(conversionType);
            conversion.setConvertedValue(convertedValue);
            conversion.setOriginalNumber(num.getNumber()); // Määrame originalNumber väärtuse

            conversionRepository.save(conversion);

            results.add("ID " + num.getId() + ": " + convertedValue);
        }

        return results;
    }


    
    // POST: localhost:8080/conversions/convert/decimal (Tagasi kümnendsüsteemi teisendamine ainult binaarsetest väärtustest)
    @PostMapping("conversions/convert/decimal")
    public List<String> convertBackToDecimal() {
        // Võtame ainult need teisendused, mis on tehtud kümnendsüsteemist binaarsüsteemi
        List<Conversion> binaryConversions = conversionRepository.findByConversionType("binary");
        if (binaryConversions.isEmpty()) {
            throw new RuntimeException("ERROR_NO_BINARY_CONVERSIONS_TO_CONVERT");
        }

        List<String> results = new ArrayList<>();
        for (Conversion conversion : binaryConversions) {
            String convertedValue = conversion.getConvertedValue();

            // Kontrollime, et binaarväärtus sisaldaks ainult 0 ja 1
            if (!convertedValue.matches("[01]+")) {
                throw new RuntimeException("ERROR_INVALID_BINARY_VALUE: " + convertedValue);
            }

            int decimalValue = Integer.parseInt(convertedValue, 2);
            results.add("ID " + conversion.getNumber().getId() + ": Decimal: " + decimalValue);
        }

        return results;
    }

}

