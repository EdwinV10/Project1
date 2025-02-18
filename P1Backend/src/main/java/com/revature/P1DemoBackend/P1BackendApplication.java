package com.revature.P1DemoBackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("com.revature.models") //Tells spring to scan this package for DB entities
@ComponentScan("com.revature") //Tells spring to scan this package for beans
@EnableJpaRepositories("com.revature.DAOs") //Tells spring to scan this package for DAOs
public class P1BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(P1BackendApplication.class, args);
		System.out.println("Video Game Management App is running");
	}
}
