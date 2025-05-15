package ee.marcus.PKontrolltoo20.controller;

import ee.marcus.PKontrolltoo20.entity.Word;
import ee.marcus.PKontrolltoo20.repository.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController

public class WordController {
    @Autowired
    WordRepository wordRepository;

    @GetMapping("words")
    public List<Word> getWords() {return wordRepository.findAll();}

    @PostMapping("words")
    public List<Word> addWord(@RequestBody Word word) {

        wordRepository.save(word);
        return wordRepository.findAll();
    }
    @DeleteMapping("word/{id}")
    public List<Word> deleteWord(@PathVariable Long id) {
        wordRepository.deleteById(id);
        return wordRepository.findAll();
    }
    @PutMapping("words")
    public List<Word> editWord(@RequestBody Word word) {
        wordRepository.save(word);
        return wordRepository.findAll();
    }
    @GetMapping("words/{id}")
    public Word getWord(@PathVariable Long id) {
        return wordRepository.findById(id).orElseThrow();
    }

    @GetMapping("words-manager")
    public Page<Word> getWordsManager(@RequestParam Long managerId, Pageable pageable) {
        if (managerId == -1){
            return wordRepository.findAll(pageable);
        }
        return wordRepository.findByManager_Id(managerId, Pageable.unpaged());
    }
}
