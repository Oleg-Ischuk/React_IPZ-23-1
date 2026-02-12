# React IPZ Project

Короткий опис

Навчальний проект на React для предмету КОП. Містить реалізацію гри чотири в ряд(Connect-four), UI-компоненти та інструменти для документації й тестування компонентів.

Автор

Project Oleg-Ischuk <olegischuk594@gmail.com>

Ліцензія

Проєкт розповсюджується під ліцензією MIT — див. файл [LICENSE](LICENSE).

Також у корені проєкту згенеровано звіт по ліцензіях залежностей `license-report.md`.

Політика конфіденційності

- Політика: [PRIVACY_POLICY.md](PRIVACY_POLICY.md)

Вимоги

- Node.js 18+ та npm

Встановлення

```bash
npm install
```

Основні команди

- `npm run dev` — запуск застосунку в режимі розробки (Vite)
- `npm run build` — збірка для продакшену
- `npm run preview` — локальний перегляд збірки
- `npm run lint` — перевірка коду ESLint
-- `npm run license-check` — згенерувати `license-report.csv` (використовує `license-checker`). Після генерації я створюю `license-report.md` з людино-зрозумілим форматом.
- `npm run docs` — згенерувати документацію JSDoc (вивід у `out/docs`)
- `npm run storybook` — запустити Storybook (після встановлення залежностей Storybook)
- `npm run build-storybook` — побудувати Storybook статично

Storybook

У проєкт додано базову конфігурацію Storybook у папці `.storybook` і історії для компонентів `Button` та `Modal` у `src/components/*/*.stories.jsx`.

Перед запуском Storybook встановіть dev-залежності:

```bash
npm install --save-dev @storybook/react-vite @storybook/addon-essentials
```

Запуск:

```bash
npm run storybook
```

Документація

Конфігурація JSDoc знаходиться в `jsdoc.json`. За замовчуванням документація генерується в `out/docs` командою:

```bash
npm run docs
```

Додати відео в локальну документацію

Якщо немає публічного хостингу для відео — помістіть файл `demo.mp4` у `docs/media/` і вставте його в `docs/VIDEO.md` згідно інструкції.

Cookie / GDPR

Додано компонент cookie-попап: `src/components/CookieConsent/CookieConsent.jsx`. За замовчуванням вибір зберігається в `localStorage`. Оновіть `PRIVACY_POLICY.md` та поведінку компонента при додаванні аналітики.

Звіт по ліцензіях

Команда `npm run license-check` створює `license-report.csv` з інформацією про ліцензії залежностей. Перевірте наявність несумісних ліцензій і за потреби замініть пакети.

Контакти та внесок

Якщо хочете додати зміни або оновити автора — змініть секцію `Author` вище та відкрийте PR.

Contributing

1. Форкніть репозиторій
2. Створіть гілку `feature/your-feature`
3. Внесіть зміни і додайте тести/історії
4. Відкрийте pull request

Додатково

- Документи та плейсхолдери медіа: `docs/VIDEO.md`, `docs/media/README.txt`.
- Згенерована документація JSDoc доступна у `out/docs`.

Потрібно, щоб я зараз встановив і запустив Storybook локально або запушив зміни у віддалений репозиторій? Скажіть, що віддати перевагу.
