import { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

function AllExpenseScreen() {
    const expensesCtx = useContext(ExpressContext);
    return (
        <ExpensesOutput 
            expenses={expensesCtx.expenses} 
            expensesPeriod="Total" 
            fallbackText="No registered expenses found!"/>
    )
};

export default AllExpenseScreen;