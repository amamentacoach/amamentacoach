import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Platform, TouchableOpacity } from 'react-native';

import { formatWithLocale } from 'lib/date-fns';
import { Flex, ErrorContainer, ErrorText } from 'lib/sharedStyles';

import { LabelText, TextInput } from './styles';

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
      return formatWithLocale(dateToFormat, 'HH:mm');
    }
    return formatWithLocale(dateToFormat, 'P');
  }

  // Formata a data salva para ser armazenada no useState do componente e valor final do formulário.
  function formatStateDate(dateToFormat?: Date): string {
    if (!dateToFormat) {
      return '';
    }
    if (mode === 'time') {
      return formatWithLocale(dateToFormat, 'HH:mm');
    }
    return formatWithLocale(dateToFormat, 'yyyy-MM-dd');
  }

  // Exibe o seletor.
  function showDatePicker(): void {
    setShow(true);
  }

  // Esconde o seletor e salva o valor escolhido.
  function handleDateSelected(selectedDate?: Date): void {
    setShow(Platform.OS === 'ios');
    if (selectedDate) {
      onChange(fieldName, formatStateDate(selectedDate));
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
          value={formatDisplayDate(date)}
        />
      </TouchableOpacity>
      <ErrorContainer>
        {!!error && <ErrorText>{error}</ErrorText>}
      </ErrorContainer>

      {show && (
        <DateTimePicker
          display="default"
          maximumDate={maxDate}
          // @ts-ignore
          mode={mode}
          testID="dateTimePicker"
          value={date || maxDate}
          onChange={(_: Event, selectedDate?: Date) =>
            handleDateSelected(selectedDate)
          }
        />
      )}
    </Flex>
  );
};

export default FormDateInput;
