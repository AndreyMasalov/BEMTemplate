'use strict';
import * as libraryBlock from '../../library/block/library-block.js';

function clickChangeSizing(classNameElement, classNameModifier, message) {
    const element = document.getElementsByClassName(classNameElement);
    Array.from(element).forEach((item, index) => {
        item.addEventListener('click', () => {
            item.classList.toggle(classNameModifier);
            console.log('Click item' + index);
            libraryBlock.consoleLog(message);
        })
    })
}

export { clickChangeSizing };