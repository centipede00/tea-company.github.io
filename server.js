const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Подключение к MongoDB без устаревших опций
mongoose.connect('mongodb://localhost:27017/contact')
    .then(() => {
        console.log('✅ Успешно подключено к MongoDB');
    })
    .catch(err => {
        console.error('❌ Ошибка подключения к MongoDB:', err);
    });

// Определение схемы и модели
const formSchema = new mongoose.Schema({
    email: String,
    name: String,
    phone: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Form = mongoose.model('contact', formSchema);

// Обработка POST-запроса
app.post('/api/send', async (req, res) => {
    console.log('Получен запрос:', req.body); // Логируем полученные данные
    const { email, name, phone, message } = req.body;

    if (!email || !name || !phone || !message) {
        return res.status(400).json({ error: 'Все поля обязательны.' }); // Проверка на наличие данных
    }

    const formData = new Form({ email, name, phone, message });
    try {
        await formData.save();
        res.status(200).json({ message: 'Заявка успешно сохранена!' });
    } catch (error) {
        console.error('❌ Ошибка при сохранении заявки:', error);
        res.status(500).json({ error: 'Ошибка при сохранении заявки.' });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на порту ${PORT}`);
});






