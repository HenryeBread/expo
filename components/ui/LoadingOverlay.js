import { View, ActivityIndicator} from 'react-native';

function LoadingOverlay() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="white"/>
        </View>
    )
};

export default LoadingOverlay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justidyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: 'darkpurple'
    }
})