document.addEventListener('DOMContentLoaded', () => {
    // Получаем данные о персонажах из JS (позже можно сделать AJAX-запрос к бэкенду)
    const characters = [
        { id: "gensyxa", name: "🌸 Генсуха (Наташа)", imageUrl: "https://example.com/images/gensyxa.jpg" },
        { id: "yuuechka", name: "✨ Yuuechka", imageUrl: "https://example.com/images/yuuechka.jpg" },
        { id: "evelone", name: "🎮 Evelone (Вадим)", imageUrl: "https://example.com/images/evelone.jpg" },
        { id: "mokrivskyi", name: "💪 Mokrivskyi", imageUrl: "https://example.com/images/mokrivskyi.jpg" },
        { id: "rem", name: "💙 Рем (Re:Zero)", imageUrl: "https://example.com/images/rem.jpg" },
        { id: "elonmusk", name: "🚀 Илон Маск", imageUrl: "https://example.com/images/elonmusk.jpg" },
        { id: "skrillex", name: "🎶 Skrillex", imageUrl: "https://example.com/images/skrillex.jpg" },
        // ДОБАВЬТЕ ОСТАЛЬНЫХ 18 ПЕРСОНАЖЕЙ СЮДА
    ];

    const grid = document.getElementById('character-grid');

    characters.forEach(char => {
        const card = document.createElement('div');
        card.className = 'character-card';
        card.innerHTML = `
            <img src="${char.imageUrl}" alt="${char.name}" class="character-image">
            <div class="character-name">${char.name}</div>
        `;
        
        // КЛЮЧЕВОЙ ШАГ: При клике отправляем ID персонажа обратно в Telegram
        card.onclick = () => selectCharacter(char.id);
        grid.appendChild(card);
    });

    // Устанавливаем основную кнопку Telegram для закрытия
    if (Telegram.WebApp) {
        Telegram.WebApp.ready();
        Telegram.WebApp.MainButton.setText('Закрыть меню').show();
        Telegram.WebApp.MainButton.onClick(() => Telegram.WebApp.close());
    }
});

function selectCharacter(characterId) {
    if (Telegram.WebApp) {
        // Отправляем ID персонажа (например, "gensyxa") как строку данных в бот
        Telegram.WebApp.sendData(characterId);
        Telegram.WebApp.close();
    }
}
