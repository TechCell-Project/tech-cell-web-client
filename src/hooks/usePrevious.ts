import { useEffect, useRef } from 'react';

// hold previous state value of useState, but for string only
function usePrevious(value: string) {
    const ref = useRef<string>();
    useEffect(() => {
        ref.current = value; //assign the value of ref to the argument
    }, [value]); //this code will run when the value of 'value' changes
    return ref.current; //in the end, return the current ref value.
}
export default usePrevious;
