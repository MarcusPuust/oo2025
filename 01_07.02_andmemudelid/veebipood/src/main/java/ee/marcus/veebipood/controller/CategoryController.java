package ee.marcus.veebipood.controller;

import ee.marcus.veebipood.entity.Category;
import ee.marcus.veebipood.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("categories")
    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }

    @PostMapping("categories") // POSTMAN rakendus
    public List<Category> addCategory(@RequestBody Category category) {
        if (category.getId() != null) { // Parandatud: kasutame objekti, mitte klassi
            throw new RuntimeException("ERROR_CANNOT_ADD_WITH_ID");
        }

        categoryRepository.save(category); // Parandatud: kasutame objekti, mitte klassi
        return categoryRepository.findAll();
    }

    @DeleteMapping("categories/{id}")
    public List<Category> deleteCategory(@PathVariable Long id) {
        categoryRepository.deleteById(id);
        return categoryRepository.findAll();
    }
}
