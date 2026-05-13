# backend

## 0.4.0

### Minor Changes

- fc45cc9: feat(74): add decorator IsValidImage in fileBase64 in upload.dto.ts
- 6b5a573: feat(37): create routes crud for s3 in s3.controller.ts
- 8c7ff67: feat(64): create methods in s3.service.ts for download and deletes files
- 8c7ff67: feat(64): add service methods for s3.controller.ts
- 60d990e: feat(36): create sintax simple for s3.module.ts, s3.service.ts and s3.controller.ts files for module s3
- c2f6017: feat(46): add ValidatePipe on login route in auth.controller.ts
- c2f6017: feat(46): create pipe ValidatePipe in shared/pipes/validate.pipes.ts
- 63929d8: feat(39): create methods assists and for upload file in s3 en s3.service.ts

### Patch Changes

- 60d990e: chore(38): add new env S3_URL em .env.example and env.config.ts
- fc45cc9: feat(74): create decorator for dto to upload in s3 is-valid-file-image.decorator.ts
- 63929d8: chore(39): create type error for s3 in leopple.types.ts
- 63929d8: chore(63): update upload.dto.ts with news fields for generate bucket with id, firstName and lastName
- e36f9a8: chore(33): add lib @aws-sdk/client-s3 in package.json for module s3
- 2484ae7: test(55): create unit test s3.service.spec.ts
- c2f6017: chore(46): remove User.dto.ts because Omitype from swagger is incompatible with class-validator and pipes
- 62cc8a8: feat(52): add authorization in swagger doc in main.ts
- 6b5a573: feat(47): create dto for controller upload.dto.ts and manageFileS3.ts
- 62cc8a8: fix(52): fix regex in password validation in login.dto.ts and register.dto.ts
- 2484ae7: test(55): create mock for tests in s3.service.spec.ts called s3.mock.ts
- 62cc8a8: fix(52): add validation guards in controller auth profile in auth.controller.ts
- 8c7ff67: chore(64): update manageFileS3.dto.ts with news fields for create bucket with id, firstName and lastName
- c2f6017: feat(46): add news attributtes in Login.dto.ts and Register.dto.ts
- fc45cc9: chore(74): create constant with image types in mime-types.constant.ts

## 0.3.0

### Minor Changes

- 9c6bc2c: feat(66): create new module for authentication in auth.controller.ts, auth.module.ts and auth.service.ts

### Patch Changes

- 9c6bc2c: feat(66): create dtos for login.dto.ts, register.dto.ts and user.dto.ts
- 9c6bc2c: chore(68): add new libs @nestjs/jwt, @nestjs/passport, bcrypt, class-transformer, class-validator and @nestjs/mapped-types
- 9c6bc2c: chore(66): update path of entities in postgre.provider.ts
- f4601ff: test(69): create unit tests for users module in users.service.spec.ts
- 9c6bc2c: feat(68): create module users.module.ts, users.service.ts, users.controller.ts and users.entity.ts
- 149c268: docs(60): add swagger for documentation api, add in user.dto.ts and auth.service.ts
- f4601ff: test(69): create unit tests for auth in auth.controller.spec.ts and auth.service.spec.ts
- f4601ff: test(69): create mocks in shared/mocks in auth.mock.ts and repository.mock.ts

## 0.2.2

### Patch Changes

- 6ccca96: feat(63): create migration 1773758850590-create-table-cities.ts
- 6ccca96: feat(63): add states.json and cities.json
- 2b946f8: feat(64): create migration 1773761530891-create-table-users-games.ts
- fa7c6bd: feat(50): create migration 1773760857257-create-table-users.ts
- 6ccca96: feat(63); create migration 1773711408915-create-table-states.ts

## 0.2.1

### Patch Changes

- chore(55): create custom exception called LeoppleErrorLogger in shared/exceptions/leopple.error.ts

## 0.2.0

### Minor Changes

- d817fd0: feat(47): create database.module.ts for export databases
- d817fd0: feat(47): create connection with PostgreSQL in module postgre.module.ts
- 5f78674: feat(37): create provider redis.provider.ts and add in redis.module.ts and import in database.module.ts

### Patch Changes

- d817fd0: chore(47): create folder config with env.config.ts and env.interface.ts
- d817fd0: chore(47): add dotenv and create .env and .env.example
- 13956f8: chore(56): pass connection with postgresql for postgre.provide.ts
- 5f78674: feat(37): add news envs for redis in .env.example

## 0.1.3

### Patch Changes

- b1efb10: chore(42): update eslint for all apps

## 0.1.2

### Patch Changes

- 3d4dc93: chore(41): create Dockerfile and new command for docker:dev
- 6b1b0fc: chore(39): add command check-types for all apps and fix problems

## 0.1.1

### Patch Changes

- chore(39): import base configurantions typescript in /packages

## 0.1.0

### Minor Changes

- 44c9f50: feat(34): add new app call backend for leopple games
