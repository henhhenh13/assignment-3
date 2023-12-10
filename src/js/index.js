const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


const product= document.querySelector('.product')
const mainImg = product.querySelector('.main-image')
const imageElements = product.querySelector('.images').querySelectorAll('img')
const modal = product.querySelector('.modal')
const modalMainImg = modal.querySelector('.main-image')
const closeModalButton = modal.querySelector('button.close')
const closeModalBackground = modal.querySelector('.background');
const nextImageButton = modal.querySelector('button.right')
const prevImageButton = modal.querySelector('button.left')


const app = {
    step: 0,
    activatedZoomIn: false,
    toggleShowModal: function () {
        modal.classList.toggle('show')
    },
    changeMainImage: function (imgUrl) {
        mainImg.src = imgUrl;
        modalMainImg.src = imgUrl
    },
    nextImage: function () {
        if (this.step + 1 < imageElements.length) {
            this.step++
            this.changeMainImage(imageElements[this.step].src)
            this.activeImage()
        }
    },
    prevImage: function () {
        if (this.step - 1 >= 0) {
            this.step--
            this.changeMainImage(imageElements[this.step].src)
            this.activeImage()
        }
    },

    carouselKeywordEvent: function (e) {
        if (e.key === 'ArrowRight') {
            this.nextImage()
        }
        if (e.key === 'ArrowLeft') {
            this.prevImage()
        }
    },

    activeImage: function () {
        imageElements.forEach((img) => {
            img.classList.remove('active')
        })
        imageElements[this.step].classList.add('active')
    },

    handleZoomIn: function () {
        modalMainImg.style.scale = '2'
    },

    handleZoomOut: function () {
        modalMainImg.style.scale = '1'
    },

    handleEvents: function () {
        const _this = this;
        const carouselKeywordEventHandler = this.carouselKeywordEvent.bind(this);

        mainImg.onclick =  function () {
            _this.toggleShowModal()
            if (modal.className.includes('show')) {
                window.addEventListener("keyup", carouselKeywordEventHandler)
            } else {
                window.removeEventListener("keyup", carouselKeywordEventHandler)
            }
        }

        imageElements.forEach(function(img, index)  {
            img.onclick = function ()  {
                _this.changeMainImage(img.src)
                _this.step = index
                _this.activeImage()
            }
        })

        nextImageButton.onclick = function () {
            _this.nextImage()
        }

        prevImageButton.onclick = function () {
            _this.prevImage()
        }

        closeModalButton.onclick = function() {
            _this.toggleShowModal()
            window.removeEventListener("keyup", carouselKeywordEventHandler)
        }

        closeModalBackground.onclick = function() {
            _this.toggleShowModal()
            window.removeEventListener("keyup", carouselKeywordEventHandler)
        }

        modalMainImg.onclick = function () {
            if (!_this.activatedZoomIn) {
                _this.activatedZoomIn = true;
                _this.handleZoomIn()
            } else {
                _this.activatedZoomIn = false;
                _this.handleZoomOut()
            }
        }


    },
    start: function() {
        this.handleEvents();
    }

}

app.start();