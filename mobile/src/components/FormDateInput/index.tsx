import React, { useState } from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
  Container,
  LabelText,
  TextInput,
  ErrorContainer,
  ErrorText,
} from './styles';

interface FormDateProps {
  name: string;
  label: string;
  error?: string | undefined;
  placeholder: string;
  maxDate?: Date | undefined;
  onChange: (fieldName: string, fieldValue: string) => void;
}

const FormDateInput: React.FC<FormDateProps> = ({
  name,
  label,
  error,
  placeholder,
  maxDate = new Date(),
  onChange,
}) => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState('');

  function showDatePicker() {
    setShow(true);
  }

  function formatDate(dateToFormat: Date, separator: string = '/'): string {
    return `${dateToFormat.getDate()}${separator}${
      dateToFormat.getMonth() + 1
    }${separator}${dateToFormat.getFullYear()}`;
  }

  function handleDateSelected(_: Event, selectedDate?: Date | undefined) {
    setShow(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(formatDate(selectedDate));
      onChange(name, formatDate(selectedDate, '-'));
    }
  }

  return (
    <Container>
      <LabelText>{label}</LabelText>
      <TouchableOpacity onPress={showDatePicker}>
        <TextInput
          value={date}
          placeholder={placeholder}
          placeholderTextColor="#acaab2"
          editable={false}
        />
      </TouchableOpacity>
      <ErrorContainer>
        {error ? <ErrorText>{error}</ErrorText> : null}
      </ErrorContainer>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={maxDate}
          mode="date"
          display="calendar"
          maximumDate={maxDate}
          onChange={handleDateSelected}
        />
      )}
    </Container>
  );
};

export default FormDateInput;
