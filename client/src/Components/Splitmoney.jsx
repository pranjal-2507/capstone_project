import React, { useState } from 'react';
import SplitPaymentCalcClass from './SplitPaymentClass';

const ExpenseSplitter = () => {
    const [calc, setCalc] = useState(new SplitPaymentCalcClass(exampleExpenses));
    const transactions = calc.getTransactions();

    return (
        <div>
            <h1>Expense Splitter</h1>
            <h2>Total Expenses: ${calc.getTotal().toFixed(2)}</h2>
            <h3>Transactions:</h3>
            <ul>
                {transactions.map((txn) => (
                    <li key={txn.id}>
                        {txn.from_friend.name} pays ${txn.amount} to {txn.to_friend.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseSplitter;
