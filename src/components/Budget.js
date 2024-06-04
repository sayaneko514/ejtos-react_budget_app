import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, currency, dispatch, expenses } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);

    const totalExpenses = expenses.reduce((total, item) => {
        return (total = total + item.cost);
    }, 0);

    const handleBudgetChange = (event) => {
        const value = Number(event.target.value);
        if (value < totalExpenses) {
            alert("You cannot reduce the budget lower than total spending");
            setNewBudget(budget);
        } else if (value > 20000) {
            alert(`Budget exceeds limit of ${currency} 20,000`);
            setNewBudget(budget);
        } else if (value >= 0) {
            setNewBudget(value);
            dispatch({ type: 'SET_BUDGET', payload: value });
        }
    }

    return (
        <div className='alert alert-secondary'>
            <span>Budget: {currency}</span>
            <input
                type="number"
                step="10"
                min="0"
                value={newBudget}
                onChange={handleBudgetChange}
            />
        </div>
    );
};

export default Budget;