import { useState } from 'react';

const useInput = <T>(
    initialValue: T,
    validateValue: (value: T) => boolean
) => {
    const [enteredValue, setEnteredValue] = useState<T>(initialValue);
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateValue(enteredValue);
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = (value: T) => {
        setEnteredValue(value);
    };

    const valueBlurHandler = () => {
        setIsTouched(true);
    };

    const reset = () => {
        setEnteredValue(initialValue);
        setIsTouched(false);
    };

    return {
        value: enteredValue,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        setValue: setEnteredValue,
        valueBlurHandler,
        reset,
    };
};

export default useInput;