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
} from './styles';

interface FormRadioGroupProps {
  fieldName: string;
  label?: string | undefined;
  multipleSelection?: boolean | undefined;
  options: string[];
  error?: string | string[] | undefined;
  onChange: (fieldName: string, fieldValue: string[]) => void;
}

const FormRadioGroupInput: React.FC<FormRadioGroupProps> = ({
  fieldName,
  label,
  options,
  error,
  multipleSelection = false,
  onChange,
}) => {
  // Inicia todas as opções como não selecionadas
  const [selectedIndexes, setSelectedIndexes] = useState<{
    [key: string]: boolean;
  }>(options.reduce((object, _, index) => ({ ...object, [index]: false }), {}));

  function handleOptionSelected(selectedIndex: number) {
    // Inverte a opção pressionada.
    const newSelectedIndexes: { [key: string]: boolean } = {
      ...selectedIndexes,
      [selectedIndex]: !selectedIndexes[selectedIndex],
    };

    // Caso só uma opção possa ser marcada de cada vez, desmarca todos os elementos que não são o
    // selecionado.
    if (!multipleSelection) {
      Object.keys(newSelectedIndexes).forEach((index) => {
        if (parseInt(index, 10) !== selectedIndex) {
          newSelectedIndexes[index] = false;
        }
      });
    }

    setSelectedIndexes(newSelectedIndexes);
    onChange(
      fieldName,
      // Cria um array de strings contendo as opções selecionadas.
      Object.keys(newSelectedIndexes)
        .filter((index) => newSelectedIndexes[index])
        .map((index) => options[parseInt(index, 10)]),
    );
  }

  return (
    <Container>
      {label !== undefined ? <LabelText>{label}</LabelText> : null}
      <OptionsContainer>
        {options.map((option, index) => {
          return (
            <OptionButton
              selected={selectedIndexes[index]}
              key={option}
              activeOpacity={1}
              onPress={() => handleOptionSelected(index)}>
              <OuterCircle selected={selectedIndexes[index]}>
                <InnerCircle selected={selectedIndexes[index]} />
              </OuterCircle>
              <TextOption>{option}</TextOption>
            </OptionButton>
          );
        })}
      </OptionsContainer>
      <ErrorContainer>
        {error ? <ErrorText>{error}</ErrorText> : null}
      </ErrorContainer>
    </Container>
  );
};

export default FormRadioGroupInput;
