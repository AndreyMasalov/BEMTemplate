'use strict';

import * as library from '../libs/library.js';
import * as block from '../blocks/block/block.js';

window.addEventListener('DOMContentLoaded', () => {
    console.log(library.consoleLog('Hello'));
    block.clickChangeSizing('block__image', 'block__image_big', 'World');
});