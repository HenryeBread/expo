import {useContext} from 'react'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/htpps';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import ErrorOverlay from '../components/ui/ErrorOverlay';

function RecentExpenseScreen() {
    const [isFetching, setIsFetching] = useState(true);
    const expensesCtx = useContext(ExpensesContext);
    const [error, setError] = useState();

    useEffect(() => {
        async function getExpenses() {
            setIsFetching(true);
            try {
                const expenses = await fetchExpenses();
                expensesCtx.setExpenses(expenses) 
            } catch (error) {
                setError('Could not fetch expenses')
            }
           
           setIsFetching(false);
           
        }
        
        getExpenses();
    }, []);

    function errorHandler() {
        setError(null);
    }

    if (error && !isFetching){
        return <ErrorOverlay message={error} onConfirm={errorHandler}/>
    }

    if (isFetching) {
        return <LoadingOverlay />
    }

    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);

        return (expense.date >= date7DaysAgo) && (expense.date <= today);
    });
    return (
        <ExpensesOutput 
            expenses={recentExpenses} 
            expensesPeriod="Last 7 Days" 
            fallbackText="No expenses registered for the last 7 days."/>
    )
};

export default RecentExpenseScreen;