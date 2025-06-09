package pl.edu.pwr.zigw.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.time.Year;

@Entity
@Table(name = "movies")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private Year year;

    private Date releaseDate;

    private String description;

    private String genre;

    private String posterFilename;
}
