import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Platform, TouchableOpacity } from 'react-native';

import { formatWithLocale } from 'lib/date-fns';
import { Flex, ErrorContainer, ErrorText } from 'lib/sharedStyles';

import type { FormikErrors } from 'formik';

import { LabelText, TextInput } from './styles';

interface FormDateProps {
  placeholder?: string;
  label?: string;
  error?: string | FormikErrors<any>;
  mode?: string;
  maxDate?: Date;
  minDate?: Date;
  value?: Date;
  onChange: (fieldValue: Date) => void;
}

const FormDateInput: React.FC<FormDateProps> = ({
  label,
  error,
  placeholder,
  value,
  maxDate,
  minDate,
  mode = 'date',
  onChange,
}) => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState<Date | undefined>(value ?? undefined);

  // Formata a data salva para ser exibida no TextInput do componente.
  function formatDisplayDate(dateToFormat: Date): string {
    if (mode === 'time') {
      return formatWithLocale(dateToFormat, 'HH:mm');
    }
    return formatWithLocale(dateToFormat, 'P');
  }

  // Exibe o seletor.
  function showDatePicker(): void {
    setShow(true);
  }

  // Esconde o seletor e salva o valor escolhido.
  function handleDateSelected(_: Event, selectedDate?: Date): void {
    setShow(Platform.OS === 'ios');
    if (selectedDate) {
      onChange(selectedDate);
      setDate(selectedDate);
    }
  }

  return (
    <Flex>
      {label !== undefined && <LabelText>{label}</LabelText>}
      <TouchableOpacity activeOpacity={1} onPress={showDatePicker}>
        <TextInput
          editable={false}
          placeholder={placeholder}
          placeholderTextColor="#acaab2"
          value={date ? formatDisplayDate(date) : ''}
        />
      </TouchableOpacity>
      <ErrorContainer>
        {!!error && <ErrorText>{error}</ErrorText>}
      </ErrorContainer>

      {show && (
        <DateTimePicker
          display="default"
          maximumDate={maxDate}
          minimumDate={minDate}
          // @ts-ignore
          mode={mode}
          testID="dateTimePicker"
          value={date || new Date()}
          onChange={handleDateSelected}
        />
      )}
    </Flex>
  );
};

export default FormDateInput;
