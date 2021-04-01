import React, { useState } from 'react';

import {
  Container,
  ErrorContainer,
  ErrorText,
  InnerCircle,
  LabelText,
  OptionButton,
  OptionsContainer,
  OuterCircle,
  TextOption,
  OtherInputContainer,
} from './styles';
import FormTextInput from '../FormTextInput';

interface FormRadioGroupProps {
  fieldName: string;
  label?: string;
  multipleSelection?: boolean;
  displayOtherField?: boolean;
  options: string[];
  error?: string | string[];
  // Define se as opções são apresentadas horizontalmente ou verticalmente.
  horizontal?: boolean;
  onChange: (fieldName: string, fieldValue: string[]) => void;
}

const FormRadioGroupInput: React.FC<FormRadioGroupProps> = ({
  fieldName,
  label,
  options,
  error,
  horizontal,
  multipleSelection,
  displayOtherField,
  onChange,
}) => {
  const availableOptions = displayOtherField ? [...options, 'Outro'] : options;

  // Inicia todas as opções como não selecionadas
  const [selectedIndexes, setSelectedIndexes] = useState<boolean[]>(
    availableOptions.map(() => false),
  );
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [otherValue, setOtherValue] = useState('');

  function handleOptionSelected(selectedIndex: number) {
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

  return (
    <Container>
      {label !== undefined && <LabelText>{label}</LabelText>}
      <OptionsContainer horizontal={horizontal}>
        {availableOptions.map((option, index) => (
          <OptionButton
            key={option}
            selected={selectedIndexes[index]}
            activeOpacity={1}
            horizontal={horizontal}
            onPress={() => handleOptionSelected(index)}>
            {!horizontal && (
              <OuterCircle selected={selectedIndexes[index]}>
                <InnerCircle selected={selectedIndexes[index]} />
              </OuterCircle>
            )}

            <TextOption
              selected={selectedIndexes[index]}
              horizontal={horizontal}>
              {option}
            </TextOption>
          </OptionButton>
        ))}
      </OptionsContainer>

      {displayOtherField && selectedIndexes[selectedIndexes.length - 1] && (
        <OtherInputContainer>
          <FormTextInput
            placeholder="Resposta para outro "
            onChangeText={(text: string) => {
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
            }}
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
