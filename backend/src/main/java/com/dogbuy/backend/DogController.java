package com.dogbuy.backend;

import org.springframework.web.bind.annotation.*;
import java.util.*;

import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/api/dogs")
@CrossOrigin(origins = "http://localhost:3000")
public class DogController {
    private List<Dog> dogs = new ArrayList<>(Arrays.asList(
        new Dog(1, "Golden Retriever", "Friendly and intelligent", 800),
        new Dog(2, "Labrador", "Gentle and outgoing", 750),
        new Dog(3, "German Shepherd", "Confident and smart", 900)
    ));

    @GetMapping
    public List<Dog> getAllDogs() {
        return dogs;
    }

    @GetMapping("/{id}")
    public Dog getDogById(@PathVariable int id) {
        return dogs.stream().filter(d -> d.getId() == id).findFirst().orElse(null);
    }

    @PostMapping("/buy/{id}")
    public String buyDog(@PathVariable int id) {
        Optional<Dog> dog = dogs.stream().filter(d -> d.getId() == id).findFirst();
        if (dog.isPresent()) {
            dogs.remove(dog.get());
            return "Purchase successful for dog: " + dog.get().getName();
        } else {
            return "Dog not found.";
        }
    }
}

class Dog {
    private int id;
    private String name;
    private String description;
    private int price;

    public Dog(int id, String name, String description, int price) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
    }

    public int getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public int getPrice() { return price; }
}
