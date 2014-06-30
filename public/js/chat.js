var socket = io();
var $username = '';
var $loginSection = $('.header-section').clone();
  
  //works with send messages
  jQuery(function ($) {
    $('.message-form').submit(function (event) {
      event.preventDefault();
      var $message = $('.msg');
      if ($message.val().trim() !== "") {
        socket.emit('newMessage', $message.val());
      } else {
        $('.msg-span').text("Message is empty!").show().fadeOut(1000);
      }
      $message.val('');
    });
  });

  //works with login (header)
  jQuery(function ($) {
    $('.header-section').on('click', '.btn-login', function (event) {
      event.preventDefault();
      var $user = $('.username');
      $username = $user.clone();
      var $password = $('.password');
      if ($user.val().trim() !== "") {
        console.log('user: ' + $user.val() + ' password: ' + $password.val() + ' join to us');
        $('.user-span').text("Sucess!").show().fadeOut(1000);
        socket.emit('newUser', $user.val());
        $('.header-section').empty();
        $(".header-section").append("<p>Hello, " + $username.val() + "&nbsp;&nbsp;<button class='btn-logout'>Logout</button></p>");
        $user.val('');
        $password.val('');
      } else {
        $('.user-span').text("Username is empty!").show().fadeOut(1000);
      }
    });
  });

  //works with registrate (header)
  jQuery(function ($) {
    $('.header-section').on('click', '.btn-registrate', function (event) {
      event.preventDefault();
      var $user = $('.username');
      $username = $user.clone();
      var $password = $('.password');
      if ($user.val().trim() !== "") {
        console.log('user: ' + $user.val() + ' password: ' + $password.val() + ' was registrated and join to us');
        $('.user-span').text("Sucess!").show().fadeOut(1000);
        socket.emit('newUser', $user.val());
        $('.header-section').empty();
        $('.header-section').append("<p>Hello, " + $username.val() + "&nbsp;&nbsp;<button class='btn-logout'>Logout</button></p>");
        $user.val('');
        $password.val('');
      } else {
        $('.user-span').text("Username is empty!").show().fadeOut(1000);
      }
    });
  });



  //works with logout (header)
  jQuery(function ($) {
    $('.header-section').on('click', '.btn-logout', function (event) {
      event.preventDefault();
      console.log('user: ' +  $username.val() + ' logout');
      $('.user-span').text("logout!").show().fadeOut(1000);
      socket.emit('logoutUser', $username.val());
      $('.header-section').empty();
      $('.header-section').append($loginSection);
      $('.messages').empty();
    });
  });

  // add new messages to window
  socket.on('message:', function(msg1) {
    $('#messages').append($('<li>').text(msg1.time + ' : ' + msg1.msg));
  });