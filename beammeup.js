var ctx = new AudioContext();

function playSound (buffer, playbackRate) {
  var source = ctx.createBufferSource();
  source.buffer = buffer;
  source.playbackRate.value = playbackRate;
  source.connect(ctx.destination);
  source.start(0);
}

function loadSound(url) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  // Decode asynchronously
  request.onload = function() {
    ctx.decodeAudioData(request.response, function(buffer) {

      var rate = 1.0;
      var timeoutLength = 600;
      function powerup () {
        if (rate > 2.65) {
	        return;
        }
        playSound(buffer, rate);
        rate += 0.05;
        timeoutLength *= 0.91;
        setTimeout(powerup, timeoutLength);
      };
      setTimeout(powerup, timeoutLength);
    });
  }
  request.send();
}

loadSound('/audio/sfx-power-up.ogg');
