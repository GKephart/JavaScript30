/* get elements*/
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* build out functions */
function togglePLay() {
	console.log(video);
	video[video.paused ? 'play' : 'pause']();
}

function updateButton(){
	toggle.textContent = this.paused ? '►' : '❚ ❚';
	console.log('did I do that');
}

function skip() {
	video.currentTime += parseFloat(this.dataset.skip);
	console.log('trying to skip Dylans horrible ')
}

function handleRangeUpdate() {
	video[this.name] = this.value;
}

function handleProgress() {
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
	video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
	console.log(e);
}

/*  hook up the event listeners */
toggle.addEventListener('click', togglePLay);
video.addEventListener('click', togglePLay);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
video.addEventListener('play', updateButton);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove',(e) =>mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

