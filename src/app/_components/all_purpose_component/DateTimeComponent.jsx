'use client';

import dayjs from 'dayjs';

const DateTimeComponent = () => {


  const currentDate = dayjs().format('YYYY-MM-DD'); 

  const currentTime = dayjs().format('hh:mm:ss A');

  return <>

    <input type='hidden' defaultValue={currentDate} name='dateOfCreation' />

    <input type='hidden' defaultValue={currentTime} name='timeOfCreation' />

  </>
};

export default DateTimeComponent;
