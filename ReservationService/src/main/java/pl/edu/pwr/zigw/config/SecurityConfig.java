package pl.edu.pwr.zigw.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        // PUBLIC
                        .requestMatchers(
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/v3/api-docs/**",
                                "/reservation/reservations" // <== GET all reservations (public)
                        ).permitAll()

                        // AUTH REQUIRED
                        .requestMatchers(
                                "/reservation/reservations/new",
                                "/reservation/{id}/select-seat",
                                "/reservation/{id}/update-status",
                                "/reservation" // DELETE + PUT
                        ).authenticated()

                        // fallback
                        .anyRequest().permitAll()
                )
                .httpBasic(); // albo .formLogin(), lub .addFilter(JWT) w zależności od użycia

        return http.build();
    }
}
