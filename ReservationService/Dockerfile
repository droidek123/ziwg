# 1. Budowanie aplikacji
FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /app
COPY . .
RUN mvn clean install -DskipTests

# 2. Uruchamianie aplikacji
FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY --from=builder /app/ReservationService/target/*.jar app.jar
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "app.jar"]