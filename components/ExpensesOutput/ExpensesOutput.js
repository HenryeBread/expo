import { View, StyleSheet } from 'react-native'; 
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';



function ExpensesOutput({ expenses, expensesPeriod, fallbackText }) {
    let content = <Text style={styles.infoText}>{fallbackText}</Text>

    if (expenses.length > 0) {
        content = <ExpensesList expenses={expenses} />
    }
    return (
        <View style = {styles.container}>
            <ExpensesSummary 
                expenses={expenses} 
                periodName={expensesPeriod} />
            <ExpensesList expenses={expenses}/>
        </View>
    )
};

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'lightyellow',
        paddingTop: 24,
        paddingBottom: 0
    },
    infoText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32
    }
})