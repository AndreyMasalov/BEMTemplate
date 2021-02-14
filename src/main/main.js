import * as styles from './main.scss';

import * as library from '../library.blocks/library.js';
import * as block from '../common.blocks/block/block.js';

window.addEventListener('DOMContentLoaded', () => {
    console.log(library.consoleLog('Hello'));
    block.clickChangeSizing('block__image', 'block__image_big', 'World');
});