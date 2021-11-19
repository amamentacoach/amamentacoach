import { createStackNavigator } from '@react-navigation/stack';

import type { ParamListBase } from '@react-navigation/native';
import type { RootStackParamList } from 'routes/app';

// Necessário para extrair o tipo de uma função genérica.
class StackNavigatorHelper<T extends ParamListBase> {
  Return = createStackNavigator<T>();
}

type FuncReturnType<T extends ParamListBase> =
  StackNavigatorHelper<T>['Return'];

export type StackScreens = FuncReturnType<RootStackParamList>;
