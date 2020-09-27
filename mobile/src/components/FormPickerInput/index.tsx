import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-community/picker';

import {
  Container,
  LabelText,
  PickerContainer,
  ErrorContainer,
  ErrorText,
} from './styles';

interface FormPickerProps {
  name: string;
  placeholder?: string | undefined;
  label: string;
  options: string[];
  error?: string | undefined;
  onChange: (fieldName: string, fieldValue: string) => void;
}

const FormPickerInput: React.FC<FormPickerProps> = ({
  name,
  placeholder = 'Selecione uma opção',
  label,
  error,
  options,
  onChange,
}) => {
  const [selectedItem, setSelectedItem] = useState('');

  function handleItemSelected(itemValue: string) {
    setSelectedItem(itemValue);
    onChange(name, itemValue);
  }

  return (
    <Container>
      <LabelText>{label}</LabelText>
      <PickerContainer>
        <Picker
          selectedValue={selectedItem}
          onValueChange={(itemValue) =>
            handleItemSelected(itemValue.toString())
          }>
          {[placeholder, ...options]
            .filter((option) => option !== '')
            .map((option) => (
              <Picker.Item
                key={option}
                label={option}
                value={option === placeholder ? '' : option}
              />
            ))}
        </Picker>
      </PickerContainer>
      <ErrorContainer>
        {error ? <ErrorText>{error}</ErrorText> : null}
      </ErrorContainer>
    </Container>
  );
};

export default FormPickerInput;
