const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable button 
function toggleButton() {
    button.disabled = !button.disabled;    // toggle opposite 
}

// Passing Joke to VoiceRSS API
function tellMe(joke) {
    console.log('tell me:', joke); 
    VoiceRSS.speech({
        key: '88d9f70cebd34a149fd15467888c321c',
        src: joke,
        hl: 'en-us',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Joke api
async function getJokes() {
    let joke = ''; 
    const apiUrl = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
       const response = await fetch(apiUrl); 
       const data = await response.json(); 
       
       // For jokes with setup and delivery
       if (data.setup) {
        joke = `${data.setup} ... ${data.delivery}`;
       } else {
        joke = data.joke;
       }
       //Text-to-Speech
       tellMe(joke);
       // Disable Button 
       toggleButton();
    } catch (error) {
        // Catch errors 
        console.log('whoops', error); 
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);