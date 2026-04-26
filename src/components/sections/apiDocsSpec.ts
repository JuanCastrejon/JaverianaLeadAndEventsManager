const JSON_MEDIA_TYPE = 'application/json';

function createJsonResponse(description: string, schema: object, example: unknown) {
  return {
    description,
    content: {
      [JSON_MEDIA_TYPE]: {
        schema,
        example,
      },
    },
  };
}

export function buildApiDocsSpec(baseUrl: string) {
  return {
    openapi: '3.0.3',
    info: {
      title: 'Javeriana Lead & Events API',
      version: '1.0.0',
      description:
        'Documentación de la API REST que consume el frontend para programas, eventos y leads. '
        + 'La información se organiza por dominio, con esquemas reutilizables y responses comunes para '
        + 'evitar duplicación y mantener la spec legible.',
    },
    servers: [
      {
        url: `${baseUrl}/rest/v1`,
        description: 'Supabase REST endpoint',
      },
    ],
    tags: [
      {
        name: 'Programas',
        description: 'Consulta de programas académicos',
      },
      {
        name: 'Eventos',
        description: 'Consulta de eventos institucionales',
      },
      {
        name: 'Leads',
        description: 'Registro de leads',
      },
    ],
    components: {
      securitySchemes: {
        apikeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'apikey',
        },
      },
      parameters: {
        SelectFields: {
          name: 'select',
          in: 'query',
          description:
            'Columnas a retornar. Usa `*` para todos los campos o una lista separada por comas para reducir el payload.',
          schema: {
            type: 'string',
            default: '*',
          },
          example: 'id,name,category',
        },
        OrderBy: {
          name: 'order',
          in: 'query',
          description:
            'Orden de resultados con el formato `campo.direccion`, por ejemplo `name.asc` o `start_date.desc`.',
          schema: {
            type: 'string',
          },
          example: 'name.asc',
        },
        LimitRows: {
          name: 'limit',
          in: 'query',
          description: 'Cantidad máxima de registros a retornar.',
          schema: {
            type: 'integer',
            minimum: 1,
            default: 10,
          },
          example: 5,
        },
      },
      schemas: {
        Program: {
          type: 'object',
          required: [
            'id',
            'name',
            'description',
            'category',
            'faculty',
            'duration',
            'modality',
            'credits',
            'image_url',
            'created_at',
            'updated_at',
          ],
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            description: { type: 'string' },
            category: {
              type: 'string',
              enum: ['Pregrado', 'Posgrado', 'Educación Continua'],
            },
            faculty: { type: 'string' },
            duration: { type: 'string' },
            modality: {
              type: 'string',
              enum: ['Presencial', 'Virtual', 'Híbrido'],
            },
            credits: {
              type: 'integer',
              nullable: true,
              minimum: 0,
            },
            image_url: {
              type: 'string',
              format: 'uri',
              nullable: true,
            },
            created_at: {
              type: 'string',
              format: 'date-time',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        EventItem: {
          type: 'object',
          required: [
            'id',
            'name',
            'description',
            'category',
            'source',
            'event_code',
            'organizer',
            'location',
            'start_date',
            'end_date',
            'registration_end_date',
            'url',
            'image_url',
            'created_at',
            'updated_at',
          ],
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            description: { type: 'string' },
            category: {
              type: 'string',
              enum: ['Académico', 'Pastoral', 'Cultural', 'Bienestar', 'Institucional'],
            },
            source: {
              type: 'string',
              enum: ['Hoy en la Javeriana', 'Medio Universitario'],
            },
            event_code: {
              type: 'string',
              nullable: true,
            },
            organizer: {
              type: 'string',
              nullable: true,
            },
            location: {
              type: 'string',
              nullable: true,
            },
            start_date: {
              type: 'string',
              format: 'date-time',
            },
            end_date: {
              type: 'string',
              format: 'date-time',
              nullable: true,
            },
            registration_end_date: {
              type: 'string',
              format: 'date-time',
              nullable: true,
            },
            url: {
              type: 'string',
              format: 'uri',
              nullable: true,
            },
            image_url: {
              type: 'string',
              format: 'uri',
              nullable: true,
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              nullable: true,
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              nullable: true,
            },
          },
        },
        Lead: {
          type: 'object',
          required: [
            'id',
            'first_name',
            'last_name',
            'email',
            'phone',
            'program_id',
            'created_at',
            'updated_at',
          ],
          properties: {
            id: { type: 'string', format: 'uuid' },
            first_name: { type: 'string' },
            last_name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            phone: {
              type: 'string',
              nullable: true,
            },
            program_id: { type: 'string', format: 'uuid' },
            created_at: {
              type: 'string',
              format: 'date-time',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        LeadInsert: {
          type: 'object',
          required: ['first_name', 'last_name', 'email', 'program_id'],
          properties: {
            first_name: { type: 'string', minLength: 1 },
            last_name: { type: 'string', minLength: 1 },
            email: { type: 'string', format: 'email' },
            phone: {
              type: 'string',
              nullable: true,
              description: 'Opcional. Se almacena vacío como null.',
            },
            program_id: { type: 'string', format: 'uuid' },
          },
        },
        ApiError: {
          type: 'object',
          required: ['message'],
          properties: {
            message: { type: 'string' },
            details: {
              type: 'string',
              nullable: true,
            },
            hint: {
              type: 'string',
              nullable: true,
            },
            code: {
              type: 'string',
              nullable: true,
            },
          },
        },
      },
      responses: {
        ProgramsOk: createJsonResponse(
          'Lista de programas retornada correctamente.',
          {
            type: 'array',
            items: { $ref: '#/components/schemas/Program' },
          },
          [
            {
              id: '9ddf6c6c-4b8b-4e56-8f4e-8e2b4b5f1c01',
              name: 'Ingeniería de Sistemas',
              description: 'Programa de pregrado enfocado en software, datos e integración tecnológica.',
              category: 'Pregrado',
              faculty: 'Ingeniería',
              duration: '10 semestres',
              modality: 'Presencial',
              credits: 160,
              image_url: null,
              created_at: '2026-01-15T15:30:00.000Z',
              updated_at: '2026-03-10T10:00:00.000Z',
            },
          ],
        ),
        EventsOk: createJsonResponse(
          'Lista de eventos retornada correctamente.',
          {
            type: 'array',
            items: { $ref: '#/components/schemas/EventItem' },
          },
          [
            {
              id: 'f2d5af61-0e44-4ad0-b7b7-7f9b9a4f2e10',
              name: 'Feria de Posgrados',
              description: 'Encuentro informativo para aspirantes a programas de posgrado.',
              category: 'Institucional',
              source: 'Hoy en la Javeriana',
              event_code: 'FER-2026-01',
              organizer: 'Admisiones',
              location: 'Auditorio Principal',
              start_date: '2026-05-04T14:00:00.000Z',
              end_date: '2026-05-04T17:00:00.000Z',
              registration_end_date: '2026-05-03T23:59:59.000Z',
              url: null,
              image_url: null,
              created_at: '2026-04-10T12:00:00.000Z',
              updated_at: '2026-04-15T08:20:00.000Z',
            },
          ],
        ),
        LeadCreated: createJsonResponse(
          'Lead creado correctamente.',
          { $ref: '#/components/schemas/Lead' },
          {
            id: '3c2d37e2-6b47-4ef8-8f4a-1c9d7e3b1a11',
            first_name: 'Juan',
            last_name: 'Pérez',
            email: 'juan@javeriana.edu.co',
            phone: null,
            program_id: '9ddf6c6c-4b8b-4e56-8f4e-8e2b4b5f1c01',
            created_at: '2026-04-26T17:24:00.000Z',
            updated_at: '2026-04-26T17:24:00.000Z',
          },
        ),
        BadRequest: createJsonResponse(
          'La solicitud no es válida.',
          { $ref: '#/components/schemas/ApiError' },
          {
            message: 'La solicitud no es válida.',
            details: 'Verifica los parámetros enviados y vuelve a intentar.',
            hint: null,
            code: '400',
          },
        ),
        Unauthorized: createJsonResponse(
          'Falta autenticación o la clave es inválida.',
          { $ref: '#/components/schemas/ApiError' },
          {
            message: 'Unauthorized',
            details: 'La clave API no está presente o es inválida.',
            hint: null,
            code: '401',
          },
        ),
        Forbidden: createJsonResponse(
          'La política de seguridad bloqueó la operación.',
          { $ref: '#/components/schemas/ApiError' },
          {
            message: 'Forbidden',
            details: 'La operación no cumple con la policy activa de RLS.',
            hint: null,
            code: '403',
          },
        ),
        ServerError: createJsonResponse(
          'Error inesperado del servidor.',
          { $ref: '#/components/schemas/ApiError' },
          {
            message: 'Internal server error',
            details: 'Se produjo un error interno al procesar la solicitud.',
            hint: null,
            code: '500',
          },
        ),
      },
    },
    security: [{ apikeyAuth: [] }],
    paths: {
      '/programs': {
        get: {
          tags: ['Programas'],
          summary: 'Listar programas académicos',
          description:
            'Devuelve los programas disponibles para el frontend. '
            + 'Se documentan solo las respuestas relevantes para consumo público y las opciones de consulta más usadas.',
          parameters: [
            { $ref: '#/components/parameters/SelectFields' },
            { $ref: '#/components/parameters/OrderBy' },
            { $ref: '#/components/parameters/LimitRows' },
          ],
          responses: {
            200: { $ref: '#/components/responses/ProgramsOk' },
            400: { $ref: '#/components/responses/BadRequest' },
            401: { $ref: '#/components/responses/Unauthorized' },
            403: { $ref: '#/components/responses/Forbidden' },
            500: { $ref: '#/components/responses/ServerError' },
          },
        },
      },
      '/javeriana_events': {
        get: {
          tags: ['Eventos'],
          summary: 'Listar eventos',
          description:
            'Devuelve eventos institucionales ordenados por fecha. '
            + 'La documentación mantiene el payload liviano y reutiliza parámetros comunes.',
          parameters: [
            { $ref: '#/components/parameters/SelectFields' },
            { $ref: '#/components/parameters/OrderBy' },
            { $ref: '#/components/parameters/LimitRows' },
          ],
          responses: {
            200: { $ref: '#/components/responses/EventsOk' },
            400: { $ref: '#/components/responses/BadRequest' },
            401: { $ref: '#/components/responses/Unauthorized' },
            403: { $ref: '#/components/responses/Forbidden' },
            500: { $ref: '#/components/responses/ServerError' },
          },
        },
      },
      '/leads': {
        post: {
          tags: ['Leads'],
          summary: 'Registrar lead',
          description:
            'Crea un lead nuevo con la información del formulario. '
            + 'Incluye el body de entrada y los estados principales que el frontend debe contemplar.',
          requestBody: {
            required: true,
            content: {
              [JSON_MEDIA_TYPE]: {
                schema: { $ref: '#/components/schemas/LeadInsert' },
                example: {
                  first_name: 'Juan',
                  last_name: 'Pérez',
                  email: 'juan@javeriana.edu.co',
                  phone: null,
                  program_id: '9ddf6c6c-4b8b-4e56-8f4e-8e2b4b5f1c01',
                },
              },
            },
          },
          responses: {
            201: { $ref: '#/components/responses/LeadCreated' },
            400: { $ref: '#/components/responses/BadRequest' },
            401: { $ref: '#/components/responses/Unauthorized' },
            403: { $ref: '#/components/responses/Forbidden' },
            500: { $ref: '#/components/responses/ServerError' },
          },
        },
      },
    },
  };
}
