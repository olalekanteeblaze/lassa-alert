import { useNavigation } from "@react-navigation/core"
import { Image, TouchableOpacity, Text, StyleSheet } from "react-native"
import { ArrowLeftIcon, BackwardIcon } from "react-native-heroicons/solid"

interface BackButtonProps {
    variant?: string,
    title?: string
}

const BackButton: React.FC<BackButtonProps> = ({ variant, title }) => {
    const navigation = useNavigation()
    const isWhite = variant  === 'white'
    return (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.container}>
            <ArrowLeftIcon color={'#40B885'} fontWeight={500} fontSize={24}/>
            {title ? <Text style={[styles.title, isWhite ? styles.whiteTitle : styles.blackTitle]}>{title}</Text>: null}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    title: {
        alignSelf: 'center',
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
    },
    blackTitle: {
        color: '#40B885'
    },
    whiteTitle: {
        color: 'white'
    }
})
export default BackButton