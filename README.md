Contex Product Viewer
=====================

Интерактивный 3D-вьюер товаров на базе React, Three.js (react-three-fiber) и framer-motion. Поддерживает плавную (пружинную) поворотную навигацию мышью, автоматическое вращение сцены и анимированные переходы между продуктами.

Скриншоты/Демо
---------------
- Запустите локально `pnpm dev` и откройте `http://localhost:5173/`.

Стек
-----
- React 19
- Vite 7
- TypeScript 5
- three + @react-three/fiber + @react-three/drei
- @react-spring/three (переходы), framer-motion (UI-анимации)
- Tailwind CSS 4 (через @tailwindcss/vite)

Быстрый старт
-------------
1. Установите PNPM (рекомендуется): `npm i -g pnpm`
2. Установите зависимости:
   - `pnpm i`
3. Запуск для разработки:
   - `pnpm dev`
4. Сборка production:
   - `pnpm build`
5. Локальный предпросмотр сборки:
   - `pnpm preview`
6. Линтинг:
   - `pnpm lint`

Скрипты (package.json)
----------------------
- `dev`: запуск дев-сервера Vite
- `build`: компиляция TypeScript + сборка Vite
- `preview`: предпросмотр production-сборки
- `lint`: ESLint проверка
- `optimize-models`: оффлайн-оптимизация glTF-моделей (см. раздел «Оптимизация моделей»)

Структура проекта
-----------------
- `src/components/App.tsx` — корневой компонент страницы
- `src/components/ThreeDScene.tsx` — оболочка Canvas и сцены (`Scene`)
- `src/components/scene/SceneContent.tsx` — содержимое 3D-сцены (модель, окружение, вращения, переходы)
- `src/components/scene/usePointerRotation.ts` — обработка жестов/мыши и вычисление целевых углов
- `src/components/ProductInfo.tsx` — блок информации о продукте (framer-motion)
- `src/assets/products.ts` — список продуктов и пути к моделям
- `scripts/optimize-models.ts` — опциональная оптимизация glTF

Ключевые возможности
--------------------
- Плавное авто-вращение сцены с управляемой скоростью
- Пружинная (spring) интерполяция поворота от указателя
- Переходы между моделями (масштаб + поворот) на `@react-spring/three`
- Предзагрузка окружения и моделей (`useGLTF.preload`, `useEnvironment.preload`)

Работа с 3D сценой
------------------
- Указатель: `usePointerRotation` вычисляет целевые углы `rotationX/rotationY`
- Спринг: в `SceneContent` используется простой физический интегратор со степенью жесткости и демпфированием, применяемый каждый кадр к группам `xGroupRef/yGroupRef` (`@react-spring/three` баговал в момент смены модели)
- Авто-вращение: отдельная группа `baseRotationGroupRef`, чтобы не конфликтовать с управлением указателем

Оптимизация моделей
-------------------
Скрипт `pnpm optimize-models` использует `@gltf-transform/*` для подготовки glTF:
- Сжатие геометрии (Draco)
- Удаление лишних данных и переупаковка текстур

Добавление нового продукта
--------------------------
1. Поместите `.glb` модель в `src/assets`
2. Добавьте запись в `src/assets/products.ts`:
3. Прогоните оптимизацию: `pnpm optimize-models`
