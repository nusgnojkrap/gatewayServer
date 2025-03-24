  <p align="center">This project is built using <a href="https://nestjs.com/" target="_blank">NestJS</a> <p align="center">


# 🚀 Gateway Middleware Server

![NestJS](https://img.shields.io/badge/NestJS-8E2DE2?style=for-the-badge&logo=nestjs&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

> **NestJS 기반 고성능 게이트웨이 서버**  
> 전문 파라미터 관리 및 요청/응답 검증 기능을 제공하는 중개 서버입니다.

---

## 📌 Features
- 📡 **JSON 기반 전문 파라미터 관리** (MySQL 저장)
- 🔒 **요청 검증 및 필터링** (데이터 무결성 보장)
- 🚀 **고성능 최적화** (MQ, 캐싱, gRPC, 로드 밸런서 고려) -> 개발 예정
- ⚡ **확장 가능한 마이크로서비스 아키텍처 지원**          -> 개발 예정
- 📊 **실시간 모니터링 및 로깅 시스템 연동 가능**          -> 개발 예정

---

## 🏗️ Architecture
- 클라이언트 요청을 중개하여 백엔드 마이크로서비스 또는 외부 API와 연동합니다.
- 전문(JSON) 구조 기반으로 요청을 관리하고 유효성 검증을 수행합니다.
- **캐싱, MQ, 로드 밸런서**를 활용하여 최적화할 수 있습니다.


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
## Stay in touch

- developer - [Jongsun Park](ahrl1994@gmail.com)

# Todo-List

1. DB 설치 및 구조 생각 (mysql)
mysql DB version : 8.0.41.0
root / vkvkdltm
database : gateway

  1) 전문명 테이블 생성                                   ok
  2) 전문통신에 필요한 요청 응답값 구조 테이블 생성         ok
  3) 전문 테이블에 캐시 사용 여부 컬럼 추가                ok
  4) 전문 테이블에 캐시 사용 시 초기화 주기 시간 추가       ok
  

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

5. 성능 개선
  1) redis 캐싱 사용  -> 개발 완료
  2) 로드 밸런서 적용  -> 개발 예정
  3) 비동기 처리(MQ)   -> 개발 예정
  4) gRPC             -> 미정
  5) 서버리스 아키텍처 -> 미정

6. 보안 및 취약점
  1) 재귀 형식의 공격 차단
  2) ip, port 등 header 부분 체크

## Gateway 연동 규격
path : http://10.10.10.181:3000/gateway/
method : http / POST
example : 
{
    "header":{
        "messageName":"00A001",   // 전문명명
        "protocol":"HTTP",        // 규격
        "method":"GET",           // 메소드
        "ip":"127.0.0.1",         // IP
        "port":"3000",            // 포트
        "path":"/list"            // 경로
    },
    "body":{
      // json 형태의 데이터 (DB에 등록된 형태)
    }
}



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
