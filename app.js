
var gui = new dat.GUI({ autoPlace: false });
document.querySelector('#controls-container').appendChild(gui.domElement)

document.querySelector('#controls-button').addEventListener('click', function(){
  document.querySelector('#controls-container').style.display = 'block';
  document.querySelector('#controls-button').style.display = 'none';
}, false)

var effects = {
  Delay: {
    active: true,
    feedback: [0, 1, 0.07],
    time: [0, 5, 0.4],
    mix: [0, 1, 0.18]
  },
  PingPongDelay: {
    active: false,
    feedback: [0, 1],
    time: [0, 5],
    mix: [0, 1]
  },
  DubDelay: {
    active: false,
    feedback: [0, 1],
    time: [0, 5],
    mix: [0, 1],
    cutoff: [0, 4000]
  },
  Distortion: {
    active: false,
    gain: [0, 1]            
  },
  Flanger: {
    active: true,
    time: [0, 1],
    speed: [0, 1],
    depth: [0, 1],
    feedback: [0, 1],
    mix: [0, 1]
  },
  Reverb: {
    active: true,
    time: [0, 3],
    decay: [0, 3],
    reverse: false,
    mix: [0, 1] 
  },
  StereoPanner: {
    active: false,
    pan: [0, 1]              
  },
  Compressor: {
    active: false,
    threshold: [-100, 0],
    knee: [0, 40],
    attack: [0, 1],
    release: [0, 1],
    ratio: [1, 20]    
  },
  LowPassFilter: {
    active: false,
    frequency: [10, 22050],
    peak: [0, 20]    
  },
  HighPassFilter: {
    active: false,
    frequency: [10, 22050],
    peak: [0, 20]    
  },
  RingModulator: {
    active: false,
    speed: [0, 2000],
    distortion: [0, 50],
    mix: [0, 1]    
  }
}

var input = {}
var fxs = []


Object.keys(effects).forEach(function(effectName){
  var effect = effects[effectName]
  var folder = gui.addFolder(effectName)
  input[effectName] = {}
  Object.keys(effect).forEach(function(attrName){
    var attr = effect[attrName]
    if (typeof attr === 'boolean') {
      input[effectName][attrName] = attr
      folder.add(input[effectName], attrName).onFinishChange(loadSettings)
    } else if (Array.isArray(attr)) {
      input[effectName][attrName] = attr.length >= 3 ? attr[2] : (attr[0] + attr[1]) / 2
      folder.add(input[effectName], attrName, attr[0], attr[1]).onFinishChange(loadSettings)
    }
  })
})


var voice = new Pizzicato.Sound({ source: 'input' }, init);

function init () {
  for (var i in gui.__controllers) {
    gui.__controllers[i].updateDisplay();
  }

  loadSettings()
  voice.play()
}

function loadSettings () {
  fxs.forEach(function(fx){ voice.removeEffect(fx) })
  fxs = []

  Object.keys(input).forEach(function(effectName){
    var effect = input[effectName]
    if (effect.active) {
      var fx = new Pizzicato.Effects[effectName](effect)
      fxs.push(fx)
      voice.addEffect(fx)
    }
  })
}


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(function(registration) {})
}
