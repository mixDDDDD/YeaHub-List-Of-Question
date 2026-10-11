# YeaHub — Список вопросов

Публичная страница со списком вопросов (учебный проект, вёрстка по макету Figma).

## Стек

- React 19 + TypeScript
- Vite 8
- ESLint

## Запуск

```bash
npm install
npm run dev   # http://localhost:3000
```

## Скрипты

- `npm run dev` — дев-сервер (порт 3000)
- `npm run build` — проверка типов + production-сборка
- `npm run preview` — просмотр собранного билда
- `npm run lint` — проверка кода ESLint

## Соглашения

Запросы к API идут через `/api`. В dev-сервере и `npm run preview` Vite
перенаправляет их на `https://api.yeahub.ru`. При публикации статической сборки
на хостинге нужно настроить такое же перенаправление `/api/*` на API YeaHub,
удаляя префикс `/api` из пути.

- Импорты через алиас `@` → `src`: `import App from '@/App'`
- Цвета — в CSS-переменных `src/assets/variables.css`
- Шрифт Manrope подключён локально в `src/assets/fonts/`

