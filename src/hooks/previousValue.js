import { useRef } from 'react';
import { isEqual } from 'lodash';

function usePreviousValue(newValue) {
  const ref = useRef();

  const currentValue = ref.current && ref.current.currentValue;
  if (!isEqual(newValue, currentValue)) {
    ref.current = {
      previousValue: currentValue,
      currentValue: newValue
    };
  }

  return ref.current ? ref.current.previousValue : null;
}

export default usePreviousValue;