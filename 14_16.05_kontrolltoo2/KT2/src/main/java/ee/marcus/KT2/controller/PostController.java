package ee.marcus.KT2.controller;

import ee.marcus.KT2.entity.Post;
import ee.marcus.KT2.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class PostController {

    @Autowired
    private PostRepository postRepository;

    @GetMapping("posts")
    public List<Post> getPosts() {
        return postRepository.findAll();
    }

    @PostMapping("posts")
    public List<Post> addPost(@RequestBody Post post) {
        postRepository.save(post);
        return postRepository.findAll();
    }

    @DeleteMapping("posts/{id}")
    public List<Post> deletePost(@PathVariable Long id) {
        postRepository.deleteById(id);
        return postRepository.findAll();
    }

    @PutMapping("posts")
    public List<Post> updatePost(@RequestBody Post post) {
        postRepository.save(post);
        return postRepository.findAll();
    }

    @GetMapping("posts/{id}")
    public Post getPost(@PathVariable Long id) {
        return postRepository.findById(id).orElseThrow();
    }

    // 🔍 Otsing koos case-insensitive sorteerimise ja pagineerimisega
    @GetMapping("posts/search")
    public Page<Post> searchPosts(
            @RequestParam String keyword,
            Pageable pageable
    ) {
        // Sorteeri case-insensitive kujul
        Sort.Order order = pageable.getSort().stream().findFirst()
                .map(o -> new Sort.Order(o.getDirection(), o.getProperty()).ignoreCase())
                .orElse(new Sort.Order(Sort.Direction.ASC, "title").ignoreCase());

        Pageable fixed = PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                Sort.by(order)
        );

        return postRepository.findByTitleContainingIgnoreCase(keyword, fixed);
    }
}

