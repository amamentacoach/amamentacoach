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
  name: string;
  label: string;
  options: string[];
  error?: string | undefined;
  onChange: (fieldName: string, fieldValue: string) => void;
}

const FormPickerInput: React.FC<FormPickerProps> = ({
  name,
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
          <Picker.Item
            key="Selecione uma opção"
            label="Selecione uma opção"
            value=""
          />
          {options.map((option) => (
            <Picker.Item key={option} label={option} value={option} />
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
