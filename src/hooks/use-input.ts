import { ChangeEvent, useReducer } from 'react';

type validateFnType = (val: string) => boolean;

enum InputActionType {
  INPUT,
  BLUR,
  RESET,
}

interface InputActions {
  type: InputActionType;
  payload?: string;
}

const initialInputState = {
  value: '',
  isTouched: false,
};

const inputStateReducer = (
  state: typeof initialInputState,
  action: InputActions
): typeof initialInputState => {
  switch (action.type) {
    case InputActionType.INPUT:
      return {
        value: action.payload ?? '',
        isTouched: state.isTouched,
      };
    case InputActionType.BLUR:
      return {
        value: state.value,
        isTouched: true,
      };
    case InputActionType.RESET:
      return {
        value: '',
        isTouched: false,
      };
    default:
      return state;
  }
};

const useInput = (validateValue: validateFnType) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: InputActionType.INPUT, payload: e.target.value });
  };

  const inputBlurHandler = () => {
    dispatch({ type: InputActionType.BLUR });
  };

  const reset = () => {
    dispatch({ type: InputActionType.RESET });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
