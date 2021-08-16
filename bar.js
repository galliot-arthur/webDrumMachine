const sounds = [
    "BD",
    "SD",
    "CP",
    "CH",
    "OH",
    "CY"
]
let preset1 = [
    BD = [1, 0, 2, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 2],
    SD =[0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0],
    CP =[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2],
    CH =[1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 1, 0, 1, 0, 1, 2],
    OH =[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
    CY =[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]
let grid = []
const barContainer = document.querySelector('.barContainer');
let bpm = 88
let bpmToStep = () => {
    return 60000 / bpm / 4
}
const playSample = (id, velocity) => {
    let sound = document.getElementById(id)
    velocity === 2 ? sound.volume = 0.4 : sound.volume = 1
    sound.play()
}
const stopSample = (id) => {
    let sound = document.getElementById(id)
    sound.pause()
    sound.currentTime = 0
}

const bpmOnScreen = (bpm) => {
    bpmScreen.innerHTML = `${bpm} BPM`
}

const bpmLowerButton = document.querySelector('.bpmLower')
const bpmScreen = document.querySelector('.bpmScreen')
const bpmHigherButton = document.querySelector('.bpmHigher')

bpmLowerButton.onclick = () => { 
    bpm--
    bpmOnScreen(bpm)
    console.log(bpmToStep())

}
bpmHigherButton.onclick = () => {
    bpm++
    bpmOnScreen(bpm)
    console.log(bpmToStep())
}

/**
 * Find the good button and show user it's playing.
 * @param {String} sound 
 */
const colorSoundButton = (sound) => {
    let soundButton = document.getElementById(`btn-${sound}`)
    setTimeout(() => {
        soundButton.style.backgroundColor = "rgba(86, 163, 105, 0.705)";
        console.log(soundButton)
    }, 75)
    soundButton.style.backgroundColor = "white";
    
}

/**
 * Allow the recording of the trigger sample in an array.
 * @param {String} sound Corresponding sounds to trig
 * @param {number} i Step trigged
 * @param {HTMLElement} trig Trigger
 */
const trigSample = (sound, i, trig) => {
    if (grid[sound][i] === 0) {
        grid[sound][i] = 1
        trig.style.backgroundColor = "#475049"
    } else if (grid[sound][i] === 1) {
        grid[sound][i] = 2
        trig.style.backgroundColor = "#738076"
    } else if (grid[sound][i] === 2) {
        grid[sound][i] = 0
        trig.style.backgroundColor = "#a6b3a9"
    }
}

sounds.forEach(sound => {
    let btn = document.createElement('button')
    let sampleContainer = document.createElement('div')
    btn.classList.add('btn')
    btn.id = `btn-${sound}`
    sampleContainer.classList.add('sampleContainer')
    btn.innerHTML = sound
    btn.onclick = () => playSample(sound)

    barContainer.appendChild(sampleContainer)
    sampleContainer.appendChild(btn)

    grid[sound] = []

    for (let i = 0; i < 16; i++) {
        let trig = document.createElement('button')
        trig.classList.add('trig')
        if (i === 0 || i === 4 || i === 8 || i === 12) {
            trig.classList.add('higher')
        }
        sampleContainer.appendChild(trig)
        grid[sound].push(0)
        trig.onclick = () => trigSample(sound, i, trig)
    }
})

/**
 * Let the music be
 * @param {number} bpm beat per minute
 */
const play = (bpm) => {
    let step = 0    
    playing = setInterval(() => {
        if (step === 16) { step = 0 }
        sounds.forEach(sound => {
            if (grid[sound][step]=== 1 || grid[sound][step] === 2) {
                velocity = 1
                stopSample(sound)
                playSample(sound, grid[sound][step])
                colorSoundButton(sound)
            }
        })
        step++
    }, bpm)
    stopButton.classList.remove('hide')
    playButton.classList.add('hide')
    bpmLowerButton.classList.add('hide')
    bpmScreen.classList.add('hide')
    bpmHigherButton.classList.add('hide')
}

/**
 * Stop the music and go home
 */
const stop = () => {
    clearInterval(playing)
    playButton.classList.remove('hide')
    stopButton.classList.add('hide')
    bpmLowerButton.classList.remove('hide')
    bpmScreen.classList.remove('hide')
    bpmHigherButton.classList.remove('hide')
}

const playButton = document.querySelector('.play')
playButton.onclick = () => play(bpmToStep())

const stopButton = document.querySelector('.stop')
stopButton.onclick = () => stop()

const presetButton = document.querySelector('.preset')
presetButton.onclick = () => grid = preset1


const result = document.querySelector('.result')
console.log(grid)

