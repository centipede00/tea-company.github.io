document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('response').textContent = 'Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.';
  });
  