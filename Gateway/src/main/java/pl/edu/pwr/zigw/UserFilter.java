package pl.edu.pwr.zigw;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.GatewayFilterFactory;
import org.springframework.stereotype.Component;

@Component
public class UserFilter implements GatewayFilterFactory {

    @Override
    public Class getConfigClass() {
        return Object.class;
    }

    @Override
    public GatewayFilter apply(Object config) {
        return null;
    }
}
