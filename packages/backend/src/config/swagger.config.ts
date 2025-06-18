import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from "@nestjs/swagger";
import { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import { envs } from "./envs";

export function configureSwagger(app: any): void {
  const config = new DocumentBuilder()
    .setTitle(swaggerConfig.swaggerConfig.title)
    .setDescription(swaggerConfig.swaggerConfig.description)
    .setVersion(envs.VERSION)
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const document = SwaggerModule.createDocument(app, config, options);

  SwaggerModule.setup(swaggerConfig.endpoint, app, document, {
    customSiteTitle: swaggerConfig.swaggerConfig.title,
  });

  // Deshabilitar CSP para Swagger UI
  app.use(
    swaggerConfig.endpoint,
    (req: Request, res: Response, next: NextFunction) => {
      helmet({
        contentSecurityPolicy: false,
      })(req, res, next);
    }
  );
}

export const swaggerConfig = {
  endpoint: `/${envs.API_PREFIX}/${envs.VERSION}/docs`,
  swaggerConfig: {
    title: "Mi Cuento Api Documentation",
    description:
      "This is the technical test of API documentation for Mi Cuento",
  },
} as const;
