package pl.edu.pwr.zigw.controller;

import org.springframework.stereotype.Controller;
import pl.edu.pwr.zigw.service.UserService;

@Controller
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
}
