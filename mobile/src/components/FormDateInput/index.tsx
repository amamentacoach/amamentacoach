import React, { useState } from 'react';

import DateTimePicker from '@react-native-community/datetimepicker';
import moment, { Moment } from 'moment';
import { TouchableOpacity, Platform } from 'react-native';

import {
  Container,
  LabelText,
  TextInput,
  ErrorContainer,
  ErrorText,
} from './styles';

interface FormDateProps {
  fieldName: string;
  placeholder: string;
  label?: string;
  error?: string;
  mode?: string;
  maxDate?: Date;
  onChange: (fieldName: string, fieldValue: string) => void;
}

const FormDateInput: React.FC<FormDateProps> = ({
  fieldName,
  label,
  error,
  placeholder,
  mode = 'date',
  maxDate = new Date(),
  onChange,
}) => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState<Moment | undefined>();

  // Formata a data salva para ser exibida no TextInput do componente.
  function formatDisplayDate(dateToFormat?: Moment): string {
    if (!dateToFormat) {
      return '';
    }
    if (mode === 'time') {
      return dateToFormat.format('kk:mm');
    }
    return dateToFormat.format('DD[/]MM[/]YYYY');
  }

  // Formata a data salva para ser armazenada no useState do componente e valor final do formulário.
  function formatStateDate(dateToFormat?: Moment): string {
    if (!dateToFormat) {
      return '';
    }
    if (mode === 'time') {
      return dateToFormat.format('kk:mm');
    }
    return dateToFormat.format('YYYY[-]MM[-]DD');
  }

  // Exibe o seletor.
  function showDatePicker() {
    setShow(true);
  }

  // Esconde o seletor e salva o valor escolhido.
  function handleDateSelected(selectedDate?: Date) {
    setShow(Platform.OS === 'ios');
    if (selectedDate) {
      const newDate = moment(selectedDate);
      setDate(newDate);
      onChange(fieldName, formatStateDate(newDate));
    }
  }

  return (
    <Container>
      {label !== undefined && <LabelText>{label}</LabelText>}
      <TouchableOpacity onPress={showDatePicker} activeOpacity={1}>
        <TextInput
          value={formatDisplayDate(date)}
          placeholder={placeholder}
          placeholderTextColor="#acaab2"
          editable={false}
        />
      </TouchableOpacity>
      <ErrorContainer>
        {!!error && <ErrorText>{error}</ErrorText>}
      </ErrorContainer>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date ? date.toDate() : maxDate}
          // @ts-ignore
          mode={mode}
          display="default"
          maximumDate={maxDate}
          onChange={(_: Event, selectedDate?: Date) =>
            handleDateSelected(selectedDate)
          }
        />
      )}
    </Container>
  );
};

export default FormDateInput;
