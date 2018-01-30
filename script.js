const form = document.querySelector('form');
const TwitchJS = window.TwitchJS;
const messages = document.querySelector('#messages');
const width = window.innerWidth / 2;
const height = window.innerHeight - (window.innerHeight * .1);
const channelInput = form.querySelector('#channelInput');

const onSubmit = (event) => {
  event.preventDefault();
  const channel = channelInput.value;
  form.style.display = 'none';

  getEmoji(channel);
  connectToChat(channel);
};

const getEmoji = (channel) => {
  twitchEmoji.add(channel, (err) => {
    if (err) {
      console.log("Error!");
    } 
  });
}

const connectToChat = (channel) => {
  // Define client options
  const options = {
    options: {
      debug: false
    },
    connection: {
      reconnect: true,
      secure: true
    },
    channels: [`#${channel}`]
  };

  const client = new TwitchJS.client(options);

  // Add listeners for events, e.g. a chat event
  client.on('chat', (channel, userstate, message, self) => {
  
    // Add chat message to new span
    const newSpan = document.createElement('span');
    const emojiMessage = twitchEmoji.parse(message);
    newSpan.innerHTML = emojiMessage;
    messages.appendChild(newSpan);

    // Add styling to span
    newSpan.style.color = "#"+((1<<24)*Math.random()|0).toString(16); // magic one liner for random colour
    newSpan.style.fontSize = Math.floor((Math.random() * 50) + 12) + 'px';
    newSpan.style.left = Math.floor((Math.random() * width) + 1) + 'px';
    newSpan.style.top = Math.floor((Math.random() * height) + 20) + 'px';

    // Hide message after 4 seconds 
    setTimeout(function() {
      newSpan.style.display = 'none';
    }, 4000);
  });

  // Finally, connect to the Twitch channel
  client.connect();
}


form.addEventListener('submit', onSubmit);