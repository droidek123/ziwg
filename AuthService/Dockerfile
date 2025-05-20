FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY target/*.jar app.jar
#EXPOSE ???
ENTRYPOINT ["java","-jar","/app/app.jar"]