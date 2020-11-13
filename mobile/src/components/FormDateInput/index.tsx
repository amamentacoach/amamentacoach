import React, { useState } from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment, { Moment } from 'moment';
import 'moment/locale/pt-br';

import {
  Container,
  LabelText,
  TextInput,
  ErrorContainer,
  ErrorText,
} from './styles';

interface FormDateProps {
  fieldName: string;
  label: string;
  error?: string | undefined;
  placeholder: string;
  maxDate?: Date | undefined;
  onChange: (fieldName: string, fieldValue: string) => void;
}

const FormDateInput: React.FC<FormDateProps> = ({
  fieldName,
  label,
  error,
  placeholder,
  maxDate = new Date(),
  onChange,
}) => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState<Moment | undefined>();

  function showDatePicker() {
    setShow(true);
  }

  function handleDateSelected(selectedDate?: Date | undefined) {
    setShow(Platform.OS === 'ios');
    if (selectedDate) {
      const newDate = moment(selectedDate);
      setDate(newDate);
      onChange(fieldName, newDate.format('YYYY[-]MM[-]DD'));
    }
  }

  return (
    <Container>
      <LabelText>{label}</LabelText>
      <TouchableOpacity onPress={showDatePicker}>
        <TextInput
          value={date ? date.format('DD[/]MM[/]YYYY') : ''}
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
          value={date ? date.toDate() : maxDate}
          mode="date"
          display="calendar"
          maximumDate={maxDate}
          onChange={(_: Event, selectedDate?: Date | undefined) =>
            handleDateSelected(selectedDate)
          }
        />
      )}
    </Container>
  );
};

export default FormDateInput;
