package by.dytni.finalshop.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration //создавать и конфигурировать бины (объекты)
public class OpenAPIConfig {

    @Bean //методдолжен создать и зарегистрировать бин в контексте приложения
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Магазин одежды OpenAPI спецификация")
                        .version("0.0.1"));
    }
}
