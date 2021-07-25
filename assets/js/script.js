const colorPalette = document.getElementById('color-palette');
const IMG_PATH = '/assets/img/animacao.json'
let currentElem;

function notification(msg) {
    
    let old_div = document.querySelector('.alert');
    if (old_div) old_div.parentNode.removeChild(old_div);

    let div = document.createElement('div');
    div.className = 'alert';
    div.innerHTML = msg;
    document.body.appendChild(div);

    setTimeout(() => div.classList.add('active'), 1);
    setTimeout(() => div.classList.remove('active'), 2000);
}

function generateColorPalette() {
    colorPalette.innerHTML='';
    
    for (let i = 1; i <= 5; i++) {
    /*Forma longa de criar mais de uma tag dentro de outra tag
        let color = generateColor();
        let li = document.createElement('li');

        let spanColor = document.createElement('span');
        spanColor.className = 'color';
        spanColor.style.setProperty('--color', color);

        let imgAnimation = document.createElement('lottie-player');     
        imgAnimation.className = 'animation';
        imgAnimation.setAttribute("src", IMG_PATH);
        imgAnimation.setAttribute("mode", "bounce");
        imgAnimation.setAttribute("background", "transparent");
        imgAnimation.setAttribute("speed", "1");
        imgAnimation.setAttribute("alt", "Animacao");
        imgAnimation.setAttribute("loop", "");
        imgAnimation.setAttribute("autoplay", "");

        let spanText = document.createElement('span');
        spanText.className = 'text';
        spanText.innerText = color;

        let input = document.createElement('input');
        input.name = 'color';
        input.value = color; 

        li.appendChild(spanColor);
        li.appendChild(imgAnimation);
        li.appendChild(spanText);
        li.appendChild(input);
        */

        /*Forma resumida de criar mais de uma tag dentro de outra tag*/
        let color = generateColor();
        let divEl = document.createElement('div');

        divEl.innerHTML = `
        <span class="color" style="--color:${color}"></span>
        <lottie-player 
            class="animation"
            src="${IMG_PATH}"
            mode="bounce"
            background="transparent"
            speed="1"            
            loop
            autoplay
            alt="Animacao"
        ></lottie-player>
        <span class="text">${color}</span>
        <input name="color" value="${color}"></input>
        `
        colorPalette.appendChild(divEl);

        divEl.addEventListener('mouseover', (e) => { currentElem = e.target.parentNode; });

        divEl.addEventListener('click', (e) => {
            let targetInput = e.target.parentNode.querySelector('input[name="color"]');
            targetInput .select();
            document.execCommand('copy');
            notification('Cor <b>' + targetInput.value  + '</b> copiado para a sua área de transferência')
        });
    }
}

function generateColor(){
    let str = 'abcdef0123456789';
    let color = '#';
    for (let i = 0; i <= 5; i++) color += str[Math.floor(Math.random() * str.length)];
    return color;
}

window.onload = () => document.addEventListener("keypress", addEventListener);

const addEventListener = (event) => {
    if (event.keyCode === 32) {
        generateColorPalette();
    }else if (event.keyCode === 99 && currentElem) {
        let targetInput = currentElem.querySelector('input[name="color"]');
        targetInput .select();
        document.execCommand('copy');
        notification('Cor <b>' + targetInput.value  + '</b> copiado para a sua área de transferência');
        document.body.style.backgroundColor = targetInput.value;
    }
    event.preventDefault();
};

generateColorPalette();