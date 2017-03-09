// ----
// DATA
// ----

// A couple jokes to start with
var j = JSON.parse(window.localStorage.getItem('jokes'))

var jokes = {}

if (j) {
  jokes = j
} else {
  jokes = {'the horse': {
    setup: 'A horse walks into the bar. The bartender asks...',
    punchline: 'Why the long face?'
  },
    'Orion\'s pants': {
      setup: 'How does Orion keep his pants up?',
      punchline: 'With an asteroid belt.'
    }
  }
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
  if (jokes[requestedJokeKey]) {
    jokeBox.innerHTML = '<p>' + jokes[requestedJokeKey]['setup'] + '</p>' + '<p>' + jokes[requestedJokeKey]['punchline'] + '</p>'
  } else {
    jokeBox.textContent = 'No matching joke found.'
  }
}

// Forget a bad joke
var forget = document.getElementById('forget')
var forgetjoke = function () {
  var del = document.getElementById('delete').value
  delete jokes[del]
  window.localStorage.setItem('jokes', JSON.stringify(jokes))
  updatePage()
}

// remember a good joke
var memory = document.getElementById('memory')
var remjoke = function () {
  var jkbout = document.getElementById('jkbout').value
  var setup = document.getElementById('setup').value
  var punchline = document.getElementById('punchline').value
  jokes[jkbout] = { setup: setup, punchline: punchline }
  window.localStorage.setItem('jokes', JSON.stringify(jokes))
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
requestedJokeInput.addEventListener('input', updateDisplayedJoke)
forget.addEventListener('click', forgetjoke)
memory.addEventListener('click', remjoke)
