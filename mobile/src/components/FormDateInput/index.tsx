import React, { useState } from 'react';
import { Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Container, LabelText, TextInput } from './styles';

interface FormDateProps {
  name: string;
  label: string;
  error?: string | undefined;
  placeholder: string;
  onChange: (fieldName: string, fieldValue: string) => void;
}

const FormDateInput: React.FC<FormDateProps> = ({
  name,
  label,
  placeholder,
  error,
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
        {error ? <Text>{error}</Text> : null}
      </TouchableOpacity>

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
