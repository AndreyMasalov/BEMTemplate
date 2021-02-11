window.addEventListener('DOMContentLoaded', () => {

    const blockImage = document.getElementsByClassName('block__image');

    Array.from(blockImage).forEach((item, index) => {

        item.addEventListener('click', () => {

            item.classList.toggle('block__image_big');
            console.log('Click item ' + index);
            
        });

    });

});