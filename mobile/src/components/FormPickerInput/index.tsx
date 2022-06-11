import { Picker } from '@react-native-picker/picker';
import i18n from 'i18n-js';
import { useState } from 'react';
import { View } from 'react-native';

import { ErrorContainer, ErrorText } from 'lib/sharedStyles';

import type { StyleProp, ViewStyle } from 'react-native';

import { LabelText, PickerContainer } from './styles';

interface FormPickerProps {
  options: string[];
  placeholder?: string;
  value?: string;
  label?: string;
  error?: string;
  style?: StyleProp<ViewStyle>;
  onChange: (fieldValue: string) => void;
}

const FormPickerInput: React.FC<FormPickerProps> = ({
  placeholder = i18n.t('PickerComponent.DefaultPlaceholder'),
  value,
  label,
  error,
  options,
  style,
  onChange,
}) => {
  const [selectedItem, setSelectedItem] = useState(value);

  function handleItemSelected(itemValue: string): void {
    setSelectedItem(itemValue);
    onChange(itemValue);
  }

  return (
    <View>
      {label !== undefined && <LabelText>{label}</LabelText>}
      <PickerContainer>
        <Picker
          selectedValue={selectedItem}
          style={style}
          onValueChange={handleItemSelected}>
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
    </View>
  );
};

export default FormPickerInput;
