import React from 'react';

function Timer(props) {
  const t = props.timeLeft;
  if (t.hours > 0)  {
    return (
      <div>
       Next switch in: {t.hours} hr(s) {t.minutes} min(s) {t.seconds} sec(s)
      </div>
    );
  } else if (t.minutes > 0)  {
    return (
      <div>
       Next switch in: {t.minutes} min(s) {t.seconds} sec(s)
      </div>
    );
  } else if (t.seconds > 0) {
    return (
      <div>
        Next switch in: {t.seconds} sec(s)
      </div>
    );
  } else {
    return (
      <div></div>
    );
  }
}

export default Timer;
