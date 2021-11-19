import { Picker } from '@react-native-picker/picker';
import i18n from 'i18n-js';
import { useState } from 'react';

import {
  Container,
  ErrorContainer,
  ErrorText,
  LabelText,
  PickerContainer,
} from './styles';

interface FormPickerProps {
  fieldName: string;
  options: string[];
  placeholder?: string;
  defaultValue?: string;
  label?: string;
  error?: string;
  onChange: (fieldName: string, fieldValue: string) => void;
}

const FormPickerInput: React.FC<FormPickerProps> = ({
  fieldName,
  placeholder = i18n.t('PickerComponent.DefaultPlaceholder'),
  defaultValue,
  label,
  error,
  options,
  onChange,
}) => {
  const [selectedItem, setSelectedItem] = useState(defaultValue || '');

  function handleItemSelected(itemValue: string): void {
    setSelectedItem(itemValue);
    onChange(fieldName, itemValue);
  }

  return (
    <Container>
      {label !== undefined && <LabelText>{label}</LabelText>}
      <PickerContainer>
        <Picker
          selectedValue={selectedItem}
          onValueChange={(itemValue): void =>
            handleItemSelected(itemValue.toString())
          }>
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
      <ErrorContainer>
        {!!error && <ErrorText>{error}</ErrorText>}
      </ErrorContainer>
    </Container>
  );
};

export default FormPickerInput;
