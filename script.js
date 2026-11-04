// ================= СЛОВАРИ ПЕРЕВОДА =================
const translations = {
    ru: {
        title: "Праздники по месяцам",
        backToMonths: "← Назад к месяцам",
        backToCal: "← Назад к календарю",
        holidaySubtitle: "Праздники и памятные даты",
        months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        monthsGenitive: ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"],
        daysOfWeek: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
        noHolidays: "В этот день нет известных праздников в нашем списке.",
        langBtn: "EN"
    },
    en: {
        title: "Holidays by Month",
        backToMonths: "← Back to months",
        backToCal: "← Back to calendar",
        holidaySubtitle: "Holidays and memorable dates",
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        monthsGenitive: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        daysOfWeek: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        noHolidays: "There are no known holidays in our list for this day.",
        langBtn: "RU"
    }
};

// ================= БАЗА ДАННЫХ ПРАЗДНИКОВ =================
/*
  КАК ЗАПОЛНЯТЬ БАЗУ:
  Структура: { КлючМесяца: { КлючДня: [ { ru: "...", en: "..." }, ... ] } }
  
  - КлючМесяца: от 0 (Январь) до 11 (Декабрь).
  - КлючДня: число от 1 до 31.
  - Внутри массива каждый праздник — это объект с двумя языками: { ru: "Название", en: "Название" }.
  
  Пример:


  





  
  0: { // Январь
      1: [
          { ru: "Новый год", en: "New Year's Day" }
      ]
  }
*/
const holidaysData = {
    // 0: Январь
    0: {
        1: [
            { ru: "Новый год", en: "New Year's Day" },
            { ru: "Всемирный день мира", en: "World Day of Peace" },
            { ru: "Международный день похмелья", en: "International Hangover Day" }
        ],
        2: [
            { ru: "День научной фантастики", en: "Science Fiction Day" },
            { ru: "Всемирный день интроверта", en: "World Introvert Day" }
        ],
        3: [
            { ru: "День катания на санках (Россия)", en: "Sledding Day (Russia)" },
            { ru: "Международный день рождения соломинки для коктейлей", en: "International Straw Day" }
        ],
        4: [
            {ru: "Всемирный день азбуки Брайля", en: "World Braille Day"},
            {ru: "День независимости Мьянмы", en: "Myanmar Independence Day"},
            {ru: "Всемирный день гипноза ", en: "World Hypnosis Day"},
            {ru: "День Ньютона", en: "Newton Day"},
            {ru: "Национальный день спагетти", en: "National Spaghetti Day"},
            {ru: "День зимних сладостей", en: "Winter Sweets Day"},
            {ru: "День страстей по лимонной карамельке", en: "A Day of Passion Over a Lemon Hard Candy"}
        ]

    },

    // 1: Февраль
    1: {
        1: [ { ru: "Международный день десерта", en: "..." }
             { ru: "Всемирный день хиджаба", en: "..." }
             { ru: "День «Измените свой пароль»", en: "..." }
             { ru: "День работника лифтового хозяйства", en: "..." }
           ],
       // 2: [ { ru: "...", en: "..." } ],
        
    },

    // 2: Март
    2: {
        /*
        8: [ { ru: "Международный женский день", en: "International Women's Day" } ],
        ...
        */
    },

    // 3: Апрель
    3: {
        // ...
    },

    // 4: Май
4: {
  7: [
  {ru: "День Рождения Вовы", en: "Vladimir's birthday"}
  ]
  },
    

    // 5: Июнь
    5: {
        // ...
    },

    // 6: Июль
    6: {
        // ...
    },

    // 7: Август
    7: {
        // ...
    },

    // 8: Сентябрь
    8: {
        // ...
    },

    // 9: Октябрь
    9: {
        // ...
    },

    // 10: Ноябрь
    10: {
        // ...
    },

    // 11: Декабрь
    11: {
        // ...
    }
};

// ================= ДАННЫЕ КАЛЕНДАРЯ (2027) =================
// startDay: 0 - Пн, 1 - Вт, ..., 6 - Вс. 
// days: количество дней в месяце.
// holidays: массив чисел (дней), которые нужно визуально выделить красным.
const monthsData = [
    { days: 31, startDay: 4, holidays: [1, 2, 3, 4, 5, 6, 7] }, // Январь
    { days: 28, startDay: 0, holidays: [23] },                  // Февраль
    { days: 31, startDay: 0, holidays: [8] },                   // Март
    { days: 30, startDay: 3, holidays: [] },                    // Апрель
    { days: 31, startDay: 5, holidays: [1, 9] },                // Май
    { days: 30, startDay: 1, holidays: [12] },                  // Июнь
    { days: 31, startDay: 3, holidays: [] },                    // Июль
    { days: 31, startDay: 6, holidays: [] },                    // Август
    { days: 30, startDay: 2, holidays: [] },                    // Сентябрь
    { days: 31, startDay: 4, holidays: [] },                    // Октябрь
    { days: 30, startDay: 0, holidays: [4] },                   // Ноябрь
    { days: 31, startDay: 2, holidays: [31] }                   // Декабрь
];

let currentMonthIndex = 0;
let currentDay = 1;
let currentLang = localStorage.getItem('lang') || 'ru';

// ================= ФУНКЦИИ =================

// Обновление интерфейса при смене языка или загрузке
function updateUILanguage() {
    const t = translations[currentLang];
    
    // Главный экран
    document.getElementById('main-title').innerText = t.title;
    document.getElementById('lang-btn').innerText = t.langBtn;
    
    const grid = document.getElementById('months-grid');
    grid.innerHTML = '';
    t.months.forEach((month, index) => {
        const card = document.createElement('div');
        card.className = 'month-card';
        card.innerText = month;
        card.onclick = () => openCalendar(index);
        grid.appendChild(card);
    });

    // Кнопки
    document.getElementById('btn-back-main').innerText = t.backToMonths;
    document.getElementById('btn-back-cal').innerText = t.backToCal;
    document.getElementById('holiday-subtitle').innerText = t.holidaySubtitle;

    // Дни недели
    const dayNames = ['day-mon', 'day-tue', 'day-wed', 'day-thu', 'day-fri', 'day-sat', 'day-sun'];
    dayNames.forEach((id, i) => {
        document.getElementById(id).innerText = t.daysOfWeek[i];
    });

    // Если открыт календарь или праздники — обновляем их на лету
    if (!document.getElementById('calendar-screen').classList.contains('hidden')) {
        document.getElementById('calendar-title').innerText = t.months[currentMonthIndex];
    }
    if (!document.getElementById('holidays-screen').classList.contains('hidden')) {
        openHolidays(currentDay, currentMonthIndex);
    }
}

// Переключение языка
function toggleLanguage() {
    currentLang = currentLang === 'ru' ? 'en' : 'ru';
    localStorage.setItem('lang', currentLang);
    updateUILanguage();
}

// Переключение темы
function toggleTheme() {
    const isDark = document.getElementById('theme-checkbox').checked;
    document.body.classList.toggle('dark-theme', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Открытие календаря месяца
function openCalendar(monthIndex) {
    currentMonthIndex = monthIndex;
    document.getElementById('main-screen').classList.add('hidden');
    document.getElementById('calendar-screen').classList.remove('hidden');
    document.getElementById('holidays-screen').classList.add('hidden');
    window.scrollTo(0, 0);

    const t = translations[currentLang];
    document.getElementById('calendar-title').innerText = t.months[monthIndex];

    const data = monthsData[monthIndex];
    const container = document.getElementById('calendar-days-container');
    container.innerHTML = '';

    // 1. Добавляем пустые ячейки для сдвига (если месяц начинается не с Пн)
    for (let i = 0; i < data.startDay; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'calendar-day empty';
        container.appendChild(emptyDiv);
    }

    // 2. Генерируем дни месяца
    for (let day = 1; day <= data.days; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'calendar-day';
        dayDiv.innerText = day;

        // Выходные (Сб = 5, Вс = 6)
        const dayOfWeek = (data.startDay + day - 1) % 7;
        if (dayOfWeek === 5 || dayOfWeek === 6) {
            dayDiv.classList.add('weekend');
        }

        // Визуальное выделение праздников (красным)
        if (data.holidays.includes(day)) {
            dayDiv.classList.add('holiday');
        }

        // ВАЖНО: Делаем кликабельным ЛЮБОЙ день месяца без исключений
        dayDiv.classList.add('clickable');
        dayDiv.onclick = () => openHolidays(day, monthIndex);

        container.appendChild(dayDiv);
    }
}

// Открытие списка праздников на конкретный день
function openHolidays(day, monthIndex) {
    currentDay = day;
    document.getElementById('calendar-screen').classList.add('hidden');
    document.getElementById('holidays-screen').classList.remove('hidden');
    window.scrollTo(0, 0);

    // Устанавливаем заголовок (например, "3 Января")
    const t = translations[currentLang];
    document.getElementById('holiday-date-title').innerText = `${day} ${t.monthsGenitive[monthIndex]}`;

    // Очищаем список
    const listContainer = document.getElementById('holidays-list');
    listContainer.innerHTML = '';

    // Ищем данные в базе
    let dayHolidays = [];
    if (holidaysData[monthIndex] && holidaysData[monthIndex][day]) {
        dayHolidays = holidaysData[monthIndex][day];
    }

    // Если данных нет — выводим заглушку
    if (dayHolidays.length === 0) {
        const li = document.createElement('li');
        li.innerText = t.noHolidays;
        listContainer.appendChild(li);
    } else {
        // Если данные есть — выводим их списком
        dayHolidays.forEach(h => {
            const li = document.createElement('li');
            li.innerText = h[currentLang] || h.ru; 
            listContainer.appendChild(li);
        });
    }
}

// Навигация назад
function goBackToMain() {
    document.getElementById('calendar-screen').classList.add('hidden');
    document.getElementById('main-screen').classList.remove('hidden');
}

function goBackToCalendar() {
    document.getElementById('holidays-screen').classList.add('hidden');
    document.getElementById('calendar-screen').classList.remove('hidden');
}

// ================= ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ =================
window.onload = function() {
    // Восстановление темы
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        document.getElementById('theme-checkbox').checked = true;
    }
    // Отрисовка UI
    updateUILanguage();
};
