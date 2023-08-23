const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const successBtn = $('.btn--success')
const errorBtn = $('.btn--error')

function toast({title='', message='', type='', duration=3000}) {
    const main = document.getElementById('toast')
    if (main) {
        const toast = document.createElement('div')
        const icons = {
            success: 'fas fa-check-circle',
            info: 'fas fa-info-circle',
            warning: 'fas fa-exclamation-circle',
            error: 'fas fa-exclamation-circle'
        }
        const icon = icons[type]
        toast.classList.add('toast', `toast--${type}`);
        toast.style.animation = `slideFromLeft ease 0.5s, fadeOut linear 1s ${duration/1000}s forwards`
        const html = `
        <div class="toast__icon">
            <i class="${icon}"></i>
        </div>
        <div class="toast__body">
            <h3 class="toast__title">${title}</h3>
            <p class="toast__msg">${message}</p>
        </div>
        <div class="toast__close">
            <i class="fas fa-times"></i>
        </div>
        `
        toast.innerHTML = html;
        main.appendChild(toast);
        const autoRemove = setTimeout(function() {
            main.removeChild(toast)
        }, duration + 1000)

        toast.onclick = function(e) {
            if (e.target.closest('.toast__close')) {
                main.removeChild(toast)
                clearTimeout(autoRemove)
            }
        }
    }
}

function ShowSuccessToast() {
    toast({
        title: 'Success',
        message: 'Bạn đã đăng ký thành công tài khoản tại F8.',
        type: 'success',
        duration: 1000
    });
}
function ShowErrorToast() {
    toast({
        title: 'Error',
        message: 'Có lỗi xảy ra, vui lòng liên hệ quản trị viên.',
        type: 'error',
        duration: 3000
    });
}
// successBtn.onclick = ShowSuccesToast()
// errorBtn.onclick = ShowErrorToast()