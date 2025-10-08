# ZeroTier Members SPA

Простое **Single Page Application (SPA)** для отображения участников вашей ZeroTier-сети.  
Работает на **Vercel** с использованием **Serverless Function** для безопасного доступа к API.

![Скриншот таблицы](https://via.placeholder.com/600x200?text=ZeroTier+Members+Table) <!-- замените на реальный скрин при желании -->

## 🔒 Безопасность

- API-токен **никогда не попадает в браузер**
- Все запросы к ZeroTier API идут через защищённую серверную функцию на Vercel
- Токен хранится в **Environment Variables**

---

## 🚀 Как развернуть

### 1. Получите API-токен ZeroTier

1. Зайдите на [https://my.zerotier.com/account](https://my.zerotier.com/account)
2. В разделе **API Access** нажмите **Generate Token**
3. Скопируйте токен (он выглядит как `a1b2c3d4...`)

> ⚠️ **Не используйте старые/скомпрометированные токены!**

### 2. Создайте репозиторий

1. Нажмите **Use this template** (если шаблон) или склонируйте этот репозиторий
2. Загрузите код на **GitHub**, **GitLab** или **Bitbucket**

### 3. Задеплойте на Vercel

1. Перейдите на [https://vercel.com/new](https://vercel.com/new)
2. Подключите ваш репозиторий
3. На шаге **Environment Variables** добавьте:

   | Key                      | Value                     |
   |--------------------------|---------------------------|
   | `ZEROTIER_API_TOKEN`     | ваш_токен_здесь           |
   | `ZEROTIER_NETWORK_ID`    | `48d6023c462aca41` (или ваш ID) |

4. Нажмите **Deploy**

✅ Готово! Через 30 секунд вы получите URL вида `https://zerotier-members-spa.vercel.app`

---

## 🛠 Локальная разработка

Это приложение **не требует локального сервера** — оно состоит из статического HTML и Vercel Function.  
Для тестирования изменений просто задеплойте новую версию.

Если хотите эмулировать функцию локально — используйте [Vercel CLI](https://vercel.com/docs/cli):

```bash
npm install -g vercel
vercel dev
