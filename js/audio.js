export function playAudio(audioElement, volume) {
  audioElement.volume = volume;

  const playPromise = audioElement.play();

  if (playPromise) {
    playPromise.catch(() => {});
  }
}

export function fadeAudio(audioElement, targetVolume, duration) {
  const startTime = performance.now();

  function animateFade(currentTime) {
    const elapsedTime = currentTime - startTime;

    const progress = Math.min(elapsedTime / duration, 1);

    audioElement.volume = targetVolume * progress;

    if (progress < 1) {
      requestAnimationFrame(animateFade);
    }
  }

  requestAnimationFrame(animateFade);
}
