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

- Импорты через алиас `@` → `src`: `import App from '@/App'`
- Цвета — в CSS-переменных `src/assets/variables.css`
- Шрифт Manrope подключён локально в `src/assets/fonts/`

