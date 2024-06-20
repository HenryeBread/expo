import { View, TextInput, StyleSheet } from 'react-native';

function Input({label, style, textInputConfig}) {

    const inputStyles = [styles.input]

    if (textInputConfig && textInputConfig.multiline){
        inputStyles.push[styles.input];
    }

    if (invalid) {
        inputStyles.push(styles.invalidInput);
    }

    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
            <TextInput style={inputStyles}{...textInputConfig}/>
        </View>
    );
};

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8
    },
    label: {
        fontSize: 12,
        color: 'darkpurple',
        marginBottom: 4
    },
    input: {
        backgroundColor: 'lightgray',
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
        color: 'darkpurple'
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top'
    },
    invalidLabel: {
        color: 'red'
    },
    invalidInput: {
        backgroundColor: 'lightred'
    }
})