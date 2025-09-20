FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

# Copy pom.xml and src from correct folder
COPY gameapp/pom.xml .
RUN mvn dependency:go-offline

COPY gamingapp/src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 9001
ENTRYPOINT ["java","-jar","app.jar"]
