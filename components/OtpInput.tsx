import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Keyboard, Pressable, Text, TextInput, View } from 'react-native';
import { Grid } from 'react-native-easy-grid';

type OtpInputProps = {
    getOtp: (otp: string) => void,
    index: number
}
const OtpInput: React.FC<OtpInputProps> = ({ getOtp }) => {
    const [otp, setOtp] = useState('')
    let otpTextInput = null
    const ref = useRef<{ visited: boolean }>({ visited: false })
    useEffect(() => {
        if(!ref.current.visited) {
            otpTextInput.focus()
            ref.current.visited = true
        }
    },[])

    useEffect(() => {
        if(otp.length === 6) {
            Keyboard.dismiss()
        }
        getOtp(otp)
    },[otp])

    const handleChangeText = (text) => {
        setOtp(text)
    }
    const renderInputs = useCallback(() => {
        const inputs = Array(6).fill(0);
        const txt = inputs.map(
            (i, j) => <Pressable onPress={() => {
                otpTextInput.focus()
            }} key={j} className={`border-2 ${j === otp.length ? 'border-[#40B885]' : 'border-none'}  w-12 h-20 bg-[#D8D8D8] rounded-lg align-middle justify-center ml-2`}>
                <Text className="text-5xl text-[#40B885] mt-10 h-20 text-center">{otp[j]}</Text>
            </Pressable>
        );
        return txt;
    }, [otp])
    // const renderInputs = () => {
    //     const inputs = Array(6).fill(0);

    //     const txt = inputs.map(
    //         (i, j) => <Pressable onPress={() => {
    //             otpTextInput.focus()
    //         }} key={j} className={`border-2 ${j === otp.length ? 'border-[#40B885]' : 'border-none'}  w-12 h-20 bg-[#D8D8D8] rounded-lg align-middle justify-center ml-2`}>
    //             <Text className="text-5xl text-[#40B885] mt-10 h-20 text-center">{otp[j]}</Text>
    //         </Pressable>
    //     );
    //     return txt;
    // }
    return (
        <View>
                <Grid className="justify-between px-4 py-8">
                    {renderInputs()}
                </Grid>
                <TextInput className="bg-green-400 absolute opacity-0" 
                    ref={ref => {
                        otpTextInput = ref}
                    }
                    onChangeText={handleChangeText}
                    maxLength={6}
                    keyboardType='numeric'
                    value={otp}
                />
            </View>
        );
}
export default OtpInput
