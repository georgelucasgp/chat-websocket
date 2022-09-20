const socket = io();

$('#message').on('keyup', function (e) {
  if (e.which === 13 && !e.shiftKey) {
    $('#formSend').submit();
  }
});

$('#message').on('input', function () {
  const username = $('input[name=user]').attr('id');
  const typed = $('#message').val() != '';

  const typing = {
    username,
    typed
  };
  socket.emit('typing', typing);
});

$('#formEnter').on('submit', function (e) {
  e.preventDefault();

  const username = $('#username').val();

  $('#footerEnter').append(`
  <input type="hidden" name="user" id="${username
    .toLowerCase()
    .trim()
    .replace(' ', '')}" value="${username}" />
  `);

  if (username) {
    const usernameObject = {
      username: username,
      createdAt: new Date().toLocaleTimeString()
    };

    socket.emit('username', usernameObject);

    $('#username').val('');
    $('#footerEnter').removeClass('flex').addClass('hidden');
    $('#footerSend').removeClass('hidden').addClass('flex');
    $('#message').focus();
  }
});

$('#formSend').on('submit', function (e) {
  e.preventDefault();

  const message = $('#message').val();
  const username = $('input[name=user]').val();

  if (message) {
    const messageObject = {
      username: username,
      message: message,
      createdAt: new Date().toLocaleTimeString()
    };
    socket.emit('message', messageObject);
  }

  $('#message').val('');
});

$('#btn-logout').on('click', function () {
  const username = $('input[name=user]').val();
  if (username) {
    const logoutObject = {
      username: username,
      createdAt: new Date().toLocaleTimeString()
    };
    socket.emit('logout', logoutObject);
  }

  $('#footerEnter').removeClass('hidden').addClass('flex');
  $('#footerSend').removeClass('flex').addClass('hidden');
});

socket.on('username', (username) => {
  renderUser(username);
});

socket.on('message', function (message) {
  renderMessage(message);
});

socket.on('typing', function (typing) {
  renderTyping(typing);
});

socket.on('logout', function (logout) {
  renderLogout(logout);
});

function renderMessage(data) {
  $('#tableMessage').append(`
  <tr class="border-y-2 border-white bg-gray-50">
  <td class="p-2 pl-3">
    <span class="text-gray-400 text-[12px]">(${data.createdAt})</span>
    <span class="text-sm">
      <strong>${data.username}</strong> <span class"text-gray-400 text-[12px]">disse a Todos</span> <span>${data.message}</span>
    </span>
  </td>
</tr>
  `);
}

function renderUser(data) {
  const username = data.username.toLowerCase().trim().replace(' ', '');
  $('#tableUsername').append(`
  <tr id="${username}" class="border-y-2 border-white bg-gray-50">
  <td class="p-1 pl-2 flex items-center space-x-1">
    <svg
      class="h-4 w-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      ></path>
    </svg>
    <span>${data.username}</span>
    <span class="text-gray-400" id="${username}span"></span>
  </td>
</tr>
  `);

  $('#tableMessage').append(`
  <tr class="border-y-2 border-white bg-gray-50"> 
  <td class="p-2 pl-3 flex items-center space-x-1">
    <span class="text-gray-400 text-[12px] ">(${data.createdAt})</span>
    <span class="text-sm">
      <strong>${data.username}</strong> entrou na sala..
    </span>
  </td>
</tr>
  `);
}

function renderTyping(data) {
  const username = data.username.toLowerCase().trim().replace(' ', '');

  if (data.typed) {
    $('#' + username + 'span').text('está digitando...');
  } else {
    $('#' + username + 'span').text('');
  }
}

function renderLogout(data) {
  const username = data.username.toLowerCase().trim().replace(' ', '');
  $('#tableMessage').append(`
  <tr class="border-y-2 border-white bg-gray-50"> 
  <td class="p-2 pl-3 flex items-center space-x-1">
    <span class="text-gray-400 text-[12px] ">(${data.createdAt})</span>
    <span class="text-sm">
      <strong>${data.username}</strong> saiu da sala..
    </span>
  </td>
</tr>
  `);

  $('#' + username).remove();
}
