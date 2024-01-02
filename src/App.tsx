import React, { useState } from "react";
import styles from './Caluclator.module.css'

interface CalculatorProps {
    leftNum: number;
    rightNum: number;
}

const Calculator: React.FC<CalculatorProps> = () => {
    const [value, setValue] = useState('');
    const [prevValue, setPrevValue] = useState('');
    const [mathematicalOperation, setMathematicalOperation] = useState('');

    const handleNumber = (e: React.MouseEvent<HTMLButtonElement>) => {
        setValue(value.concat(e.currentTarget.value));
    };

    const handleOperation = (e: React.MouseEvent<HTMLButtonElement>) => {
        setPrevValue(value);
        setValue(`${value} ${e.currentTarget.value} `);
        setMathematicalOperation(e.currentTarget.value);
        setValue('')
    };

    const handleCalculate = () => {
        if (prevValue && value) {
            const leftNumber = parseFloat(prevValue);
            const rightNumber = parseFloat(value);

            switch (mathematicalOperation) {
                case '+':
                    setValue((leftNumber + rightNumber).toString());
                    break;
                case '-':
                    setValue((leftNumber - rightNumber).toString());
                    break;
                case '*':
                    setValue((leftNumber * rightNumber).toString());
                    break;
                case '/':
                    setValue((leftNumber / rightNumber).toString());
                    break;
                default:
                    break;
            }
            setPrevValue('');
            setMathematicalOperation('');
        }
    };

    const handleClear = () => {
        setValue('');
        setPrevValue('');
        setMathematicalOperation('');
    };

    return (
        <div className={styles.calculatorContainerV2}>
            <div className={styles.calculatorContainer}>
                <div className={styles.inputStyles}>{value}</div>
                <div />
                <div className={styles.buttons}>
                    <button value="1" onClick={handleNumber}>1</button>
                    <button value="2" onClick={handleNumber}>2</button>
                    <button value="3" onClick={handleNumber}>3</button>
                    <button value="+" onClick={handleOperation}>+</button>
                    <button value="4" onClick={handleNumber}>4</button>
                    <button value="5" onClick={handleNumber}>5</button>
                    <button value="6" onClick={handleNumber}>6</button>
                    <button value="-" onClick={handleOperation}>-</button>
                    <button value="7" onClick={handleNumber}>7</button>
                    <button value="8" onClick={handleNumber}>8</button>
                    <button value="9" onClick={handleNumber}>9</button>
                    <button value="/" onClick={handleOperation}>/</button>
                    <button value="0" onClick={handleNumber}>0</button>
                    <button value="." onClick={handleNumber}>,</button>
                    <button value="*" onClick={handleOperation}>*</button>
                    <button onClick={handleClear}>C</button>
                    <button onClick={handleCalculate}>=</button>
                </div>
            </div>
        </div>
    );
};

export default Calculator;
