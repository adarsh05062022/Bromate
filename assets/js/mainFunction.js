let music = document.getElementById("audio");
let textareainput = document.getElementById("voice-input1");
let textareaoutput = document.getElementById("voice-input2");
let startbutton = document.getElementById("start-button-change");
let startsound = document.getElementById("startsound");

//  Function to speak--------

function speak(query) {
  var utterance = new SpeechSynthesisUtterance(query);
  textareaoutput.value = "output : " + utterance.text;
  console.log(utterance.text);
  window.speechSynthesis.speak(utterance);
}

var recognition = new webkitSpeechRecognition();

recognition.lang = "en-US";
recognition.onresult = function (event) {
  var text = event.results[0][0].transcript;
  
  textareaoutput.value = "";
  text = text.toLowerCase();
  startbutton.innerText = "Start Search 🎙️";
  search(text);
};

function startSearch() {
  startbutton.innerText = " Listening..... ";
  startsound.play();
  recognition.start();
}

function stopSearch() {
  startbutton.innerText = "Start Search 🎙️";
  recognition.stop();
}

//  Search On Youtube---------------

function searchOnYoutube(query) {
  let command = query.replace(/ on|search|youtube|YouTube|Youtube/gi, "");
  // console.log(command)
  if (query.includes("open") || query.includes("Open")) {
    speak("Opening Youtube");
    window.open("https://www.youtube.com/");
    return true;
  } else if (
    query.includes("search") ||
    query.includes("Search") ||
    query.includes("on youtube") ||
    query.includes("on Youtube") ||
    query.includes("on YouTube")
  ) {
    speak(`${command} on Youtube`);
    window.open(`https://www.youtube.com/results?search_query=${command}`);
    return true;
  }
}

//  Search On Google -----------

function searchOnGoogle(query) {
  // console.log(query)
  let command = query.replace(/ on|search|google|Google/gi, "");
  // console.log(command)
  if (query.includes("open") || query.includes("Open")) {
    speak("Opening Google");
    window.open("https://www.google.com");
    return true;
  } else if (
    query.includes("search") ||
    query.includes("Search") ||
    query.includes("on Google") ||
    query.includes("on google")
  ) {
    speak(` ${command} on google`);
    window.open(`https://www.google.com/search?q=${command}`);
    return true;
  }
}

// Get Date Time Details -----------

function getDateTime(query) {
  let currentDate = new Date();
  let command = query;

  if (command.includes("date") || command.includes("Date")) {
    speak(
      "Date is " +
        currentDate.getDate() +
        currentDate.toLocaleString("default", { month: "long" }) +
        currentDate.getFullYear()
    );
    return true;
  } else if (command.includes("month") || command.includes("Month")) {
    speak(
      "Current month is " +
        currentDate.toLocaleString("default", { month: "long" })
    );
    return true;
  } else if (command.includes("year") || command.includes("Year")) {
    speak("Current Year is " + currentDate.getFullYear());
    return true;
  } else if (command.includes("Day") || command.includes("day")) {
    speak(
      "Today is " + currentDate.toLocaleString("default", { weekday: "long" })
    );
    return true;
  } else if (command.includes("time") || command.includes("Time")) {
    speak("it's " + currentDate.getHours() + " " + currentDate.getMinutes());
    return true;
  }
}

// function to search on wikipedia--------

async function searchWikipedia(searchQuery) {
  let command = searchQuery.replace(
    / on|search|wikipedia|Wikipedia|wiki pedia/gi,
    ""
  );
  window.open("https://en.wikipedia.org/wiki/" + command);
  speak("Searching for " + command + " on Wikipedia");
  return true;
}

//  function to capture the screen----------

function capture() {
  html2canvas(document.body).then((canvas) => {
    var link = document.createElement("a");
    link.download = "screenshot.png";
    link.href = canvas.toDataURL();
    link.click();
    return true;
  });
}

// function to get a joke --------

function getJokes() {
  fetch("https://jokeapi.dev/joke/Any")
    .then((response) => response.json())
    .then((data) => {
      let joke = data.setup + " " + data.delivery;
      if (joke != "undefined undefined") {
        speak(joke);
      } else {
        const jokes = [
          "Why did the tomato turn red? Because it saw the salad dressing!",
          "Why don't scientists trust atoms? Because they make up everything!",
          "Why was the math book sad? Because it had too many problems.",
        ];
        let randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        speak(randomJoke);
      }
    });
  return true;
}

// main execution function-------

function search(query) {
  textareainput.value = "Input : " + query;
  console.log("Searching for: " + query);
  let command = query.split(" ");

  // Search on google-----

  if (command.includes("google")) {
    let result = searchOnGoogle(query);
    if (result) {
      return;
    }
  }

  // Search On Youtube-------

  if (command.includes("youtube")) {
    let result = searchOnYoutube(query);
    if (result) {
      return;
    }
  }

  // Get Date Time Details ------

  if (
    (command.includes("date") ||
      command.includes("month") ||
      command.includes("year") ||
      command.includes("day") ||
      command.includes("time")) &&
    command.includes("what")
  ) {
    let result = getDateTime(query);
    if (result) {
      return;
    }
  }

  // wikipedia --------

  if (command.includes("wikipedia")) {
    let result = searchWikipedia(query);
    if (result) {
      return;
    }
  }

  //  to play music -------

  if (command.includes("music") || command.includes("song")) {
    if (
      command.includes("play") ||
      command.includes("start") ||
      command.includes("turn on")
    ) {
      music.play();
    } else if (
      command.includes("stop") ||
      command.includes("pause") ||
      command.includes("turn off")
    ) {
      music.pause();
    }
    return;
  }

  // to take screenshot

  if (command.includes("screenshot") || command.includes("capture")) {
    let result = capture();
    if (result) {
      console.log(result + "--------");
      return;
    }
  }

  //  to tell jokes ----

  if (command.includes("joke")) {
    let result = getJokes();
    if (result) {
      return;
    }
  }

  if (command.includes("joke")) {
    let result = getJokes();
    if (result) {
      return;
    }
  }

  // opening websites -----

  if (command.includes("open")) {
    let search = query.replace("open", "");
    search = search.replace(" ", "");
    speak(`opening ${search}`);
    window.open(`https://www.${search}.com`);
    return;
  }

  if(command.includes("hello") || command.includes("hey")){
    speak("Hello")
    return;
  }
  if((command.includes("how") || command.includes("are"))&& command.includes("you")){
    speak("I am good I hope you are also good")
    return;
  }

  speak("Please provide correct information");
}
