'use strict';

const calcTimeLeftInSeconds = () => {
  // get user browser time in date format
  const currentTime = new Date();

  // get UTC time in date format 
  // for the start of promo - today at midnight
  const currentPromoStart = new Date(
    Date.UTC(
      currentTime.getUTCFullYear(),
      currentTime.getUTCMonth(),
      currentTime.getUTCDate(),
      0, 0, 0
    )
  );

  // get UTC time in date format  
  // for the end of promo - 7 days from today midnight to another midnight
  const currentPromoEnd = new Date(
    Date.UTC(
      currentPromoStart.getUTCFullYear(),
      currentPromoStart.getUTCMonth(),
      currentPromoStart.getUTCDate() + 7,
      0, 0, 0
    )
  );

  // get time left from midnight to midnight (full 7 days)
  // convert miliseconds to seconds
  let timeLeft = Math.round(
    (currentPromoEnd.getTime() - currentPromoStart.getTime()) / 1000
  );
  // substract (mili)seconds representing part of today that already lapsed
  // convert miliseconds to seconds
  timeLeft = timeLeft - (currentTime.getTime() - currentPromoStart.getTime()) / 1000;

  // return timeLeft in seconds
  return timeLeft;
};

const formatTime = secondsLeft => {
  if (secondsLeft && typeof secondsLeft === 'number' && secondsLeft >= 0) {

    const secs = Math.floor(secondsLeft % 60);
    const mins = Math.floor((secondsLeft / 60) % 60);
    const hours = Math.floor((secondsLeft / 3600) % 24);
    const days = Math.floor((secondsLeft / 3600) / 24);

    // add zero if one digit result
    // check if days or hours are 0
    if (days == '0' && hours != '0') {
      const final = [hours, mins, secs].map((element) =>
        `${element + 100}`.substring(1)
      );
      return final.join('-');
    } else if (days == '0' && hours == '0') {
      const final = [mins, secs].map((element) => 
        `${element + 100}`.substring(1));
      return final.join('-');
    } else {
      const final = [days, hours, mins, secs].map((element) =>
        `${element + 100}`.substring(1)
      );
      return final.join('-');
    }
  } else {
    return null;
  }
};

// calculate timeLeft in seconds to be rendered
let counter = calcTimeLeftInSeconds();

// render start counter
const demo = document.querySelector('.demo');
demo.innerHTML = `
  <p>Do końca pozostało (DD-HH-MM): <strong>${formatTime(counter).slice(0, -3)}</strong></p>
  <p>Do końca pozostało (DD-HH-MM-SS): <strong>${formatTime(counter-1)}</strong></p>
`;

// rerender counter using setInterval
const promotionCountdown = setInterval(() => {
  demo.innerHTML = `
    <p>Do końca pozostało (DD-HH-MM): <strong>${formatTime(counter).slice(0, -3)}</strong></p>
    <p>Do końca pozostało (DD-HH-MM-SS): <strong>${formatTime(counter-1)}</strong></p>
  `;
  counter--;
  if (counter === 0) {
    demo.innerHTML = 'Koniec promocji!';
    clearInterval(promotionCountdown);
  }
}, 1000);
