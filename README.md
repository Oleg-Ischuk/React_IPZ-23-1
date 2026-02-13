# React IPZ Project

# Connect Four — Навчальний проєкт

Невеликий проєкт на React: реалізація гри "Чотири в ряд" (Connect Four) з компонентною архітектурою, Storybook та JSDoc-документацією.

**Автор:** Oleh Ishchuk (<olegischuk594@gmail.com>)

---

**Швидкий старт**

- **Вимоги:** Node.js 18+ та npm
- Встановлення залежностей:

```bash
npm install
```

- Запуск у режимі розробки:

```bash
npm run dev
```

- Збірка для продакшену:

```bash
npm run build
```

- Локальний перегляд збірки:

```bash
npm run preview
```

---

**Ключові команди**

- `npm i` — встановлення залежностей
- `npm run dev` — запуск застосунку (Vite)
- `npm run build` — продакшен-збірка
- `npm run preview` — перегляд збірки локально
- `npm run docs` — згенерувати документацію JSDoc (вивід у `out/docs`)
- `npm run storybook` — запустити Storybook
- `npm run license-check` — згенерувати звіт ліцензій (`license-report.txt`)

> Зауваження: перед запуском Storybook може знадобитися встановити dev-залежності:

```bash
npm install --save-dev @storybook/react-vite @storybook/addon-essentials
```

---

**Опис проєкту**

Проєкт містить:

- Логіку гри та інтерфейс: компоненти в `src/components` та сторінки в `src/pages`.
- Хуки для логіки гри у `src/hooks`.
- Зберігання стану в `src/store`.
- Компоненти: `Board`, `Cell`, `Button`, `Modal`, `ResultsTable`, `CookieConsent` тощо.

Код організовано для зручності розробки та розширення — додавайте історії Storybook і тести для нових компонентів.

---

**Структура**

```
REACT-IPZ-23-1/
│
├── eslint.config.js
├── index.html
├── jsdoc.json
├── LICENSE
├── license-report.txt
├── package.json
├── PRIVACY_POLICY.md
├── README.md
├── vite.config.js
├── .gitignore
├── src/
│   ├── App.jsx
│   ├── App.module.css
│   ├── main.jsx
│   ├── components/
│   │   ├── Board/
│   │   │   ├── Board.jsx
│   │   │   └── Board.module.css
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   ├── Button.module.css
│   │   │   └── Button.stories.jsx
│   │   ├── Cell/
│   │   │   ├── Cell.jsx
│   │   │   └── Cell.module.css
│   │   ├── CookieConsent/
│   │   │   ├── CookieConsent.jsx
│   │   │   └── CookieConsent.module.css
│   │   ├── GameInfo/
│   │   │   ├── GameInfo.jsx
│   │   │   └── GameInfo.module.css
│   │   ├── Modal/
│   │   │   ├── Modal.jsx
│   │   │   ├── Modal.module.css
│   │   │   └── Modal.stories.jsx
│   │   ├── ResultsModal/
│   │   │   ├── ResultsModal.jsx
│   │   │   └── ResultsModal.module.css
│   │   ├── ResultsTable/
│   │   │   ├── ResultsTable.jsx
│   │   │   └── ResultsTable.module.css
│   │   └── SettingsForm/
│   │       ├── SettingsForm.jsx
│   │       └── SettingsForm.module.css
│   ├── constants/
│   │   └── gameSettings.js
│   ├── hooks/
│   │   ├── index.js
│   │   ├── useBoardClick.js
│   │   ├── useConnectFour.js
│   │   └── useNavigation.js
│   ├── pages/
│   │   ├── GamePage/
│   │   │   ├── GamePage.jsx
│   │   │   └── GamePage.module.css
│   │   ├── ResultsPage/
│   │   │   ├── ResultsPage.jsx
│   │   │   └── ResultsPage.module.css
│   │   ├── SettingsPage/
│   │   │   ├── SettingsPage.jsx
│   │   │   └── SettingsPage.module.css
│   │   └── StartPage/
│   │       ├── StartPage.jsx
│   │       └── StartPage.module.css
│   ├── store/
│   │   ├── gameStore.js
│   │   └── resultsStore.js
│   └── utils/
│       ├── generateId.js
│       └── validation.js
└── out/docs
```

**Cookie / Конфіденційність**

Компонент згоди на cookie знаходиться в `src/components/CookieConsent/CookieConsent.jsx` і зберігає вибір у `localStorage`. Перегляньте `PRIVACY_POLICY.md` для деталей.

---

**Документація та Storybook**

- JSDoc: конфігурація в `jsdoc.json`, генерація в `out/docs` командою `npm run docs`.
- Storybook: історії знаходяться поруч з компонентами у `src/components/*/*.stories.jsx`.

---

**Ліцензія**

Проєкт поширюється під ліцензією MIT — див. файл [LICENSE](LICENSE).

Звіт по ліцензіях залежностей: `license-report.txt` (згенерований командою `npm run license-check`).

---

**Внесок**

1. Форкніть репозиторій
2. Створіть гілку `feature/your-feature`
3. Додайте зміни, тести та/або історії
4. Відкрийте Pull Request

---

**Контакти**

Oleh Ishchuk — olegischuk594@gmail.com
