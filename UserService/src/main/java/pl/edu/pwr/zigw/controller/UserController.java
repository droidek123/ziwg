package pl.edu.pwr.zigw.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.edu.pwr.zigw.model.User;
import pl.edu.pwr.zigw.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/users")
    public List<User> getUsers() {
        return this.userService.getUsers();
    }
    @GetMapping("/user/{userId}")
    public User getUserById(Long userId) {
        return this.userService.getUserById(userId);
    }
    @PostMapping("/user/new")
    public Long createUser(String email, String password, String name, String lastName) {
        User user = new User();
        user.setEmail(email);
        user.setPassword(password);
        user.setName(name);
        user.setLastName(lastName);
        return this.userService.createUser(user);
    }
    @PutMapping("/user/update")
    public User updateUser(Long userId, String email, String password, String name, String lastName) {
        User user = new User();
        user.setEmail(email);
        user.setPassword(password);
        user.setName(name);
        user.setLastName(lastName);
        return this.userService.updateUser(userId, user);
    }
    @DeleteMapping("/user/delete")
    public boolean deleteUser(Long userId) {
        return this.userService.deleteUser(userId);
    }
}
