# aromatele

Telegram-бот для автоматизації процесу прийому замовлень у мережі кав'ярень. Цей проєкт розроблений для спрощення взаємодії з клієнтами та підвищення ефективності обслуговування.

## Функціонал

- Прийом замовлень через Telegram.
- Інтерактивне меню для вибору страв та напоїв.
- Автоматизація процесу обробки замовлень.

## Встановлення та налаштування

### Крок 1: Клонування репозиторію

```bash
git clone https://github.com/RevolveStrm/aromatele.git
cd aromatele
```

### Крок 2: Встановлення залежностей

Переконайтеся, що у вас встановлений Node.js (версія 16.x або новіша).

```bash
npm install
```

### Крок 3: Налаштування середовища

1. Створіть файл `.env`, використовуючи шаблон `.env.example`.
2. Заповніть змінні середовища:
   - `BOT_TOKEN` — токен вашого Telegram-бота.
   - Інші змінні залежно від вашого середовища.

### Крок 4: Міграції бази даних

Цей проєкт використовує Prisma для управління базою даних.

```bash
npx prisma migrate dev
```

### Крок 5: Запуск бота

```bash
npm start
```

## Технології

- **Node.js** — серверна платформа для виконання JavaScript.
- **TypeScript** — мова програмування для статичної типізації.
- **Prisma** — ORM для взаємодії з базою даних.
- **Telegram Bot API** — API для створення Telegram-ботів.

## Структура проєкту

```
├── src/                # Основний код бота
│   ├── commands/       # Команди Telegram-бота
│   ├── handlers/       # Обробники подій
│   ├── utils/          # Утилітарні функції
├── prisma/             # Конфігурації бази даних
├── public/             # Статичні файли
├── .env.example        # Приклад налаштувань середовища
├── package.json        # Опис залежностей проєкту
```

## Підтримка

Якщо у вас виникли запитання або проблеми, будь ласка, створіть [issue](https://github.com/RevolveStrm/aromatele/issues) у цьому репозиторії.

## Ліцензія

Цей проєкт ліцензовано під [MIT License](LICENSE).
