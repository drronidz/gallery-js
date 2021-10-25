function getElement(selection) {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  }
  throw new Error(
    `Please check "${selection}" selector, no such element exists`
  );
}

function Gallery(element) {
  this.container = element
  this.list = [...element.querySelectorAll('.img')]

  // target
  this.modal = getElement('.modal');
  this.modalImg = getElement('.main-img')
  this.modalImages = getElement('.modal-images')
  this.imageName = getElement('.image-name')
  this.closeBtn = getElement('.close-btn')
  this.nextBtn = getElement('.next-btn')
  this.prevBtn = getElement('.prev-btn')
  console.log(this.list)

  // bind functions
  // this.openModal = this.openModal.bind(this)
  this.closeModal = this.closeModal.bind(this)
  this.nextImage = this.nextImage.bind(this)
  this.prevImage = this.prevImage.bind(this)

  this.container.addEventListener('click', function (event) {
    if(event.target.classList.contains('img')) {
      this.openModal(event.target, this.list)
    }
    this.openModal()
  }.bind(this))
  this.closeBtn.addEventListener('click', this.closeModal)
  this.nextBtn.addEventListener('click', this.nextImage)
  this.prevBtn.addEventListener('click', this.prevImage)
}

Gallery.prototype.openModal = function (selectedImage, imageList) {
  console.log('Selected Image :', selectedImage)
  console.log('Image List :',imageList)
  this.setMainImage(selectedImage)
  this.modalImages.innerHTML = imageList.map(function (image) {
    return ` 
           <img src=${image.src} 
                title=${image.title} 
                data-id=${image.dataset.id}
                class=${selectedImage.dataset.id === image.dataset.id ? "modal-img selected" : "modal-img"}  
                alt="image${image.dataset.id}"/>`
  }).join('')
  this.modal.classList.add('open')
}

Gallery.prototype.setMainImage = function (selectedImage) {
  console.log('Here : ', selectedImage)
  this.modalImg.src = selectedImage.src
  this.imageName.textContent = selectedImage.title
}

Gallery.prototype.closeModal = function () {
  this.modal.classList.remove('open')
  this.closeBtn.removeEventListener('click', this.closeModal)
  this.nextBtn.removeEventListener('click', this.nextImage)
  this.prevBtn.removeEventListener('click', this.prevImage)
}

Gallery.prototype.nextImage = function () {

}

Gallery.prototype.prevImage = function () {

}

const nature = new Gallery(getElement('.nature'))
const city = new Gallery(getElement('.city'))
