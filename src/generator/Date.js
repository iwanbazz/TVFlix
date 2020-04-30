import React from 'react';

const DateGenerator = props => {
  const GenerateDate = () => {
    const [y, m, d] = props.date.split('-');
    const month = [
      'January',
      'February',
      'March',
      'April',
      'Mei',
      'Juni',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return `${month[m - 1]} ${d}, ${y}`;
  };
  return <GenerateDate />;
};

export default DateGenerator;
