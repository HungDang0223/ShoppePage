const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const playList = $('.playlist')
const player = $('.player')
const headingSong = $('header h2')
const cd = $('.cd')
const cdThumb = $('.cd-thumb')
const playBtn = $('.btn-toggle-play')
const prevBtn = $('.btn-prev')
const nextBtn = $('.btn-next')
const repeatBtn = $('.btn-repeat')
const randomBtn = $('.btn-random')
const progress = $('#progress')
const progressCurrentTime = $('.progress-current-time')
const progressDurationTime = $('.progress-duration-time')
const volume = $('#volume-range')
const iconVolume = $('.icon-volume') // Thay đổi icon khi volume thay đổi
const audio = $('#audio')
const audioSpeed = $$('.speed-item')
const speedList = $('.speed-list')
const settingIcon = $('.audio-setting-icon')

const app = {
    currentIndex : 0,
    isPlaying: false,
    isRepeating: false,
    isRandom: false,
    songs : [
        {
            name: "id 072019",
            singer: "3107",
            path: "./assets/music/id 072019.mp3",
            image: "./assets/image/Id 072019.jpg"
        },
        {
            name: "Anh sẽ đến cùng cơn mưa",
            singer: "3107",
            path: "./assets/music/Anh sẽ đến cùng cơn mưa.mp3",
            image: "./assets/image/emsedencungconmua.jpg"
        },
        {
            name: "I want it that way",
            singer: "Backstreet Boy",
            path: "./assets/music/i want it that way.mp3",
            image: "./assets/image/iwantitthatway.jpg"
        },
        {
            name: "That not how this works",
            singer: "Charli Puth",
            path: "./assets/music/that not how this work.mp3",
            image: "./assets/image/thatnothowthiswork.jpg"
        },
        {
            name: "Đôi mắt",
            singer: "Hanbi Tuấn Anh",
            path: "./assets/music/Đôi mắt.mp3",
            image: "./assets/image/doimat.jpg"
        },
        {
            name: "Ngày mai người ta lấy chồng",
            singer: "Hoài Lâm",
            path: "./assets/music/Ngày mai người ta lấy chồng.mp3",
            image: "./assets/image/ngaymainguoitalaychong.jpg"
        },
        {
            name: "Tại vì sao",
            singer: "MCK",
            path: "./assets/music/Tại vì sao.mp3",
            image: "./assets/image/taivisao.jpg"
        },
        {
            name : "Ôm em được không",
            singer : "Dickson",
            path : "./assets/music/Ôm em được không.mp3",
            image : "./assets/image/omemduockhong.jpg"
        }
    ],
    render: function() {
        const html = this.songs.map(function(song, index) {
            return `
                <div class="song ${index == 0 ? 'active' : ''}" id="song-${index}">
                    <div class="thumb" style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>`
        })
        playList.innerHTML = html.join('')
    },
    handleEvents: function() {
        const _this = this
        // Xử lý khi phóng to thu nhỏ CD
        const cdWidth = cd.offsetWidth
            document.onscroll = function() {
                const scrollTop = (window.scrollY || document.documentElement.scrollTop) * 0.75
                const newCdWidth = cdWidth - scrollTop
                cd.style.width = newCdWidth>0 ? newCdWidth +'px' : 0
                cd.style.opacity = newCdWidth / cdWidth
            }
        //Xử lý CD quay, dừng
        const cdThumbAnimate = cdThumb.animate(
            [
                {transform : 'rotate(360deg)'}
            ],
            {
                duration: 10000,
                iterations : Infinity,
            }
        )
        cdThumbAnimate.pause()

        // Xử lý render + nút pause khi chuyển bài mới
        const listSong = $$('.song')
        listSong.forEach((song, index) => {
            song.onclick = function() {
                // Chọn bài mới -> song bị pause, reset value progress
                _this.isPlaying = false
                player.classList.remove('playing')
                audio.pause()
                progress.value=0
                // Lấy currentIndex rồi load bài hát hiện tại
                _this.currentIndex = index
                _this.loadCurrentSong()
            }
        })
        
        //Xử lý nút previous
        prevBtn.onclick = function() {
            _this.prevSong()
            audio.play()
            _this.scrollActiveSong()
        }
        // Xử lý nút next
        nextBtn.onclick = function() {
            _this.nextSong()
            audio.play()
            _this.scrollActiveSong()
        }
        //Xử lý nút repeat
        repeatBtn.onclick = function() {
            if (_this.isRepeating) {
                _this.isRepeating = false
                repeatBtn.classList.remove('focus')
            } else {
                _this.isRepeating = true
                _this.isRandom = false
                repeatBtn.classList.add('focus')
                randomBtn.classList.remove('focus')
            }
        }
        // Xử lý nút random
        randomBtn.onclick = function() {
            if (_this.isRandom) {
                _this.isRandom = false
                randomBtn.classList.remove('focus')
            } else {
                _this.isRandom = true
                _this.isRepeating = false
                randomBtn.classList.add('focus')
                repeatBtn.classList.remove('focus')
            }
            _this.scrollActiveSong()
        }

        // Xử lý play/pause
        playBtn.onclick = function() {
            if (_this.isPlaying) {
                // Khi song đang play
                audio.pause()
            } else {
                // Khi song đang bị pause
                audio.play()
            }
        }
        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }
        audio.onplay = function() {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }
        // Xử lý thời gian sang dạng mm::ss
        function secondsToHHMM(seconds) {
            const minutes = Math.floor((seconds % 3600) / 60);
            const remainingSeconds = seconds % 60;
          
            const formattedTime =
            `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
          
            return formattedTime;
        }
        // Xử lý tiến trình phát nhạc
        var timeupdateProgressFunction = function() {
            if (audio.duration) {
                progress.value = (audio.currentTime / audio.duration * 100)
            }
        }
        var timeupdateCurrenttimeFunction = function() {
            progressCurrentTime.innerHTML = secondsToHHMM(Math.floor(audio.currentTime))
        }
        audio.addEventListener('timeupdate', timeupdateProgressFunction)
        audio.addEventListener('timeupdate', timeupdateCurrenttimeFunction)

        // progress.oninput = function() {
        //     audio.currentTime = progress.value / 100 *audio.duration
        // }
        
        // Hiển thị duration time của bài hát
        audio.onloadedmetadata = function() {
            progressDurationTime.innerHTML = secondsToHHMM(Math.floor(audio.duration))
        }
        // Xử lý khi tua
        progress.onchange = function(e) {
            audio.currentTime = (e.target.value / 100 * audio.duration)
        }
        // Xử lý khi audio ended
        audio.onended = function() {
            _this.nextSong()
            audio.play()
        }
        // Xử lý thay đổi volume khi thay đổi thanh điều chỉnh volume + icon của volume
        volume.oninput = function(e) {
            audio.volume = e.target.value / 100
            if (e.target.value >= 60) {
                iconVolume.classList.remove('fa-volume-down')
                iconVolume.classList.remove('fa-volume-off')
                iconVolume.classList.add('fa-volume-up')
            } else if (e.target.value > 0 && e.target.value < 60) {
                iconVolume.classList.remove('fa-volume-up')
                iconVolume.classList.remove('fa-volume-off')
                iconVolume.classList.add('fa-volume-down')
            } else {
                iconVolume.classList.remove('fa-volume-down')
                iconVolume.classList.remove('fa-volume-up')
                iconVolume.classList.add('fa-volume-off')
            }
        }
        // Xu ly khi chon speed
        audioSpeed.forEach((item, index) => {
            item.onclick = () => {
                getvaluechild = $(`.speed-item:nth-child(${index+1}) .speed-item-value`);
                audio.playbackRate = getvaluechild.innerText == 'Chuẩn' ? 1 : getvaluechild.innerText
                getIconNoCheck = $(`.speed-item:nth-child(${index+1}) .icon-check-speed`)
                getIconChecked = $(`.speed-item .display-icon-check`)
                
                if (getIconNoCheck.classList.contains('display-icon-check') == false)
                    getIconChecked.classList.remove('display-icon-check')
                    getIconNoCheck.classList.add('display-icon-check')
            }
        })
        speedList.onmousedown = function(e) {
            e.preventDefault()
        }
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    loadCurrentSong: function() {
        headingSong.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
        this.activeSong()
    },
    prevSong: function() {
        if (this.isRandom) {
            this.playRandomSong()
        } else if(this.isRepeating) {
            this.playRepeatSong()
        } else {
            this.currentIndex = this.currentIndex==0 ? this.songs.length-1 : this.currentIndex-1
            this.loadCurrentSong()
        }
        
    },
    nextSong: function() {
        if (this.isRandom) {
            this.playRandomSong()
        } else if (this.isRepeating) {
            this.playRepeatSong()
        } else {
            this.currentIndex = this.currentIndex==this.songs.length-1 ? 0 : this.currentIndex+1
            this.loadCurrentSong()
        }
        
    },
    playRepeatSong: function() {
        this.loadCurrentSong()
    },
    playRandomSong: function() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while(newIndex === this.currentIndex);
        this.currentIndex = newIndex;
        this.loadCurrentSong()
    },
    activeSong: function() {
        var song = $('.song.active')
        song.classList.remove('active')
        activeSong = $(`#song-${this.currentIndex}`)
        activeSong.classList.add('active')
    },
    // Cuộn tới bài hát đang active
    scrollActiveSong: function() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'end'
            })
        }, 200)
    },
    start: function() {
        //Render playlist
        this.render();

        // Định nghĩa các thuộc tính cho object
        this.defineProperties();

        // Tải lên bài hát hiện tại
        this.loadCurrentSong();

        // Xử lý các sự kiện
        this.handleEvents();

    }
}
app.start()