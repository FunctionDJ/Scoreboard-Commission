var loading = true

const $$ = (query) => {
  return document.querySelector(query)
}

webSocket = new ReconnectingWebSocket(socketURL)

webSocket.onopen = () => {
  webSocket.send(tabID)
}

webSocket.onclose = e => {
  console.log("onclose event")
}

webSocket.onmessage = message => {
  var data = JSON.parse(message.data)
  console.log(`${socketURL} sent data for '${data.tabID}'`)
  console.log(data)

  // if received tabID equals to the tab we want
  if (data.tabID == tabID) {
    if (loading) {
      init(data)
      loading = false
    } else {
      update(data)
    }
  }
}

const init = data => {
  for(var property in data) {

    let ifGame = property.startsWith("game")
    let ifImage = property.startsWith("image")
    let ifPlayer = property.startsWith("player")
    let ifAB = property.endsWith("A") || property.endsWith("B")

    var elem = $$(`[data-sb=${property}]`);

    if (elem) {
      ifGame ? elem.innerText = data[property] : null
    }

    if (!ifAB) {
      if (ifPlayer) {
        var elemA = $$(`[data-sb=${property}A]`)
        var elemB = $$(`[data-sb=${property}B]`)
  
        var val = data[property]
        var valA = data[property + "A"]
        var valB = data[property + "B"]
  
        if (val === valA) {
          valA = ""
          valB = val
        }
  
        if (valA.trim() !== "") {
          valA = valA + " |"
        }
  
        elemA.innerText = valA
        elemB.innerText = valB
      } else if (elem) {
        if (ifImage) {
          elem.style.backgroundImage = `url("chars/${data[property]}.png")`
        } else if(!ifGame) {
          elem.innerText = data[property]
        }
      }
    }
  }

  skipInitFade ? null : $("body").animate({opacity: 1}, initFadeTime)
}

const update = data => {
  for(var property in data) {

    let ifGame = property.startsWith("game")
    let ifImage = property.startsWith("image")
    let ifPlayer = property.startsWith("player")
    let ifAB = property.endsWith("A") || property.endsWith("B")

    var elem = $$(`[data-sb=${property}]`);

    if (elem) {
      ifGame ? updateText(elem, data[property]) : null
    }

    if (!ifAB) {
      if (ifPlayer) {
        updatePlayer(data, property)
      } else if (elem) {
        if (ifImage) {
          updateImage(elem, data[property])
        } else if(!ifGame) {
          updateText(elem, data[property])
        }
      }
    }
  }
}

const updateImage = (elem, value) => {
  let newUrl = `url("chars/${value}.png")`
  if (elem.style.backgroundImage !== newUrl) {
    $(elem).animate({opacity: 0}, updateFadeTime, function() {
      elem.style.backgroundImage = newUrl
      $(elem).animate({opacity: 1}, updateFadeTime)
    })
  }
}

const updateText = (elem, value) => {
  if (elem.innerText !== value.toUpperCase()) {
    $(elem).animate({opacity: 0}, updateFadeTime, function() {
      elem.innerText = value
      $(elem).animate({opacity: 1}, updateFadeTime)
    })
  }
}

const updatePlayer = (data, property) => {

  var val = data[property].toUpperCase()
  var valA = data[property + "A"].toUpperCase()
  var valB = data[property + "B"].toUpperCase()

  if (val === valA) {
    valA = ""
    valB = val
  }

  if (valA.trim() !== "") {
    valA = valA + " |"
  }

  var elemA = $$(`[data-sb=${property}A]`)
  var elemB = $$(`[data-sb=${property}B]`)
  var elemP = $$(`[data-sb=${property}P]`)

  if (elemP) {
    if (elemA.innerText !== valA || elemB.innerText !== valB) {
      $(elemP).animate({opacity: 0}, updateFadeTime, function() {
        elemA.innerText = valA
        elemB.innerText = valB
        $(elemP).animate({opacity: 1}, updateFadeTime)
      })
    }
  } else {
    updateText(elemA, valA)
    updateText(elemB, valB)
  }
}