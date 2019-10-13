var container=document.getElementsByClassName("chat")[0];
// Get the current username from the cookies
var user = cookie.get('/user');
user.path = "/";
if (!user) {
  // Ask for the username if there is none set already
  user = prompt('Choose a username:');
  if (!user) {
    alert('We cannot work with you like that!');
    user="Default";
  } else {
    // Store it in the cookies for future use
    cookie.set('user', user);
  }
}

document.getElementById("anonymous").onclick=function(){
  if(document.getElementById("anonymous").checked){
    user = "Anonymous";
  }
  else{
    user = cookie.get('user');
  }
}


var socket = io();

// The user count. Can change when someone joins/leaves
socket.on('count', function (data) {
  $('.user-count').html(data);
});

// When we receive a message
// it will be like { user: 'username', message: 'text' }
socket.on('message', function (data) {
  $('.chat').append('<p><strong>' + data.user + '</strong>: ' + data.message + '</p>');
  container.scrollTop = container.scrollHeight;
});

// When the form is submitted
$('form').submit(function (e) {
  // Avoid submitting it through HTTP
  e.preventDefault();

  // Retrieve the message from the user
  var message = $(e.target).find('input').val();

  // Send the message to the server
  socket.emit('message', {
    user: user,
    message: message
  });

  // Clear the input and focus it for a new message
  e.target.reset();
  $(e.target).find('input').focus();
});
