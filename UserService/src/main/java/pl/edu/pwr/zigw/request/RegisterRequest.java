package pl.edu.pwr.zigw.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String email;
    private String username;
    private String password;
}
