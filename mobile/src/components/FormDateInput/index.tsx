import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Platform, TouchableOpacity } from 'react-native';

import { format } from 'lib/date-fns';

import {
  Container,
  ErrorContainer,
  ErrorText,
  LabelText,
  TextInput,
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
  const [date, setDate] = useState<Date | undefined>();

  // Formata a data salva para ser exibida no TextInput do componente.
  function formatDisplayDate(dateToFormat?: Date): string {
    if (!dateToFormat) {
      return '';
    }
    if (mode === 'time') {
      return format(dateToFormat, 'kk:mm');
    }
    return format(dateToFormat, 'P');
  }

  // Formata a data salva para ser armazenada no useState do componente e valor final do formulário.
  function formatStateDate(dateToFormat?: Date): string {
    if (!dateToFormat) {
      return '';
    }
    if (mode === 'time') {
      return format(dateToFormat, 'kk:mm');
    }
    return format(dateToFormat, 'yyyy-MM-dd');
  }

  // Exibe o seletor.
  function showDatePicker() {
    setShow(true);
  }

  // Esconde o seletor e salva o valor escolhido.
  function handleDateSelected(selectedDate?: Date) {
    setShow(Platform.OS === 'ios');
    if (selectedDate) {
      onChange(fieldName, formatStateDate(selectedDate));
      setDate(selectedDate);
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
          value={date || maxDate}
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
