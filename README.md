## Менеджер товаров

Приложение для управления товарами: список, детали, сортировка, создание, редактирование и удаление. Поддерживает два режима разработки (API/моки) и единый прод-запуск, где бэкенд раздаёт собранный фронтенд на одном порту.

### Возможности
- Просмотр и сортировка списка товаров
- Просмотр деталей товара
- Создание, редактирование, удаление
- Загрузка категорий
- Индикация загрузки/ошибок
- Переключение источника данных: реальный API или моки

## Технологии
- Frontend: React 19, Vite 7, TypeScript, Redux Toolkit, React-Redux, ESLint
- Backend: Node.js, Express 5, TypeScript
- Dev tooling: cross-env, concurrently

## Быстрый старт
- Установка: `npm i` в `frontend` и `backend`
- Dev с API: `cd frontend && npm run dev:api`
- Dev с моками: `cd frontend && npm run dev:mock`
- Prod: `cd frontend && npm run prod`
- Открыть: `http://localhost:3001`

## Структура проекта
```
frontend/
src/app/store — стор
src/features/product/ — фича товаров
model/ — types, productsApi, productsThunks, slice, mocks
ui/ — ProductList, ProductCard, ProductDetail, ProductForm, productSort
src/shared/ — общие компоненты, хуки
backend/
src/server.ts — REST API + раздача статики фронта в проде
```

## API
Эндпоинты:
- GET `/api/products` — список товаров
- GET `/api/products/categories` — список категорий
- GET `/api/products/:id` — получение товара
- POST `/api/products` — создание товара
- PUT `/api/products/:id` — обновление товара
- DELETE `/api/products/:id` — удаление товара

## Установка
Выполните установку зависимостей отдельно для фронта и бэка:
```bash
# frontend
npm i

# backend
npm i
```
Node.js: рекомендуется LTS (≥ 18).

## Режимы и команды

### Разработка
Запускать команды из папки `frontend`.

- С реальным API (два процесса, HMR для фронта):
```bash
npm run dev:api
# Frontend: http://localhost:5173
# Backend (API): http://localhost:3001
```

- С моками (без бэкенда):
```bash
npm run dev:mock
# Frontend: http://localhost:5173
```

Переменная: `VITE_USE_API_IN_DEV`
- `true` — брать данные с API (dev:api)
- `false` — моки (dev:mock)
Настройка выполняется через `cross-env` в скриптах — ничего дополнительно менять не нужно.

### Продакшн
Одна команда соберёт фронт и бэк и запустит сервер, который раздаёт фронт и API на одном порту.

Запуск (из `frontend`):
```bash
npm run prod
```

После старта:
- Откройте: `http://localhost:3001`
- API: `http://localhost:3001/api`

Переменная порта:
- По умолчанию `3001`, можно переопределить `PORT` в окружении при старте.

## Скрипты (frontend/package.json)
- `dev:api` — запустить бэк и фронтенд (HMR)
- `dev:mock` — фронтенд с моковыми данными
- `backend:dev` — запустить дев-сервер бэка
- `backend:build` — собрать бэк
- `build` — собрать фронт
- `build:prod` — собрать бэк и фронт
- `start:prod` — запустить собранный бэк, который раздаёт фронт
- `prod` — собрать бэк+фронт и запустить (рекомендуемый прод-скрипт)

## Конфигурация фронта
- В проде фронт ходит к API по `'/api'`.
- В деве (при `dev:api`) — к `http://localhost:3001/api`.
- В мок-режиме бэкенд не требуется.

## Ограничения
- Данные бэка — в памяти (после перезагрузки данные сбрасываются).


