type StylesDictionary = {
    [key: string]: string;
};

const styles: StylesDictionary = {
    'style-1': 'styles/style_1.css',
    'style-2': 'styles/style_2.css',
    'style-3': 'styles/style_3.css',
};

let currentStyle = 'style-2';

function initializeApp(): void {
    const menu = document.getElementById('menu');
    const themeLink = document.getElementById('theme') as HTMLLinkElement;

    if (!menu || !themeLink) {
        console.error('Nie znaleziono elementów DOM!');
        return;
    }

    Object.keys(styles).forEach((styleKey) => {
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = `Style ${styleKey.split('-')[1]}`;
        link.addEventListener('click', (event) => {
            event.preventDefault();
            changeStyle(styleKey, themeLink);
        });
        menu.appendChild(link);
    });
}

function changeStyle(newStyle: string, themeLink: HTMLLinkElement): void {
    if (newStyle === currentStyle) return;

    themeLink.href = styles[newStyle];
    currentStyle = newStyle;
}

document.addEventListener('DOMContentLoaded', initializeApp);
