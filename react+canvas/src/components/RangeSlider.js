import React from 'react';

const createLabels = (min, max, step) => {
  const labels = [];
  let i = 0;
  let text = min;
  while(text <= max) {
   const label = <span key={i}>{text}</span>;
    labels.push(label);
    text += step;
    i++;
  }
  return labels;
}

export default ({min, max, value, labelStep, onChange}) => {
  const labels = createLabels(min, max, labelStep)
  return (
    <div className='range-slider'>
      <input type='range'
        min={min}
        max={max}
        value={value}
        onChange={onChange}/>
        <div className='labels'>
          {labels}
        </div>
    </div>
  );
}
