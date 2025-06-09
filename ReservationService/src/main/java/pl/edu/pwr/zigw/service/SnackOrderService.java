package pl.edu.pwr.zigw.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.edu.pwr.zigw.domain.SnackOrderRequest;
import pl.edu.pwr.zigw.model.*;
import pl.edu.pwr.zigw.repostiory.*;


@Service
@RequiredArgsConstructor
public class SnackOrderService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final OrderProductRepository orderProductRepository;
    private final ReservationRepository reservationRepository;

    @Transactional
    public Long createSnackOrder(SnackOrderRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Reservation reservation =  reservationRepository.findById(request.getReservationId())
                .orElseThrow(() -> new RuntimeException("User not found"));;

        Order order = Order.builder()
                .user(user)
                .reservation(reservation)
                .build();

        orderRepository.save(order);

        for (SnackOrderRequest.Item item : request.getItems()) {
            Product product = productRepository.findById(item.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found: " + item.getProductId()));

            OrderProduct op = OrderProduct.builder()
                    .order(order)
                    .product(product)
                    .quantity(item.getQuantity())
                    .build();

            orderProductRepository.save(op);
        }

        return order.getId();
    }
}
