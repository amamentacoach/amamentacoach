import i18n from 'i18n-js';
import { useEffect, useState } from 'react';

import FormTextInput from 'components/FormTextInput';

import {
  Container,
  ErrorContainer,
  ErrorText,
  HorizontalOptionButton,
  InnerCircle,
  LabelText,
  OptionsContainer,
  OtherInputContainer,
  OuterCircle,
  TextOption,
  VerticalOptionButton,
} from './styles';

interface FormRadioGroupProps {
  fieldName: string;
  options: string[];
  label?: string;
  multipleSelection?: boolean;
  displayOtherField?: boolean;
  // Elementos selecionados inicialmente. Devem estar presentes em options.
  initialValues?: string[];
  error?: string | string[];
  // Define se as opções são apresentadas horizontalmente ou verticalmente.
  isHorizontal?: boolean;
  color?: string;
  onChange: (fieldName: string, fieldValue: string[]) => void;
}

const FormRadioGroupInput: React.FC<FormRadioGroupProps> = ({
  fieldName,
  label,
  options,
  error,
  isHorizontal,
  color,
  multipleSelection,
  displayOtherField,
  initialValues,
  onChange,
}) => {
  const availableOptions = displayOtherField
    ? [...options, i18n.t('Other')]
    : options;

  // Inicia todas as opções como não selecionadas
  const [selectedIndexes, setSelectedIndexes] = useState<boolean[]>(
    availableOptions.map(() => false),
  );
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    initialValues || [],
  );
  const [otherValue, setOtherValue] = useState('');

  useEffect(() => {
    if (initialValues) {
      initialValues?.forEach(value => {
        const index = options.findIndex(element => element === value);
        const selected = [...selectedIndexes];
        selected[index] = true;
        setSelectedIndexes(selected);
      });
    }
  }, []);

  function handleOptionSelected(selectedIndex: number): void {
    const newSelectedIndexes = selectedIndexes;
    // Caso só uma opção possa ser marcada de cada vez, desmarca todos os outro elementos antes
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
    onChange(fieldName, newSelectedOptions);
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
    onChange(fieldName, newValues);
    setOtherValue(text);
  }

  return (
    <Container>
      {label !== undefined && <LabelText>{label}</LabelText>}
      <OptionsContainer isHorizontal={isHorizontal}>
        {availableOptions.map((option, index) => {
          const RadioButtonComponent = isHorizontal
            ? HorizontalOptionButton
            : VerticalOptionButton;

          return (
            <RadioButtonComponent
              key={option}
              color={color}
              selected={selectedIndexes[index]}
              activeOpacity={1}
              isHorizontal={isHorizontal}
              onPress={() => handleOptionSelected(index)}>
              {isHorizontal && (
                <OuterCircle color={color} selected={selectedIndexes[index]}>
                  <InnerCircle
                    color={color}
                    selected={selectedIndexes[index]}
                  />
                </OuterCircle>
              )}

              <TextOption
                selected={selectedIndexes[index]}
                isHorizontal={isHorizontal}
                color={color}>
                {option}
              </TextOption>
            </RadioButtonComponent>
          );
        })}
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

export default FormRadioGroupInput;
