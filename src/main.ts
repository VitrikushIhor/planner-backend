import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api");
  app.use(cookieParser());
  app.enableCors({
    origin: "*",
    credentials: true,
    exposedHeaders: "set-cookie",
  });

  const config = new DocumentBuilder()
    .setTitle("Planner Api")
    .setDescription("Created By Ihor Vitrikush")
    .setVersion("1.0")
    .addTag("Planner")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(5000);
}

bootstrap();
