FROM node:16-alpine as development

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install --only=development --legacy-peer-deps

COPY . .

RUN npm run build

FROM node:16 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production --legacy-peer-deps

COPY . .

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 8000

CMD ["node", "dist/main"]

FROM postgres:14 as db

# .env 파일의 변수를 Dockerfile 내에서 사용하기 위해 ARG로 정의
ARG DATABASE_PASSWORD
ARG DATABASE_USERNAME
ARG DATABASE_DATABASE
ARG DATABASE_HOST

# 환경 변수 설정
ENV DATABASE_HOST=${DATABASE_HOST}
ENV POSTGRES_PASSWORD=${DATABASE_PASSWORD}
ENV POSTGRES_USER=${DATABASE_USERNAME}
ENV POSTGRES_DB=${DATABASE_DATABASE}

# 초기 스키마 파일 복사
COPY init.sql /docker-entrypoint-initdb.d/

# 포트 설정 (선택적)
EXPOSE 5432