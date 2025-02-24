<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# Todo-List

1. DB 설치 및 구조 생각 (mysql)
mysql DB version : 8.0.41.0
root / vkvkdltm
database : gateway

  1) 전문명 테이블 생성                                   ok
  2) 전문통신에 필요한 요청 응답값 구조 테이블 생성         ok

2. 서버와 DB 연동                                        no
  1) 전문명 조회하고 확인된 전문명만 gateway 가능           ok
  2) 확인이 된 전문명이지만, 요청값이 table에 저장된 값과 구조가 다르면 탈락    ok
  3) 응답값이 table에 저장된 값과 구조가 다르면 탈락        no

3. 안정적인 이중화 서버 구조 생각                         해야함
  1) DB 이중화?
  2) 서버 이중화?
  3) 무중단 서비스 (업데이트가 필요할 때에도 중단되면 안됨)
  4) 많은 요청 감당 가능한지?

4. 웹 개발
  1) 전문 등록
  2) 로그 확인 (전문에 대한 로그 확인 가능)
  3) 등 등


## Gateway Table 구조
#### 1. 테이블 개요

| 테이블명 | 설명 |
|-------------|---------|
| `messages` | 전문(메시지) 정의 테이블 |
| `message_request_param` | 각 전문의 요청 파라미터 목록 |
| `message_response_param` | 각 전문의 응답 파라미터 목록 |

---

#### 2. 테이블 상세 구조

##### 1️⃣ `messages` (전문 정의 테이블)
각 전문(메시지)에 대한 기본 정보 저장

| Column Name  | Type | Description |
|-------------|------|-------------|
| `message_id` | INT AUTO_INCREMENT PRIMARY KEY | Unique identifier for each message |
| `message_name` | VARCHAR(255) NOT NULL | 전문명 |
| `ip` | VARCHAR(45) NOT NULL | IP address |
| `port` | INT NOT NULL | Port |
| `path` | VARCHAR(255) NOT NULL | API endpoint or network path |
| `protocol` | ENUM('HTTP', 'HTTPS', 'TCP', 'UDP') NOT NULL | 규격 |
| `method` | ENUM('GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS', 'CONNECT', 'SEND', 'RECEIVE', 'REQUEST', 'RESPONSE', 'SUBSCRIBE', 'PUBLISH') NOT NULL | Request method type |
| `timestamp` | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | 생성시간 |
| `unique_message` | UNIQUE KEY (`message_name`, `ip`, `port`, `path`, `protocol`, `method`) | Ensures uniqueness for message definition |


---

##### 2️⃣ `message_request_param` (요청 파라미터 테이블) -> 수정 필요 (다양한 전문들의 파라미터와 구조를 미리 세팅할 수 있는 방법 생각해야함)
각 전문이 요구하는 요청 파라미터 목록 저장

| 컬럼명 | 타입 | 설명 |
|------------------|-------------------------------------------|-------------|
| `message_name`   | VARCHAR(255)                              | Message name ID (References `messages.message_name`) |
| `parameter_format` | ENUM('JSON', 'TEXT') NOT NULL           | Format of the request parameter (JSON or TEXT) |
| `parameter_schema` | JSON                                     | JSON schema defining the request parameters (NULL if `TEXT`) |
| `created_at`      | TIMESTAMP DEFAULT CURRENT_TIMESTAMP      | Timestamp of when the record was created |


---

##### 3️⃣ `message_response_param` (응답 파라미터 테이블) -> 수정 필요 (다양한 전문들의 파라미터와 구조를 미리 세팅할 수 있는 방법 생각해야함)
정상적인 응답을 판단하기 위한 기준 값 저장

| 컬럼명 | 타입 | 설명 |
|--------|------|------|
| `id` | BIGINT (PK) | 응답 파라미터 ID |
| `message_id` | BIGINT (FK) | 연결된 전문 ID (`messages.id`) |
| `param_name` | VARCHAR(255) | 응답 파라미터 이름 (예: `status`) |
| `param_type` | ENUM('STRING', 'NUMBER', 'BOOLEAN', 'JSON') | 응답 값 타입 |
| `expected_value` | TEXT | 기대되는 값 (NULL이면 비교 제외) |
| **Foreign Key** | `message_id → messages(id)` | 해당 전문 삭제 시 함께 삭제 (`ON DELETE CASCADE`) |

---
