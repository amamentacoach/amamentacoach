import i18n from 'i18n-js';
import { useState } from 'react';

import FormTextInput from 'components/FormTextInput';
import { ErrorContainer, ErrorText } from 'lib/sharedStyles';

import RadioOption from './RadioOption';
import {
  Container,
  LabelText,
  OptionsContainer,
  OtherInputContainer,
} from './styles';

interface FormRadioGroupProps {
  options: string[];
  label?: string;
  multipleSelection?: boolean;
  displayOtherField?: boolean;
  // Elementos selecionados inicialmente. Devem estar presentes em options.
  values?: string[];
  error?: string | string[];
  // Define se as opções são apresentadas horizontalmente ou verticalmente.
  direction?: 'row' | 'column';
  color?: string;
  disabled?: boolean;
  onChange: (fieldValue: string[]) => void;
}

const FormRadioGroup: React.FC<FormRadioGroupProps> = ({
  label,
  options,
  error,
  color,
  direction = 'column',
  multipleSelection = false,
  displayOtherField = false,
  values,
  disabled,
  onChange,
}) => {
  const availableOptions = displayOtherField
    ? [...options, i18n.t('Other')]
    : options;

  const [selectedIndexes, setSelectedIndexes] = useState(
    availableOptions.map(option => values?.includes(option)),
  );
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    values || [],
  );
  const [otherValue, setOtherValue] = useState('');

  function handleOptionSelected(selectedIndex: number): void {
    if (disabled) {
      return;
    }

    const newSelectedIndexes = selectedIndexes;
    // Caso só uma opção possa ser marcada de cada vez, desmarca todos os outros elementos antes
    // de marcar um novo.
    if (!multipleSelection) {
      newSelectedIndexes.forEach((_, index) => {
        if (index !== selectedIndex) {
          newSelectedIndexes[index] = false;
        }
      });
    }
    // Inverte a opção pressionada.
    newSelectedIndexes[selectedIndex] = !newSelectedIndexes[selectedIndex];
    setSelectedIndexes([...newSelectedIndexes]);

    // Retorna um novo array contendo o texto correspondente as opções selecionadas.
    const newSelectedOptions = newSelectedIndexes
      .map((selected, index) => {
        return selected ? availableOptions[index] : '';
      })
      .filter(option => option);

    // Caso o campo 'Outro' tenha sido utilizado o valor do ultimo elemento é trocado para o texto
    // digitado pelo usuário.
    if (displayOtherField && selectedIndexes[selectedIndexes.length - 1]) {
      newSelectedOptions[newSelectedOptions.length - 1] = otherValue;
    }
    setSelectedOptions(newSelectedOptions);
    onChange(newSelectedOptions);
  }

  function handleOtherFieldChange(text: string): void {
    const newValues = selectedOptions;
    if (!selectedIndexes[selectedIndexes.length - 1] && text !== '') {
      // Caso o valor do campo ainda não tenha sido adicionado, coloca o novo valor no
      // array
      newValues.push(text);
    } else if (selectedIndexes[selectedIndexes.length - 1]) {
      newValues[newValues.length - 1] = text;
    }
    onChange(newValues);
    setOtherValue(text);
  }

  return (
    <Container>
      {label !== undefined && <LabelText>{label}</LabelText>}
      <OptionsContainer direction={direction}>
        {availableOptions.map((option, index) => (
          <RadioOption
            color={color}
            direction={direction}
            isSelected={selectedIndexes[index]}
            key={option}
            text={option}
            onPress={() => handleOptionSelected(index)}
          />
        ))}
      </OptionsContainer>

      {displayOtherField && selectedIndexes[selectedIndexes.length - 1] && (
        <OtherInputContainer>
          <FormTextInput
            placeholder={i18n.t('RadioGroupComponent.OtherFieldAnswer')}
            onChangeText={handleOtherFieldChange}
          />
        </OtherInputContainer>
      )}
      <ErrorContainer>
        {!!error && <ErrorText>{error}</ErrorText>}
      </ErrorContainer>
    </Container>
  );
};

export default FormRadioGroup;
