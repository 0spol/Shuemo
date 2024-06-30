FROM maven:3.9.7-eclipse-temurin-21 AS compiler

COPY shuemo/ .

RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jdk

WORKDIR /shuemo

COPY --from=compiler target/shuemo.jar shuemo/

EXPOSE 8080

CMD ["java", "-jar", "shuemo/shuemo.jar"]
