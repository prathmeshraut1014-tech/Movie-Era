# MovieEra Backend

Spring Boot + MySQL + JWT Auth + Favorites API

## Requirements
- Java 17+
- Maven
- MySQL running on localhost:3306

## Setup
1. Edit `src/main/resources/application.properties`
   - Change `spring.datasource.password=yourpassword` to your MySQL password
2. Run:
   ```bash
   mvn spring-boot:run
   ```
Backend starts at http://localhost:8080
