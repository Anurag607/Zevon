const zoomIn = () => {
    let imageContainer = document.querySelector(".image-container")
    let overlay = document.querySelector(".overlay")
    let mouseOverlay = document.querySelector(".mouse-overlay")
    let itemDetails = document.querySelector(".itemDetails")
    
    let events = {
      mouse: {
        move: "mousemove",
      },
      touch: {
        move: "touchmove",
      },
    }
    
    let deviceType = "";
    
    function isTouchDevice() {
      try {
        deviceType = "touch"
        document.createEvent("TouchEvent")
        return true
      } catch (e) {
        deviceType = "mouse"
        return false
      }
    }
    
    const hideElement = () => {
      overlay.style.display = "none"
      mouseOverlay.style.display = "none"
      itemDetails.style.tansform = "translateX(0rem)"
    }
    
    isTouchDevice()
    
    imageContainer.addEventListener(events[deviceType].move, (e) => {
      
      try {
        var x = !isTouchDevice() ? e.pageX : e.touches[0].pageX;
        var y = !isTouchDevice() ? e.pageY : e.touches[0].pageY;
      } catch (e) {
        console.error(e.message)
      }
      let imageWidth = imageContainer.offsetWidth
      let imageHeight = imageContainer.offsetHeight
    
      if (
        imageWidth - (x - imageContainer.offsetLeft) < 15 ||
        x - imageContainer.offsetLeft < 15 ||
        imageHeight - (y - imageContainer.offsetTop) < 15 ||
        y - imageContainer.offsetTop < 15
      ) {
        hideElement()
      } else {
        overlay.style.display = "block"
        mouseOverlay.style.display = "inline-block"
        itemDetails.style.tansform = "translateX(6.75rem)"
      }
      overlay.onmouseover = () => {
        hideElement()
      }
      var posX = ((x - imageContainer.offsetLeft) / imageWidth).toFixed(4) * 100
      var posY = ((y - imageContainer.offsetTop) / imageHeight).toFixed(4) * 100
      overlay.style.backgroundPosition = posX + "%" + posY + "%"
      mouseOverlay.style.top = y + "px"
      mouseOverlay.style.left = x + "px"
    })
}

export default zoomIn