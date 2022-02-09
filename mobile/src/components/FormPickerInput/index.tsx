import { Picker } from '@react-native-picker/picker';
import i18n from 'i18n-js';
import { useState } from 'react';

import { ErrorContainer, ErrorText } from 'lib/sharedStyles';

import { Container, LabelText, PickerContainer } from './styles';

interface FormPickerProps {
  options: string[];
  placeholder?: string;
  value?: string;
  label?: string;
  error?: string;
  onChange: (fieldValue: string) => void;
}

const FormPickerInput: React.FC<FormPickerProps> = ({
  placeholder = i18n.t('PickerComponent.DefaultPlaceholder'),
  value,
  label,
  error,
  options,
  onChange,
}) => {
  const [selectedItem, setSelectedItem] = useState(value);

  function handleItemSelected(itemValue: string): void {
    setSelectedItem(itemValue);
    onChange(itemValue);
  }

  return (
    <Container>
      {label !== undefined && <LabelText>{label}</LabelText>}
      <PickerContainer>
        <Picker selectedValue={selectedItem} onValueChange={handleItemSelected}>
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
