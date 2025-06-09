# ziwg
Student project for a class on the use of IT in the business

### Szybki opis (Potem się to trochę zmieni)

- cały projekt można zbudować mavenem
```
mvn clean install
```

Web - ogl frontend wygenreowany przez react'a
- Odpala się w ten sposób (powinno się uruchomić an porcie 3000): 
```
cd /web or cd ./web
npm start
```
- jakby coś nie działało 
```
npm i
```

- ReservationService \- serwis do obsługi filmów i ich rezerwacji (działa na porcie 8081, ale można sie do niego dostać również przez port gate-way\`a czyli 8080)
- UserService \- serwis do obsługi użytkowników (działa na porcie 8082, ale można sie do niego dostać również przez port gate-way\`a czyli 8080)

- jak by ktoś chciał uruchomić to inaczej niż z ide to:
```
mvn clean spring-boot:run
```

swagger dla serwisu znajduje się pod takim adresem
```
http://localhost:{numer-portu}/swagger-ui/index.html
```

Uruchamianie bazy danych (tymczasowo)

```
docker-compose up -d
```