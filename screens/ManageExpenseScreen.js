import { useLayoutEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import IconButton from '../components/ui/IconButton';
import { deleteExpense } from '../util/htpps';
import { setError } from ''
import {ExpensesContext} from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { storeExpense, updateExpense } from '../util/htpps';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import ErrorOverlay from '../components/ui/ErrorOverlay';

function ManageExpenseScreen({route}) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const expensesCtx = useContext(ExpensesContext)
    const [errorState, setErrorState] = useState();
    
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    const selectedExpense = expensesCtx.expenses.find(expense => expense.id === editedExpenseId)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        });
    }, [navigation, isEditing]);

    async function deleteExpenseHandler() {
        setIsSubmitting(true);
        try {
            await deleteExpense(editedExpenseId);
            expensesCtx.deleteExpense(editedExpenseId);
            navigation.goBack();
        } catch (error) {
            setErrorState('Could not delete expense')
            setIsSubmitting(false);
        }
        
    };

    function cancelHandler() {
        navigation.goBack();
        expensesCtx.deleteExpense(editedExpenseId);
    };

    async function confirmHandler(expenseData) {
        setIsSubmitting(true);
        try {

            if (isEditing) {
                expensesCtx.updateExpense(
                    editedExpenseId, expenseData
                );
                await updateExpense(editedExpenseId,expenseData);
            } else {
                const id = await storeExpense(expenseData);
                expensesCtx.addExpense({...expenseData, id: id});
            }
            navigation.goBack();
        } catch (error) {
            setError('Could not save data');
            setIsSubmitting(false)
        }
        
         
        
    };

    if (error && !isSubmitting) {
        return <ErrorOverlay message={error} />
    }

    if (isSubmitting) {
        return <LoadingOverlay />
    }

    return (
    <View style={styles.container}>
        <ExpenseForm 
            onCancel={cancelHandler} 
            submitButtonLabel={isEditing ? 'Update' : 'Add'}
            onSubmit={confirmHandler}
            defaultValues={selectedExpense}
        />
        
        {isEditing && (
            <View style={styles.deleteContainer}>
            <IconButton 
                icon="trash" 
                color="gray" 
                size={36} 
                onPress={deleteExpenseHandler}
            />
            </View>
        )}
    </View>
    ) 
        
};

export default ManageExpenseScreen;

const styles= StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'darkpurple'
    },
    
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: 'lightpurple',
        alignItems: 'center'
    }
})