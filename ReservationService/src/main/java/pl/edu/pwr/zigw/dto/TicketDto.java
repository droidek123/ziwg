package pl.edu.pwr.zigw.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.edu.pwr.zigw.model.Ticket;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TicketDto {
    private Long id;
    private Float price;
    private String type;

    public TicketDto(Ticket ticket) {
        this.id = ticket.getId();
        this.price = ticket.getPrice();
        this.type = ticket.getType();
    }
}
