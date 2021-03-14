'use strict';

import * as library from '../library/library.js';
import * as block from '../common/block/block.js';

window.addEventListener('DOMContentLoaded', () => {
    console.log(library.consoleLog('Hello'));
    block.clickChangeSizing('block__image', 'block__image_big', 'World');
});