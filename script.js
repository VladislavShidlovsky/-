// 1. ОТКРЫТИЕ ПРИГЛАШЕНИЯ И ЗАПУСК МУЗЫКИ
function openInvitation() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainContent = document.getElementById('main-content');
    
    if (welcomeScreen && mainContent) {
        welcomeScreen.style.display = 'none';
        mainContent.classList.remove('hidden');
    }

    const music = document.getElementById('bg-music');
    const playerBtn = document.getElementById('music-player-btn');
    
    if (music && playerBtn) {
        music.play().then(() => {
            playerBtn.classList.remove('player-stopped');
            playerBtn.classList.add('player-playing');
        }).catch(function(error) {
            console.log("Браузер ожидает ручного клика для звука.");
        });
    }
}

// 2. УПРАВЛЕНИЕ МУЗЫКАЛЬНЫМ ПЛЕЕРОМ
function toggleMusic() {
    const music = document.getElementById('bg-music');
    const playerBtn = document.getElementById('music-player-btn');
    
    if (!music || !playerBtn) return;
    
    if (music.paused) {
        music.play();
        playerBtn.classList.remove('player-stopped');
        playerBtn.classList.add('player-playing');
    } else {
        music.pause();
        playerBtn.classList.remove('player-playing');
        playerBtn.classList.add('player-stopped');
    }
}

// 3. ТАЙМЕР ОБРАТНОГО ОТСЧЕТА (21 августа 2026 в 16:00)
function initCountdown() {
    const weddingDate = new Date(2026, 7, 21, 16, 0, 0).getTime(); 

    const countdownFunction = setInterval(function() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const dEl = document.getElementById('days');
        const hEl = document.getElementById('hours');
        const mEl = document.getElementById('minutes');
        const sEl = document.getElementById('seconds');

        if (dEl && hEl && mEl && sEl) {
            dEl.innerText = days < 10 ? '0' + days : (days < 0 ? '00' : days);
            hEl.innerText = hours < 10 ? '0' + hours : (hours < 0 ? '00' : hours);
            mEl.innerText = minutes < 10 ? '0' + minutes : (minutes < 0 ? '00' : minutes);
            sEl.innerText = seconds < 10 ? '0' + seconds : (seconds < 0 ? '00' : seconds);
        }

        if (distance < 0) {
            clearInterval(countdownFunction);
            const cdEl = document.getElementById('countdown');
            if (cdEl) {
                cdEl.innerHTML = "<b style='color:#8b0000; font-size: 22px;'>Горько! Пир горой начался! 🎉</b>";
            }
        }
    }, 1000);
}
document.addEventListener("DOMContentLoaded", initCountdown);

// 4. ДОБАВЛЕНИЕ В ЦАРСКИЙ КАЛЕНДАРЬ (.ics файл с Base64 шифрованием от вылетов в Telegram)
function addToCalendar() {
    const icsLines = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Свадебное приглашение//Иван да Анна//RU",
        "BEGIN:VEVENT",
        "UID:" + Date.now() + "@wedding.ru",
        "DTSTAMP:20260606T000000Z",
        "DTSTART:20260821T130000Z", 
        "DTEND:20260821T210000Z",
        "SUMMARY:Свадьба Ивана и Анны 👑 Пир горой!",
        "DESCRIPTION:Ждем вас к 16:00 в ресторане Казачий Хутор. С собой иметь отличное настроение и бутылочку любимого вина!",
        "LOCATION:Краснодар, ул. Сормовская, 132, Ресторан Казачий Хутор",
        "END:VEVENT",
        "END:VCALENDAR"
    ];

    const icsContent = icsLines.join("\r\n");
    const base64Content = btoa(unescape(encodeURIComponent(icsContent)));
    
    const link = document.createElement("a");
    link.href = "data:text/calendar;charset=utf-8;base64," + base64Content;
    link.download = "wedding_ivan_anna.ics";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
