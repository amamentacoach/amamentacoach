import React, { useState } from 'react';
import { Picker } from '@react-native-community/picker';

import {
  Container,
  LabelText,
  PickerContainer,
  ErrorContainer,
  ErrorText,
} from './styles';

interface FormPickerProps {
  fieldName: string;
  placeholder?: string | undefined;
  defaultValue?: string | undefined;
  label?: string | undefined;
  options: string[];
  error?: string | undefined;
  onChange: (fieldName: string, fieldValue: string) => void;
}

const FormPickerInput: React.FC<FormPickerProps> = ({
  fieldName,
  placeholder = 'Selecione uma opção',
  defaultValue,
  label,
  error,
  options,
  onChange,
}) => {
  const [selectedItem, setSelectedItem] = useState(defaultValue || '');

  function handleItemSelected(itemValue: string) {
    setSelectedItem(itemValue);
    onChange(fieldName, itemValue);
  }

  return (
    <Container>
      {label !== undefined && <LabelText>{label}</LabelText>}
      <PickerContainer>
        <Picker
          selectedValue={selectedItem}
          onValueChange={itemValue => handleItemSelected(itemValue.toString())}>
          {[placeholder, ...options]
            .filter(option => option !== '')
            .map(option => (
              <Picker.Item
                key={option}
                label={option}
                value={option === placeholder ? '' : option}
              />
            ))}
        </Picker>
      </PickerContainer>
      <ErrorContainer>{error && <ErrorText>{error}</ErrorText>}</ErrorContainer>
    </Container>
  );
};

export default FormPickerInput;
