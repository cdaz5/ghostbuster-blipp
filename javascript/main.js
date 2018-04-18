var blipp = require('blippar').blipp;

blipp.getPeel()
     .setOrientation('portrait')
     .setType('fit');

// Global variables
var mW = blipp.getMarker().getWidth();
var mH = blipp.getMarker().getHeight();
var sW = blipp.getScreenWidth() * 1.003;
var sH = blipp.getScreenHeight() * 1.003; 

// Scene creation

var scene = blipp.addScene();

scene.onCreate = function() {
  // various sound effects used
  scene.introMusic = 'gb-intro.mp3';
  scene.ghostbustersTheme = 'gb-theme.mp3';
  scene.siren = 'siren.mp3';
  scene.toast = 'toast.mp3';

 // ensure loading of them
  scene.addRequiredAssets([
    scene.introMusic, 
    scene.ghostbustersTheme, 
    scene.siren, 
    scene.toast
  ]);

   // main image creation and set to scale to marker
  var ghostBustersLogo = scene.addSprite().setTexture('ghostbusters.png').setScale(mW, mH, 1);

  // car creation and set to top right of screen
  var echmobile = createCorner(0, sW/2, sH/2, 'echomobile.png');

    // slimer creation and set to bottom left of screen
  var slimer = createCorner(180, -sW/2, -sH/2, 'slimer.png');

  // touch event listener to slimer that will send to external link
  slimer.onTouchEnd = function() {
    blipp.goToURL("https://www.imdb.com/title/tt0087332/");
  }

  // touch event listener to car setting up animations and sound
  echmobile.onTouchEnd = function() {
    scene.playSound(scene.siren, false, 2);
    animateAcross(this);
    animateDown(this);
    scene.playSound(scene.toast, false, 3);
    spinSlimer(slimer);
    sendOffSlimer(slimer);
  }

  // touch event listener on main logo setting up animation and sound
  ghostBustersLogo.onTouchEnd = function() {
    scene.playSound(scene.ghostbustersTheme, false, 1);
    animateMainLogo(this);
  };
};

// User/helper functions

function createCorner(rotZ, posX, posY, fileName) { 
  var sprite = scene.getScreen().addSprite()
  .setTexture(fileName)
  .setTranslation(posX, posY, 0)
  .setRotation(0, 0, rotZ)
  .setScale(sW/5)
  .setType('aura')               
  .setHAlign('right')
  .setVAlign('top');

  return sprite; 
};

var animateMainLogo = function(node) {
  node.animate()
  .translationX(0)
  .rotationZ(3600)
  .scaleX(800)
  .scaleY(800)
  .duration(16000);

  return node;
};

var animateAcross = function animateCarAcross(node) {
  node.animate()
  .translationX(-sW/2)
  .rotationZ(75)
  .duration(1000)
  .interpolator('easeIn');

  return node;
};

var animateDown = function animateCarDown(node) {
  node.animate()
  .delay(1000)
  .rotationZ(90)
  .translationY(-sH/3.5)
  .duration(1000)
  .interpolator('easeIn');

  return node;
};

var spinSlimer = function(node) {
  node.animate()
  .translationX(0)
  .rotationZ(3600)
  .delay(1900)
  .duration(1000);

  return node;
};

var sendOffSlimer = function(node) {
  node.animate()
  .translationY(-sH)
  .delay(3100)
  .duration(1000);
  
  return node;
};

scene.onShow = function() {
  scene.playSound(scene.introMusic, false, 3);
};

