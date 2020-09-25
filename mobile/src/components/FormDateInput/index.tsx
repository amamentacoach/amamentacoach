import React, { useState } from 'react';
import { Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Container, LabelText, TextInput } from './styles';

interface FormDateProps {
  name: string;
  label: string;
  error?: string | undefined;
  placeholder: string;
  setField: (fieldName: string, fieldValue: string) => void;
}

const FormDateInput: React.FC<FormDateProps> = ({
  name,
  label,
  placeholder,
  error,
  setField,
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
      setField(name, formatDate(selectedDate, '-'));
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
      {error ? <Text>{error}</Text> : null}

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode="date"
          display="calendar"
          maximumDate={new Date()}
          onChange={handleDateSelected}
        />
      )}
    </Container>
  );
};

export default FormDateInput;
