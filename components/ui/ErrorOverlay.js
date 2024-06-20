import { View, Text} from 'react-native';

function ErrorOverlay(message) {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>An error occured!</Text>
            <Text style={styles.text}>{message}</Text>
            
        </View>
    )
};

export default ErrorOverlay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justidyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: 'darkpurple'
    },
    text: {
        color: 'white',
        textAlign: 'center',
        marginBottom: 8
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})