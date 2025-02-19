import { View, StyleSheet, Text, Alert } from 'react-native';
import { Input } from './Input';
import Button from '../ui/Button';
import { getFormattedDate } from '../../util/date';

function ExpenseForm({onCancel, onCancel, onSubmit, defaultValues}) {
    const [inputs, setInputs] = useState({
        amount: 
        { 
            value : defaultValues ? defaultValues.amount.toString(): '',
            isValid: true

        },
        date: 
        { 
             value : defaultValues ? getFormattedDate(defaultValues.date) : '',
             isValid: true
        },
        description: 
        {
           value: defaultValues ? defaultValues.description : '',
           isValid: true
        },
    }); 

    function inputChangedHandler(inputIdentifier, enteredValue){
        setInputs((curInputs) => {
            return {
                ...curInputs,
                [inputIdentifier]: { value: enteredValue, isValid: true }
            };
        });
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            Alert.alert('Invalid input', 'Please check your input values')
            setInputs((curInputs) => {
                return {
                    amount: { value: curInputs.amount.value, isValid: amountIsValid },
                    date: { value: curInputs.date.value, isValid: dateIsValidIsValid },
                    description: { value: curInputs.description.value, isValid: descriptionIsValid },
                }
            })
            return; 
        }

        onSubmit(expenseData);
    }

    const formIsInvalid = 
        !inputs.amount.isValid ||
        !inputs.date.isValid || 
        !inputs.description.isValid;

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input 
                    label="Amount" 
                    invalid={!inputs.amount.isValid}
                    style={styles.rowInput}
                    textInputConfig={{
                        keyboardType: "decimal-pad",
                        onChangeText: inputChangedHandler.bind(this, 'amount'),
                        value: inputs.amount.value
                }}/>
                <Input 
                    label="Date" 
                    invalid={!inputs.date.isValid}
                    style={styles.rowInput}
                    textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText: inputChangedHandler.bind(this, 'date'),
                    value: inputs.date.value,
                }}/>
            </View>
            
            <Input 
                label="Description" 
                invalid={!inputs.description.isValid}
                textInputConfig={{
                multiline: true,
                onChangeText: inputChangedHandler.bind(this, 'description'),
                value: inputs.description.value,
            }}
        />
        {formIsInvalid && 
            <Text style={styles.errorText}>
                Invalid input values - please check your entered data!
            </Text>}
        <View style={styles.buttons}>
            <Button mode="flat" onPress={onCancel} style={styles.button}>Cancel</Button>
            <Button onPress={submitHandler} style={styles.button}>{isEditing ? 'Update' : 'Add'}
                {submitButtonLabel}
            </Button>
        </View>
        </View>
    )
};

export default ExpenseForm;

const styles = StyleSheet.create({
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1
    },
    errorText: {
        textAlign: 'center',
        color: 'lightred',
        marign: 8
    },
    form: {
        marginTop: 40
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120, 
        marginHorizontal: 8
    }
})