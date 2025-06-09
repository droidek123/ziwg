package pl.edu.pwr.zigw.domain;


import lombok.Data;

import java.util.List;

@Data
public class SnackOrderRequest {
    private Long userId;  // może do wywalenia
    private Long reservationId;
    private List<Item> items;

    @Data
    public static class Item {
        private Long productId;
        private Long quantity;
    }
}
