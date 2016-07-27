import Chromatic from './Chromatic';

function filterInterval(interval) {
  if (interval > 12) {
    interval = 12;
  } else if (interval < -12) {
    interval = -12;
  }

  return interval;
}

function getNextNote(note, interval) {
  const indexOfNote = Chromatic.indexOf(note.name);
  let octaveOfNextNote = note.octave;
  let indexOfNextNote = indexOfNote + interval;

  if (indexOfNote === -1) {
      console.error('Not a valid note');
      return ;
  }

  while(indexOfNextNote >= 12) {
    indexOfNextNote -= 12;
    octaveOfNextNote += 1;
  }

  while(indexOfNextNote <= 12) {
    indexOfNextNote += 12;
    octaveOfNextNote -= 1;
  }

  return {
    name: Chromatic[indexOfNextNote],
    octave: octaveOfNextNote
  };
}

export default {
    getNote: (note, interval) => {
        if (!note.octave) note.octave = 3;
        interval = filterInterval(interval);

        return getNextNote(note, interval);
    }
};
