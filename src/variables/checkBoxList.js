import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button, Collapse } from 'reactstrap';
import './CheckBoxList.css'; // 선택된 항목과 관련된 CSS를 추가할 경우

const CheckBoxList = ({ options, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState(new Set());
  const [isOpen, setIsOpen] = useState(true);

  const handleOptionChange = (option) => {
    const updatedOptions = new Set(selectedOptions);
    if (updatedOptions.has(option)) {
      updatedOptions.delete(option);
    } else {
      updatedOptions.add(option);
    }
    setSelectedOptions(updatedOptions);
    onChange(Array.from(updatedOptions));
  };

  const handleRemoveOption = (option) => {
    const updatedOptions = new Set(selectedOptions);
    updatedOptions.delete(option);
    setSelectedOptions(updatedOptions);
    onChange(Array.from(updatedOptions));
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <Button color="link" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Collapse' : 'Expand'}
        </Button>
        <div className="selected-options-container">
          {Array.from(selectedOptions).map(option => (
            <span key={option} className="selected-option">
              {option}
              <button 
                className="remove-button"
                onClick={() => handleRemoveOption(option)}
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>
      <Collapse isOpen={isOpen}>
        {options.map(option => (
          <div key={option.id}>
            <input
              type="checkbox"
              id={`checkbox-${option.id}`}
              checked={selectedOptions.has(option.name)}
              onChange={() => handleOptionChange(option.name)}
            />
            <label htmlFor={`checkbox-${option.id}`}>{option.name}</label>
          </div>
        ))}
      </Collapse>
    </>
  );
};

CheckBoxList.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  onChange: PropTypes.func.isRequired
};

export default CheckBoxList;
