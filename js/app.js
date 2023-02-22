const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const heading = $("header h2")
const cdThumb = $(".cd-thumb")
const audio = $("#audio")
const play = $(".player")
const btnStart = $('.btn-toggle-play')
const progress = $("#progress")
const lineProgress = $(".progress::-webkit-slider-thumb")
const btnNext = $('.btn-next')
const btnPrev = $('.btn-prev')
const btnRandom = $('.btn-random')
const btnRepeat = $('.btn-repeat')

const app = {
    indexCurrent: 0,
    isCheckplaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [
        {
            name: 'Bang Bang Bang',
            singer: "Big Bang",
            path: "./music/Bang_Bang_Bang_-_Big_Bang.mp3",
            image: "./img/bang_bang_bang.jpg"

        },
        {
            name: "Anh đứng đây từ chiều",
            singer: "Huy Vạc",
            path: "./music/anh_dung_tu_chieu_full_mv_huy_vac.mp3",
            image: "./img/Anh_đứng_đây_từ_chiều.jpg"
        },
        {
            name: "The River",
            singer: "Alan Walker",
            path: "./music/alan_walker_ft_axel_johansson_the_river_lyric.mp3",
            image: "./img/the_river.jpg"

        },
        {
            name: " IU",
            singer: "Bbibbi",
            path: "./music/Bbibbi-IU-5700172.mp3",
            image: "./img/bbibbi.jpg"

        },
        {
            name: " HARU HARU",
            singer: "Big Bang",
            path: "./music/BIGBANG_-_HARU_HARU하루하루_M_V.mp3",
            image: "./img/haruharu.jpg"

        },
        {
            name: " HARU HARU",
            singer: "Big Bang",
            path: "./music/BIGBANG_-_HARU_HARU하루하루_M_V.mp3",
            image: "./img/haruharu.jpg"

        },
        {
            name: " Let Not Fall In Love",
            singer: "Big Bang",
            path: "./music/BIGBANG_-_우리_사랑하지_말아요LETS_NOT_FALL_IN_LOVE_M_V.mp3",
            image: "./img/bigbang.jpg"
        },
        {
            name: "Bụi bay vào mắt",
            singer: "Phạm Quỳnh Anh",
            path: "./music/Bui_Bay_Vao_Mat_-_Pham_Quynh_Anh.mp3",
            image: "./img/bui_bay_vao_mat.jpg"
        },
        {
            name: "Chạy ngay đi",
            singer: "Sơn Tùng MTP",
            path: "./music/Chay_Ngay_Di_Run_Now__-_Son_Tung_M-TP_.mp3",
            image: "./img/run_now.jpg"
        },
        {
            name: "Cheer up",
            singer: "Twice",
            path: "./music/Cheer_Up_-_Twice.mp3",
            image: "./img/cheer_up.jpg"
        },
        {
            name: "Có không giữ mất đừng tìm",
            singer: "Cảnh Minh",
            path: "./music/Co_Khong_Giu_Mat_Dung_Tim_-_Canh_Minh.mp3",
            image: "./img/co_khong_giu_mat_dung_tim.jpg"
        },
        {
            name: "Có chắc yêu là đây",
            singer: "Sơn Tùng MTP",
            path: "./music/CoChacYeuLaDayOnionnRemix-SonTungMTPOnionn-7022615.mp3",
            image: "./img/co_chac_yeu_la_day.jpg"
        },
    ],
    render: function () {
        const htmls = this.songs.map((song,index) => {
            return `
            <div class="song" id="${index}">
                <div class="thumb" 
                    style="background-image: url('${song.image}')">
                </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>
            `
        })
        $('.playlist').innerHTML = htmls.join("")
       
    },
    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.indexCurrent]
            }
        })
    },
    loadCurrentSong: function () {

        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    
    },
    nextSong: function () {
        this.indexCurrent++
        if (this.indexCurrent >= this.songs.length) {
            this.indexCurrent = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function () {
        this.indexCurrent--
        if (this.indexCurrent < 0) {
            this.indexCurrent = this.songs.length - 1
        }
        this.loadCurrentSong()
    },
    randomSong: function () {
        let newindexCurrent
        do {
            newindexCurrent = Math.floor(Math.random() * this.songs.length)
        }
        while (newindexCurrent == this.indexCurrent)
        this.indexCurrent = newindexCurrent
        this.loadCurrentSong()
    },
    repeatSong: function () {
        this.loadCurrentSong()
    },
    activeSong : function (){
        
         const song = this.songs.map((song,index) =>{
            if (index == this.indexCurrent )
            {
                document.getElementById(index).classList.add('active')
                return song
            }
                return null
        } )
        const songActive = $('.song.active')
        console.log(songActive)
        
    },
    handleEvents: function () {
        // Xử lý scroll bài hát
        const _this = this
        const cd = $('.cd')
        const cdWidth = cd.offsetWidth
        document.onscroll = function () {
            const scollY = window.scrollY
            const newWidth = cdWidth - scollY
            cd.style.width = newWidth > 0 ? newWidth + 'px' : 0
            cd.style.opacity = newWidth / cdWidth
        }
        //Xử lý cd quay/ dừng
        const cdThumbAnimate = cdThumb.animate([{
            transform: 'rotate(360deg)'
        }], {
            duration: 10000, // 10 seconds
            iterations: Infinity
        })
        cdThumbAnimate.pause()
        // Xử lý click btn start
        btnStart.onclick = function () {
            if (_this.isCheckplaying) {
                audio.pause()
            }
            else {
                audio.play()
            }
        }
        audio.onplay = function () {
            _this.isCheckplaying = true
            play.classList.add('playing')
            cdThumbAnimate.play()
        }
        audio.onpause = function () {
            _this.isCheckplaying = false
            play.classList.remove('playing')
            cdThumbAnimate.pause()
        }
        // Xu ly progress chạy theo current time    
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }
        // Xu ly tua thanh progress
        progress.oninput = function (e) {
            const seekTime = (e.target.value * audio.duration / 100)
            audio.currentTime = seekTime
            //progress.style.width = (e.target.value/100*progress.offsetWidth) +'px'
        }
        // Xử lý btn random
        btnRandom.onclick = function () {
            _this.isRandom = !_this.isRandom
            btnRandom.classList.toggle('active', _this.isRandom)
        }
        // Xử lý btn repeat
        btnRepeat.onclick = function () {
            _this.isRepeat = !_this.isRepeat
            btnRepeat.classList.toggle('active', _this.isRepeat)
        }
        // Xử lý click button next 
        btnNext.onclick = function () {
            $('.song.active').classList.remove('active')
            if (_this.isRandom) {
                _this.randomSong()
            }
            else if (_this.isRepeat) {
                _this.repeatSong()
            }
            else {
                _this.nextSong()
            }
            audio.play()
            _this.activeSong()
        }
        // Xử lý click button prev
        btnPrev.onclick = function () {
            $('.song.active').classList.remove('active')
            if (_this.isRandom) {
                _this.randomSong()
            }
            else if (_this.isRepeat) {
                _this.repeatSong()
            }   
            else {
                _this.prevSong()
            }
            audio.play()
            _this.activeSong()
        }
        // Xử lý khi end song
        audio.onended = function () {
            btnNext.onclick()
        }
    },
    start: function () {
        this.defineProperties()// get current song
        this.handleEvents()// lắng nghe sư kiện của DOM events
        this.loadCurrentSong()
        this.render()
        this.activeSong()
    }
}
app.start()

