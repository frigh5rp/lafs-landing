# LAFS — публичные материалы

Открытая часть продукта **LAFS** (Love At First Sight): лендинг, юридические тексты, UI-kit и HTML-демо **без админки и без сервера**.

> Полный исходный код приложения, API, админки и деплоя **сюда не входит**.

## Сайт

- Прод: [https://lafs.tech](https://lafs.tech)
- Приложение (web): [https://app.lafs.tech](https://app.lafs.tech)
- APK: [https://lafs.tech/downloads/LAFS-release.apk](https://lafs.tech/downloads/LAFS-release.apk)

## Содержимое репозитория

```
landing/          # статический сайт (HTML/CSS/assets)
docs/legal/       # оферта и privacy (Markdown)
ui/               # React Native / Expo UI-kit (без admin)
demo/             # кликабельный HTML UI (без сервера)
screenshots/      # скрины реального app.lafs.tech
```

## Скрины

Реальные экраны приложения: [screenshots/](./screenshots/).

## HTML-демо приложения

Статический макет: кнопка **«Войти»** сразу открывает демо-аккаунт, вкладки и кнопки работают без API.

- файл: [demo/index.html](./demo/index.html)
- GitHub Pages (если включено): https://frigh5rp.github.io/lafs-landing/demo/

Живое приложение остаётся на [app.lafs.tech](https://app.lafs.tech) — демо его **не заменяет**.

## Локальный просмотр

```bash
cd landing && npx --yes serve .
# или демо:
cd demo && npx --yes serve .
```

## Лицензия

См. [LICENSE](./LICENSE).

Кратко: это **не open source**. Авторские права на материалы репозитория есть по закону; отдельной регистрации товарного знака / патента в этом файле нет. Идею продукта LICENSE не защищает.