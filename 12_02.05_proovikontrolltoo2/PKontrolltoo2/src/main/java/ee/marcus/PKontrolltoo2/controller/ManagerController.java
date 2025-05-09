package ee.marcus.PKontrolltoo2.controller;

import ee.marcus.PKontrolltoo2.entity.Manager;
import ee.marcus.PKontrolltoo2.repository.ManagerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController

public class ManagerController {

    @Autowired
    private ManagerRepository managerRepository;

    @GetMapping("manager")
    public List<Manager> getAllManagers() {
        return managerRepository.findAll();
    }

    @PostMapping("manager")
    public List<Manager> addManager(@RequestBody Manager manager) {
        managerRepository.save(manager);
        return managerRepository.findAll();
    }

    @GetMapping("manager/{id}")
    public Manager getManager(@PathVariable Long id) {
        return managerRepository.findById(id).orElseThrow();
    }
}