# NestJS Microservice (NATS)

## Overview
Repo นี้เป็นตัวอย่าง NestJS microservices ที่สื่อสารกันผ่าน NATS โดยมี API Gateway เป็นจุดเข้า HTTP

## Services
- `api-gateway` HTTP gateway + Swagger, ฟังที่ `3000`
- `auth-service` NATS microservice สำหรับ `auth.login` และ `auth.health`
- `user-service` NATS microservice สำหรับ `user.getProfile` และ `user.health`
- `nats` message broker ที่ `4222` และ monitoring ที่ `8222`

## Requirements
- Node.js 20+ และ npm
- Docker และ Docker Compose (แนะนำ)

## Quick Start (Docker Compose)
```bash
docker compose -f infra/docker-compose.yml up --build
```

หยุดระบบ:
```bash
docker compose -f infra/docker-compose.yml down
```

## Local Dev (ไม่ใช้ Docker สำหรับบริการ)
เริ่ม NATS:
```bash
docker run --rm -p 4222:4222 -p 8222:8222 nats:2.10 -js -m 8222
```

จากนั้นเปิดเทอร์มินัลแยกสำหรับแต่ละบริการ:
```bash
cd api-gateway
npm install
npm run start:dev
```

```bash
cd auth-service
npm install
npm run start:dev
```

```bash
cd user-service
npm install
npm run start:dev
```

## Environment Variables
- `NATS_URL` (ทุกบริการ) ค่าเริ่มต้น `nats://localhost:4222`
- `PORT` (เฉพาะ `api-gateway`) ค่าเริ่มต้น `3000`

มีไฟล์ตัวอย่าง `api-gateway/.env.local` ที่ตั้งค่าไว้แล้ว

## HTTP API (ผ่าน API Gateway)
Base URL: `http://localhost:3000`

- `POST /auth-http/login`
  - body: `{"email":"user@example.com","password":"P@ssw0rd!"}`
- `POST /auth-http/health`
- `GET /user-http/:id`
- `POST /user-http/health`

Swagger UI: `http://localhost:3000/document`

## RPC Response Format
```json
{ "ok": true, "data": { } }
```

```json
{ "ok": false, "error": { "code": "VALIDATION", "message": "..." } }
```
