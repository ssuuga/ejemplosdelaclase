let monitorear = false;

let mic;
let pitch;
let audioContext;

let c;
let gestorAmp;
let gestorPitch;
let haySonido;
let antesHabiaSonido;

const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';

function setup() {
  createCanvas(displayWidth, displayHeight);

  //inicializo la escucha de sonido
  audioContext = getAudioContext();
	mic = new p5.AudioIn();
  //acá le pido que llame a startPitch
  mic.start( startPitch );

  gestorAmp = new GestorSenial( 0.01 , 0.4 );
  gestorPitch = new GestorSenial( 40 , 80 );

  //hay que agregar esto
	userStartAudio();

  c = new Caminante();
  background(255);
  antesHabiaSonido = false;
}

function draw() {
  
  let vol = mic.getLevel();
  gestorAmp.actualizar( vol );

  haySonido = gestorAmp.filtrada>0.1;
  let inicioElSonido = haySonido && !antesHabiaSonido;
  let finDelSonido = !haySonido && antesHabiaSonido;

  if( inicioElSonido ){
    c = new Caminante();
  }
  /*
  if( finDelSonido ){
    push();
    strokeWeight(10);
    noFill();
    ellipse( c.x , c.y , 100 , 100 );
    pop();
  }
  */

  if( haySonido ){
    c.actualizar( gestorAmp.filtrada , gestorPitch.filtrada ,
      gestorPitch.derivada );
    c.mover();
    c.dibujar();
  }
  

  if( monitorear ){
    gestorAmp.dibujar( 100 , 100 );
    gestorPitch.dibujar( 100 , 300 );
  }
  
  antesHabiaSonido = haySonido;
}
//--------------------------------------------------------------------
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
//--------------------------------------------------------------------
function startPitch() {
  pitch = ml5.pitchDetection(model_url, audioContext , mic.stream, modelLoaded);
}
//--------------------------------------------------------------------
function modelLoaded() {
//select('#status').html('Model Loaded');
getPitch();
//console.log( "entro aca !" );

}
//--------------------------------------------------------------------
function getPitch() {
  pitch.getPitch(function(err, frequency) {
  if (frequency) {    	
    let midiNum = freqToMidi(frequency);
    //console.log( midiNum );

    gestorPitch.actualizar( midiNum );

  }
  getPitch();
})
}
