package pl.edu.pwr.authservice.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pl.edu.pwr.authservice.domain.SecurityUserDetails;
import pl.edu.pwr.authservice.repository.UserRepository;
import pl.edu.pwr.zigw.model.User;

import java.util.Optional;


@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        User user = userRepository.findByName(name).orElseThrow(() -> new UsernameNotFoundException("Jest pusto"));
        return new SecurityUserDetails(user);
    }

    public User  getUserByName(String name) {
        Optional<User> user = userRepository.findByName(name);
        return user.orElse(User.builder().name("test-niedziała").password("test").build());
    }
}
