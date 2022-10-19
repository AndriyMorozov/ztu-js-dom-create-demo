



/*
function createPanel(title, content) {
    let resultString = '<div class="panel">';
    resultString += '<div class="head">';
    resultString += `<div class="title">${title}</div>`;
    resultString += `<div class="buttons">`;
    resultString += `<div class="button min"></div>`;
    resultString += `</div>`;
    resultString += '</div>';
    resultString += '<div class="body">';
    resultString += content;
    resultString += '</div>';
    resultString += '</div>';
    return resultString;
}

document.body.innerHTML += createPanel('New Panel', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquid, architecto commodi dignissimos et eum illo impedit incidunt ipsam iusto minus nisi veniam voluptatibus? Corporis deleniti molestiae officiis repellat ullam.');
document.body.innerHTML += createPanel('New Panel', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquid, architecto commodi dignissimos et eum illo impedit incidunt ipsam iusto minus nisi veniam voluptatibus? Corporis deleniti molestiae officiis repellat ullam.');
document.body.innerHTML += createPanel('New Panel', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquid, architecto commodi dignissimos et eum illo impedit incidunt ipsam iusto minus nisi veniam voluptatibus? Corporis deleniti molestiae officiis repellat ullam.');
*/
let panelCount = 0;
function createPanel(title, content, element = document.body) {
    let panelNumber = panelCount;
    let divPanel = document.createElement('div');
    divPanel.classList.add('panel');
    divPanel.dataset.number = panelNumber;
    let divHead = document.createElement('div');
    divHead.classList.add('head');
    let divTitle = document.createElement('div');
    divTitle.classList.add('title');
    divTitle.innerHTML = title;
    let divButtons = document.createElement('div');
    divButtons.classList.add('buttons');
    let divMinButton = document.createElement('div');
    divMinButton.classList.add('button');
    divMinButton.classList.add('min');
    let divBody = document.createElement('div');
    divBody.classList.add('body');
    divBody.innerHTML = content;

    divButtons.appendChild(divMinButton);

    divHead.appendChild(divTitle);
    divHead.appendChild(divButtons);
    divPanel.appendChild(divHead);
    divPanel.appendChild(divBody);

    divMinButton.addEventListener('click', (event) => {
        let target = event.target;
        if (target.classList.contains('button')) {
            let elem = target.parentNode.parentNode.nextElementSibling;
            elem.classList.toggle('hidden');
            if (elem.classList.contains('hidden'))
                localStorage.setItem(`panel-${panelNumber}`, 'hidden');
            else
                localStorage.setItem(`panel-${panelNumber}`, 'visible');
        }
    });

    element.appendChild(divPanel);
    panelCount++;
    return divBody;
}
function showPanel(number) {
    let panel = document.querySelector(`.panel[data-number='${number}']`);
    let body = panel.querySelector('.body');
    body.classList.remove('hidden');
    localStorage.setItem(`panel-${number}`, 'visible');
}
function hidePanel(number) {
    let panel = document.querySelector(`.panel[data-number='${number}']`);
    let body = panel.querySelector('.body');
    body.classList.add('hidden');
    localStorage.setItem(`panel-${number}`, 'hidden');
}
function loadPanels() {
    for(let i = 0; i < panelCount; i++) {
        let state = localStorage.getItem(`panel-${i}`);
        if (state === 'hidden')
            hidePanel(i);
    }
}
let panelBodyOne = createPanel('Demo', 'One');
let panelBodyTwo = createPanel('Demo', 'Two', panelBodyOne);
createPanel('Demo', '3', panelBodyTwo);
createPanel('Demo', 'One');
createPanel('Demo', 'One');
createPanel('Demo', 'One');

loadPanels();
