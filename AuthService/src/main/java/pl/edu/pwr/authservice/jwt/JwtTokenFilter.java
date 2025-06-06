package pl.edu.pwr.authservice.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtTokenFilter extends OncePerRequestFilter {

    // Upewnij się, że to jest dokładnie ta sama wartość (i w takiej samej formie),
    // której używasz w JwtTokenUtil.generateToken(...) do podpisu.
    private static final String SECRET_KEY =  "d60a10fac46d29d27c6f9198682c5427def40f818cb46c90aecd23caa871940d6141529ad6f2e5e666b3a34a8c178fbe6e8bf6ab2433406886d00c225c6dd529";

    private final UserDetailsService userDetailsService;

    public JwtTokenFilter(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getServletPath();
        // 1) Jeśli ścieżka zaczyna się od /auth/, pomijamy weryfikację JWT:
        if (path.startsWith("/auth/")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 2) Dla innych endpointów: czytamy nagłówek "Authorization":
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            try {
                // Parsujemy JWT – dokładnie tak, jak w JwtTokenUtil.generateToken używasz tego samego SECRET_KEY
                Claims claims = Jwts.parserBuilder()
                        .setSigningKey(SECRET_KEY.getBytes())  // najczęściej .getBytes() jest OK
                        .build()
                        .parseClaimsJws(token)
                        .getBody();

                String username = claims.getSubject(); // np. subject = nazwa użytkownika
                if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    // Załaduj UserDetails z bazy
                    var userDetails = userDetailsService.loadUserByUsername(username);

                    // Stwórz Authentication i wstaw do kontekstu
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,               // nie przekazujemy ponownie hasła
                                    userDetails.getAuthorities()
                            );
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            } catch (JwtException ex) {
                // Tu łapiemy dowolny wyjątek parsowania JWT (np. wygasły, zmodyfikowany, złe podpisy).
                // Nie ustawiamy SecurityContext – w efekcie dalsze zabezpieczenia (authenticated()) zwrócą 403.
                // Ewentualnie można od razu zwrócić 401, ale często wystarczy przepuścić dalej:
                // response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                // return;
            }
        }

        // 3) Kontynuujemy łańcuch filtrów
        filterChain.doFilter(request, response);
    }
}
