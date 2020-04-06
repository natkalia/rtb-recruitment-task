'use strict';

const calcTimeLeftInSeconds = () => {

  // get user browser time
  const today = new Date();

  // get user UTC time
  const currentTime = new Date(
    Date.UTC(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate(),
      today.getUTCHours(),
      today.getUTCMinutes(),
      today.getUTCSeconds()
    )
  );

// get UTC time for the start of promo - today at midnight
  const currentPromoStart = new Date(
    Date.UTC(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate(),
      0,
      0,
      0
    )
  );

  // get time for the end of promo - 7 days from today midnight to another midnight
  const currentPromoEnd = new Date(
    Date.UTC(
      currentPromoStart.getUTCFullYear(),
      currentPromoStart.getUTCMonth(),
      currentPromoStart.getUTCDate() + 7,
      0,
      0,
      0
    )
  );

  // get time left from midnight to midnight (full 7 days)
  let timeLeft = Math.round((currentPromoEnd.getTime() - currentPromoStart.getTime()) / 1000);
  // substract part of today that already lapsed
  timeLeft = timeLeft - (currentTime.getTime() - currentPromoStart.getTime()) / 1000;
  return timeLeft;
};

const formatTime = secondsLeft => {
  if (secondsLeft && typeof secondsLeft === 'number' && secondsLeft >= 0) {

    const seconds = Math.floor(secondsLeft % 60);
    const mins = Math.floor((secondsLeft / 60) % 60);
    const hours = Math.floor((secondsLeft / 3600) % 24);
    const days = Math.floor(secondsLeft / 3600 / 24);

    if (days == '0' && hours != '0') {
      const final = [hours, mins, seconds].map((element) =>
        `${element + 100}`.substring(1)
      ); 
      return final.join('-');
    } else if (days == '0' && hours == '0') {
      const final = [mins, seconds].map((element) =>
        `${element + 100}`.substring(1)
      );
      return final.join('-');
    } else {
      const final = [days, hours, mins, seconds].map((element) =>
        `${element + 100}`.substring(1)
      );
      return final.join('-');
    }

  } else {
    return null;
  }
};

let counter = calcTimeLeftInSeconds();

// render start counter
const demo = document.querySelector('.demo');
demo.innerHTML = `Do końca pozostało (DD-HH-MM): <strong>${formatTime(counter)}</strong>`;

// rerender counter using setInterval
const promotionCountdown = setInterval(() => {
  demo.innerHTML = `Do końca pozostało (DD-HH-MM): <strong>${formatTime(counter)}</strong>`;
  counter--;
  if (counter === -1) {
    demo.innerHTML = 'End of promo time!';
    clearInterval(promotionCountdown);
  }
}, 1000); //TODO: in final version change to minutes
