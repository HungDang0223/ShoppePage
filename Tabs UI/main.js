const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
var getListMediaItems = $$('.media-item')
var getListMediaPanes = $$('.media-pane')
var tabActive = $('.media-item.active')
var line = $('.line')
line.style.left = tabActive.offsetLeft + 'px'
line.style.width = tabActive.offsetWidth + 'px'

getListMediaItems.forEach((item, index) => {
    item.onclick = function() {
        $('.media-item.active').classList.remove('active');
        $('.media-pane.display').classList.remove('display')

        this.classList.add('active')
        getListMediaPanes[index].classList.add('display')

        line.style.left = this.offsetLeft + 'px'
        line.style.width = this.offsetWidth + 'px'
    } 
});

var tabActive = $('.media-item.active')
var line = $('.line')
line.style.left = tabActive.offsetLeft + 'px'
line.style.width = tabActive.offsetWidth + 'px'