const door = document.getElementById('door');
  const doorScreen = document.getElementById('door-screen');

  door.addEventListener('click', () => {
    door.classList.add('door-open');

    // Zoom-Effekt 0.7s später starten
    setTimeout(() => {
      document.body.classList.add('zoom-in');
    }, 1000);

    // Türscreen nach 1.5s ausblenden
    setTimeout(() => {
      doorScreen.style.display = 'none';
      document.body.classList.remove('overflow-hidden');
      document.body.classList.remove('zoom-in');
    }, 2000);
  });