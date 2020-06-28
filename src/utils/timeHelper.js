import * as moment from 'moment';

export const getPassedTime = (dateTimeStamp) => {
  if (!dateTimeStamp) {
    return 'unknown';
  }
  const momentDate = moment(dateTimeStamp);
  const now = moment();
  const years = now.diff(momentDate, 'years');
  const months = now.diff(momentDate, 'months');
  const days = now.diff(momentDate, 'days');
  const hours = now.diff(momentDate, 'hours');
  const minutes = now.diff(momentDate, 'minutes');

  if (typeof minutes !== 'number' || minutes < 0) {
    return 'just now';
  }

  if (years > 0) {
    return `${years} ${getTimeUnitNaming('year', years)} ago`;
  } else if (months > 0) {
    return `${months} ${getTimeUnitNaming('month', months)} ago`;
  } else if (days > 0) {
    return `${days} ${getTimeUnitNaming('day', days)} ago`;
  } else if (hours > 0) {
    return `${hours} ${getTimeUnitNaming('hour', hours)} ago`;
  } else if (minutes > 0) {
    return `${minutes} ${getTimeUnitNaming('minute', minutes)} ago`;
  } else {
    return 'a few seconds ago';
  }
}

const getTimeUnitNaming = (timeUnitName, units) => units === 1 ? timeUnitName : `${timeUnitName}s`;