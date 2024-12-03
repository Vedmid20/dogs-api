import React from 'react';

interface LabelAndInputProps {
  id: string;
  labelText: string;
  inputType: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LabelAndInput: React.FC<LabelAndInputProps> = ({ id, labelText, inputType, value, onChange }) => {
  return (
    <div>
      <label htmlFor={id}>{labelText}</label>
      <input id={id} type={inputType} value={value} onChange={onChange} />
    </div>
  );
}

export default LabelAndInput;
