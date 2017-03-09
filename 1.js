// ----
// DATA
// ----

// A couple jokes to start with
var j = window.localStorage.getItem('jokes')
j = JSON.parse(j)
var jokes = {
  'the horse': {
    setup: 'A horse walks into the bar. The bartender asks...',
    punchline: 'Why the long face?'
  },
  'Orion\'s pants': {
    setup: 'How does Orion keep his pants up?',
    punchline: 'With an asteroid belt.'
  }
}
if (j) {
  jokes = j
}

// The message to display if the jokes object is empty
var noJokesMessage = 'I... I don\'t know any jokes. 😢'

// -------------
// PAGE UPDATERS
// -------------

// Update the listed jokes, based on the jokes object
var jokesMenuList = document.getElementById('jokes-menu')
var updateJokesMenu = function () {
  // Don't worry too much about this code for now.
  // You'll learn how to do advanced stuff like
  // this in a later lesson.
  var jokeKeys = Object.keys(jokes)
  var jokeKeyListItems = jokeKeys.join('</li><li>') || noJokesMessage
  jokesMenuList.innerHTML = '<li>' + jokeKeyListItems + '</li>'
}

// Update the displayed joke, based on the requested joke
var requestedJokeInput = document.getElementById('requested-joke')
var jokeBox = document.getElementById('joke-box')
var updateDisplayedJoke = function () {
  var requestedJokeKey = requestedJokeInput.value
  jokeBox.textContent = requestedJokeKey
}
// Forget a bad joke
var forget = document.getElementById('forget')
var forgetjoke = function () {
  var del = document.getElementById('delete').value
  delete jokes[del]
  updatePage()
}

// remember a good joke
var memory = document.getElementById('memory')
var remjoke = function () {
  var jkbout = document.getElementById('jkbout').value
  var setup = document.getElementById('setup').value
  var punchline = document.getElementById('punchline').value
  jokes[jkbout] = { setup: setup, punchline: punchline }
  var nj = JSON.stringify(jokes)
  window.localStorage.setItem('jokes', nj)
  updatePage()
}

// Function to keep track of all other
// page update functions, so that we
// can call them all at once
var updatePage = function () {
  updateJokesMenu()
  updateDisplayedJoke()
}

// -------
// STARTUP
// -------

// Update the page immediately on startup
updatePage()

// ---------------
// EVENT LISTENERS
// ---------------

// Keep the requested joke up-to-date
// jokes.addEventListener('change', function () {
//  jokes[j.value]
 //})
requestedJokeInput.addEventListener('input', updateDisplayedJoke)
forget.addEventListener('click', forgetjoke)
memory.addEventListener('click', remjoke)
