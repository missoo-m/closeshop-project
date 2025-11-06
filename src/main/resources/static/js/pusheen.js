class PusheenMagic {
    constructor() {
        this.pusheenVariants = [
            '🐱',  // Котик
            '😺',  // Улыбающийся котик
            '😸',  // Радостный котик с улыбкой
            '😻',  // Котик влюбленный
            '😽',  // Котик с поцелуем
            '🙀',  // Удивленный котик
            '😿',  // Плачущий котик
            '😾'   // Сердитый котик
        ];
        this.isActive = false;
        this.init();
    }

    init() {
        this.addStyles();
        this.createPusheen();
        this.startRandomAppearances();
        this.addUserInteractions();
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .pusheen-container {
                position: fixed;
                z-index: 10000;
                pointer-events: none;
                transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }

            .pusheen-emoji {
                font-size: 50px;
                filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
                animation: float 3s ease-in-out infinite;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            }

            @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
                25% { transform: translateY(-15px) rotate(5deg) scale(1.1); }
                50% { transform: translateY(-8px) rotate(-3deg) scale(1.05); }
                75% { transform: translateY(-12px) rotate(2deg) scale(1.08); }
            }

            .pusheen-message {
                position: absolute;
                background: rgba(255, 255, 255, 0.95);
                padding: 8px 12px;
                border-radius: 15px;
                font-size: 12px;
                font-weight: 600;
                color: #333;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                white-space: nowrap;
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
                border: 1px solid #e2e8f0;
            }

            .pusheen-message.show {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }

    createPusheen() {
        this.pusheenElement = document.createElement('div');
        this.pusheenElement.className = 'pusheen-container';
        this.pusheenElement.style.display = 'none';

        this.pusheenEmoji = document.createElement('div');
        this.pusheenEmoji.className = 'pusheen-emoji';
        this.pusheenEmoji.textContent = this.getRandomPusheenEmoji();

        this.messageElement = document.createElement('div');
        this.messageElement.className = 'pusheen-message';

        this.pusheenElement.appendChild(this.pusheenEmoji);
        this.pusheenElement.appendChild(this.messageElement);
        document.body.appendChild(this.pusheenElement);
    }

    getRandomPusheenEmoji() {
        return this.pusheenVariants[Math.floor(Math.random() * this.pusheenVariants.length)];
    }

    showPusheen(position = 'random', message = '') {
        if (this.isActive) return;

        this.isActive = true;
        const pusheen = this.pusheenElement;

        // Обновляем emoji
        this.pusheenEmoji.textContent = this.getRandomPusheenEmoji();

        // Устанавливаем позицию
        this.setPosition(pusheen, position);

        // Показываем сообщение если есть
        if (message) {
            this.showMessage(message);
        }

        // Показываем Пушина
        pusheen.style.display = 'block';
        pusheen.style.opacity = '0';
        pusheen.style.transform = 'scale(0.5)';

        setTimeout(() => {
            pusheen.style.opacity = '1';
            pusheen.style.transform = 'scale(1)';
        }, 50);

        // Прячем через 4 секунды
        setTimeout(() => {
            this.hidePusheen();
        }, 4000);
    }

    setPosition(element, position) {
        const positions = {
            'top-left': { top: '20px', left: '20px' },
            'top-right': { top: '20px', right: '20px' },
            'bottom-left': { bottom: '20px', left: '20px' },
            'bottom-right': { bottom: '20px', right: '20px' },
            'center': { top: '50%', left: '50%', transform: 'translate(-50%, -50%) scale(1)' }
        };

        if (position === 'random') {
            const posKeys = Object.keys(positions);
            position = posKeys[Math.floor(Math.random() * posKeys.length)];
        }

        const pos = positions[position] || positions['bottom-right'];
        Object.assign(element.style, pos);

        // Позиционируем сообщение
        if (position.includes('right')) {
            this.messageElement.style.left = 'auto';
            this.messageElement.style.right = '100%';
            this.messageElement.style.marginRight = '10px';
            this.messageElement.style.top = '50%';
            this.messageElement.style.transform = 'translateY(-50%)';
        } else {
            this.messageElement.style.left = '100%';
            this.messageElement.style.right = 'auto';
            this.messageElement.style.marginLeft = '10px';
            this.messageElement.style.top = '50%';
            this.messageElement.style.transform = 'translateY(-50%)';
        }
    }

    showMessage(text) {
        this.messageElement.textContent = text;
        this.messageElement.classList.add('show');

        setTimeout(() => {
            this.messageElement.classList.remove('show');
        }, 3000);
    }

    hidePusheen() {
        const pusheen = this.pusheenElement;
        pusheen.style.opacity = '0';
        pusheen.style.transform = 'scale(0.5)';

        setTimeout(() => {
            pusheen.style.display = 'none';
            this.isActive = false;
        }, 800);
    }

    startRandomAppearances() {
        // Случайные появления каждые 30-60 секунд
        setInterval(() => {
            if (!this.isActive && Math.random() > 0.3) {
                const messages = [
                    'Meow! 🐱',
                    'Hello there! 👋',
                    'Nice to see you! 😊',
                    'Purr... 💤',
                    'Time for donuts! 🍩',
                    'Coding time! 💻',
                    'So fluffy! 🥰',
                    'Nap time! 😴'
                ];
                const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                this.showPusheen('random', randomMessage);
            }
        }, 30000);
    }

    addUserInteractions() {
        // Появление при наведении на кнопки
        document.addEventListener('mouseover', (e) => {
            if (e.target.matches('button, .btn, [type="submit"]') && !this.isActive && Math.random() > 0.7) {
                this.showPusheen('random', 'Click me! 🐾');
            }
        });

        // Появление при отправке форм
        document.addEventListener('submit', (e) => {
            if (!this.isActive) {
                setTimeout(() => {
                    this.showPusheen('center', 'Form submitted! ✅');
                }, 500);
            }
        });

        // Появление при добавлении в корзину
        document.addEventListener('click', (e) => {
            if (e.target.closest('form[action*="/cart/add"]') && !this.isActive) {
                setTimeout(() => {
                    this.showPusheen('top-right', 'Added to cart! 🛒');
                }, 300);
            }
        });

        // Появление при загрузке страницы
        window.addEventListener('load', () => {
            setTimeout(() => {
                if (!this.isActive) {
                    this.showPusheen('bottom-right', 'Welcome! 🎉');
                }
            }, 2000);
        });

        // Появление при скролле
        let lastScrollTime = 0;
        window.addEventListener('scroll', () => {
            const now = Date.now();
            if (!this.isActive && now - lastScrollTime > 10000) {
                if (Math.random() > 0.8) {
                    this.showPusheen('random', 'Scrolling? 📜');
                    lastScrollTime = now;
                }
            }
        });
    }
}

// Инициализация когда DOM загружен
document.addEventListener('DOMContentLoaded', () => {
    window.pusheenMagic = new PusheenMagic();
});