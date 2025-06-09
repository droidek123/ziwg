package pl.edu.pwr.zigw.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.pwr.zigw.domain.SnackOrderRequest;
import pl.edu.pwr.zigw.service.SnackOrderService;

@RestController
@RequestMapping("/snacks")
@RequiredArgsConstructor
public class SnackController {

    private final SnackOrderService snackOrderService;

    @PostMapping("/order")
    public ResponseEntity<Long> orderSnacks(@RequestBody SnackOrderRequest request) {
        Long orderId = snackOrderService.createSnackOrder(request);
        return ResponseEntity.ok(orderId);
    }
}
