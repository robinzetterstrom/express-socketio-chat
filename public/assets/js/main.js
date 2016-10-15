const socket = io.connect('http://localhost:3000/');
const send = $('#messageBox');
const chatBox = $('#chatBox');
const connections = $('.clients');

socket.on('clients', (count) => {
  connections.text(count);
});

socket.on('response', (data) => {
  chatBox.append(
    `<div class="box">
            <article class="media">
              <div class="media-left">
                <figure class="image is-64x64">
                  <img src="http://placehold.it/128x128" alt="Image">
                </figure>
              </div>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>${data.id}</strong>
                    <br>
                    ${data.message}
                  </p>
                </div>
              </div>
            </article>
          </div>`);
});

send.on('keypress', (event) => {
  if (event.keyCode == 13 || event.key == "Enter" && send.val().length > 0) {
    if (send.val().length > 0) {
      socket.emit('sendMessage', send.val())
      send.val('');
    }
  }
});
