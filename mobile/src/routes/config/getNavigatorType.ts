import { createStackNavigator } from '@react-navigation/stack';

import type { RootStackParamList } from '../app';
import type { ParamListBase } from '@react-navigation/native';

// Necessário para extrair o tipo de uma função genérica.
class StackNavigatorHelper<T extends ParamListBase> {
  Return = createStackNavigator<T>();
}

type FuncReturnType<T extends ParamListBase> =
  StackNavigatorHelper<T>['Return'];

export type StackScreens = FuncReturnType<RootStackParamList>;
