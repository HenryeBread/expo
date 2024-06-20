import { Pressable, Text, View } from 'react-native';

function Button({children, onPress, mode, style}) {
    return (
        <View style={style}>
            <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
                <View style={[styles.button, mode === 'flat' && styles.flat]}>
                    <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>{children}</Text>
                </View>
            </Pressable>
        </View>
    )
}

export default Button;

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        padding: 8,
        backgroundColor: 'purple'
    },
    flat: {
        backgroundColor: 'transparent'
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    },
    flatText: {
        color: 'lightpurple'
    },
    pressed: {
        opacity: 0.75,
        backgroundColor: 'lightgray',
        borderRadius: 4
    }
})