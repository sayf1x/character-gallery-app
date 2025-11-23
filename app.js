/**
 * Конфигурация персонажей. ID должны строго совпадать с ключами в miniapptg.py
 */
const CHARACTERS = [
    // --- ИНТЕРНЕТ-ЗНАМЕНИТОСТИ ---
    { id: "gensyxa", name: "Генсуха (Наташа)", category: "Стримеры", emoji: "🌸", image: "https://placehold.co/100x100/94a3b8/000?text=GS" },
    { id: "yuuechka", name: "Yuuechka", category: "Стримеры", emoji: "✨", image: "https://placehold.co/100x100/94a3b8/000?text=YU" },
    { id: "evelone", name: "Evelone (Вадим)", category: "Стримеры", emoji: "🎮", image: "https://placehold.co/100x100/94a3b8/000?text=EV" },
    { id: "mokrivskyi", name: "Mokrivskyi (Александр)", category: "Стримеры", emoji: "💪", image: "https://placehold.co/100x100/94a3b8/000?text=MK" },
    // --- АНИМЕ-ПЕРСОНАЖИ ---
    { id: "asuka", name: "Аска Лэнгли (Ева)", category: "Аниме", emoji: "🟥", image: "https://placehold.co/100x100/f87171/000?text=AS" },
    { id: "yubacoffee", name: "Юбачи (Кофе)", category: "Аниме", emoji: "☕", image: "https://placehold.co/100x100/f87171/000?text=YB" },
    { id: "levi", name: "Леви Аккерман (Атака)", category: "Аниме", emoji: "🗡️", image: "https://placehold.co/100x100/f87171/000?text=LV" },
    { id: "zerotwo", name: "Zero Two (Darling)", category: "Аниме", emoji: "💖", image: "https://placehold.co/100x100/f87171/000?text=ZT" },
    { id: "giyu", name: "Гию Томиока (Клинок)", category: "Аниме", emoji: "💧", image: "https://placehold.co/100x100/f87171/000?text=GY" },
    { id: "mikasa", name: "Микаса Аккерман", category: "Аниме", emoji: "🧣", image: "https://placehold.co/100x100/f87171/000?text=MK" },
    { id: "sailormoon", name: "Сейлор Мун", category: "Аниме", emoji: "🌙", image: "https://placehold.co/100x100/f87171/000?text=SM" },
    { id: "nezuko", name: "Нэзуко Камадо", category: "Аниме", emoji: "🎋", image: "https://placehold.co/100x100/f87171/000?text=NZ" },
    { id: "kirito", name: "Кирито (SAO)", category: "Аниме", emoji: "⚫️", image: "https://placehold.co/100x100/f87171/000?text=KT" },
    { id: "saitama", name: "Сайтама (Ванпанч)", category: "Аниме", emoji: "👊", image: "https://placehold.co/100x100/f87171/000?text=SA" },
    // --- ЗАРУБЕЖНЫЕ ЗНАМЕНИТОСТИ ---
    { id: "taylorswift", name: "Тейлор Свифт", category: "Зарубежные", emoji: "🎸", image: "https://placehold.co/100x100/7dd3fc/000?text=TS" },
    { id: "ryanreynolds", name: "Райан Рейнольдс", category: "Зарубежные", emoji: "🤣", image: "https://placehold.co/100x100/7dd3fc/000?text=RR" },
    { id: "dojacat", name: "Doja Cat", category: "Зарубежные", emoji: "🎤", image: "https://placehold.co/100x100/7dd3fc/000?text=DC" },
    { id: "keanureeves", name: "Киану Ривз", category: "Зарубежные", emoji: "🕶️", image: "https://placehold.co/100x100/7dd3fc/000?text=KR" },
    { id: "obama", name: "Барак Обама", category: "Зарубежные", emoji: "🗣️", image: "https://placehold.co/100x100/7dd3fc/000?text=OB" },
    // --- АРТИСТЫ ---
    { id: "morgenstern", name: "Моргенштерн", category: "Артисты", emoji: "💰", image: "https://placehold.co/100x100/a78bfa/000?text=MG" },
    { id: "slava_merslow", name: "Slava Marlow", category: "Артисты", emoji: "🎹", image: "https://placehold.co/100x100/a78bfa/000?text=SM" },
    { id: "zivert", name: "Zivert", category: "Артисты", emoji: "👠", image: "https://placehold.co/100x100/a78bfa/000?text=ZV" },
    { id: "karna", name: "Валя Карнавал", category: "Артисты", emoji: "🍭", image: "https://placehold.co/100x100/a78bfa/000?text=VK" },
    { id: "basta", name: "Баста (Василий)", category: "Артисты", emoji: "🎤", image: "https://placehold.co/100x100/a78bfa/000?text=BA" },
];

let currentFilter = 'all';

/**
 * Главная функция инициализации.
 * Вызывается при загрузке страницы.
 */
function initApp() {
    // 1. Инициализация Telegram WebApp API
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.ready(); // Заявляем готовность
        window.Telegram.WebApp.expand(); // Расширяем Mini App на весь экран
        console.log("Telegram WebApp API is ready and expanded.");
    } else {
        console.warn("Telegram WebApp API not found. Running standalone.");
    }

    // 2. Инициализация UI
    renderCharacters(CHARACTERS);
    setupFilterListeners();
}


/**
 * Рендерит список персонажей в зависимости от текущего фильтра.
 * @param {Array<Object>} list - Полный список персонажей.
 */
function renderCharacters(list) {
    const container = document.getElementById('characters-container');
    
    if (!container) {
        console.error("Контейнер 'characters-container' не найден в DOM. Проверьте index.html.");
        return; 
    }
    
    container.innerHTML = '';
    const filteredList = list.filter(char => currentFilter === 'all' || char.category === currentFilter);

    if (filteredList.length === 0) {
        container.innerHTML = '<p class="no-results">Персонажи в этой категории пока не найдены.</p>';
        return;
    }

    filteredList.forEach(char => {
        const card = document.createElement('div');
        card.className = 'character-card';
        card.setAttribute('data-id', char.id);
        // ВНИМАНИЕ: Назначаем обработчик нажатия
        card.onclick = () => selectCharacter(char.id);

        card.innerHTML = `
            <div class="emoji">${char.emoji}</div>
            <div class="info">
                <div class="name">${char.name}</div>
                <div class="category">${char.category}</div>
            </div>
            <img src="${char.image}" alt="${char.name}" class="placeholder-img" onerror="this.style.display='none'">
        `;
        container.appendChild(card);
    });
    
    const scrollContainer = document.querySelector('.content-wrapper');
    if (scrollContainer) {
        scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

/**
 * Настраивает слушателей для кнопок фильтрации.
 */
function setupFilterListeners() {
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            button.classList.add('active');
            
            currentFilter = category;
            renderCharacters(CHARACTERS);
        });
    });
}

/**
 * Обработчик выбора персонажа. Отправляет ID персонажа обратно в Telegram Bot.
 * @param {string} characterId - ID выбранного персонажа.
 */
function selectCharacter(characterId) {
    console.log(`Attempting to send character ID: ${characterId}`);
    
    if (window.Telegram && window.Telegram.WebApp) {
        // КРИТИЧЕСКАЯ СТРОКА: ОТПРАВКА ДАННЫХ И ЗАКРЫТИЕ ПРИЛОЖЕНИЯ
        window.Telegram.WebApp.sendData(characterId); 
        console.log(`Sent data: ${characterId}`);
    } else {
        alert(`Ошибка: Не удалось найти Telegram WebApp API. Выбран ID: ${characterId}`);
    }
}

// Запуск приложения после загрузки DOM
document.addEventListener('DOMContentLoaded', initApp);
