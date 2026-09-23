# MovieEra Backend

Spring Boot + MySQL + JWT Auth + Favorites API

## Requirements
- Java 17+
- Maven
- MySQL running on localhost:3306

## Setup
1. Set your local MySQL credentials. In PowerShell:
   ```powershell
   $env:DB_USERNAME="root"
   $env:DB_PASSWORD="yKZoYIjNsWWzMyfAdGhnPTQhGuDwDNnK"
   ```
   The default database URL is `jdbc:mysql://root:yKZoYIjNsWWzMyfAdGhnPTQhGuDwDNnK@mysql.railway.internal:3306/railway`. Override it with `DB_URL` when needed.
2. Run:
   ```bash
   mvn spring-boot:run
   ```
Backend starts at http://localhost:8080
