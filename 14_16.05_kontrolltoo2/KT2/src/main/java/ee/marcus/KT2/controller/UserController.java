package ee.marcus.KT2.controller;

import ee.marcus.KT2.entity.Users;
import ee.marcus.KT2.entity.Post;
import ee.marcus.KT2.repository.UserRepository;
import ee.marcus.KT2.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    @GetMapping("users")
    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping("users")
    public List<Users> addUser(@RequestBody Users user) {
        userRepository.save(user);
        return userRepository.findAll();
    }

    @GetMapping("users/{id}")
    public Users getUser(@PathVariable Long id) {
        return userRepository.findById(id).orElseThrow();
    }

    @GetMapping("users/{id}/posts")
    public List<Post> getPostsByUser(@PathVariable Long id) {
        return postRepository.findByUserId(id);
    }
}

