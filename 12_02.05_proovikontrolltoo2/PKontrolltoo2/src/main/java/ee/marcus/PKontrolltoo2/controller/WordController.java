package ee.marcus.PKontrolltoo2.controller;

import ee.marcus.PKontrolltoo2.entity.Word;
import ee.marcus.PKontrolltoo2.repository.WordRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
@RequestMapping("/words")
public class WordController {

    private final WordRepository wordRepository;

    public WordController(WordRepository wordRepository) {
        this.wordRepository = wordRepository;
    }

    @GetMapping
    public List<Word> getAllWords() {
        return wordRepository.findAll();
    }

    @GetMapping("/{id}")
    public Word getWordById(@PathVariable Long id) {
        return wordRepository.findById(id).orElse(null);
    }

    @PostMapping
    public List<Word> addWord(@RequestBody Word word) {
        wordRepository.save(word);
        return wordRepository.findAll();
    }

    @PutMapping
    public List<Word> updateWord(@RequestBody Word word) {
        wordRepository.save(word);
        return wordRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public List<Word> deleteWord(@PathVariable Long id) {
        wordRepository.deleteById(id);
        return wordRepository.findAll();
    }
}
