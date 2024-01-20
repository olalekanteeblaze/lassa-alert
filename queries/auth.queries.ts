import { useNavigation } from "@react-navigation/native"
import { AuthApiService } from "lassa-alert/lib/http/services/auth.api.service"
import { StoredAccessToken } from "lassa-alert/lib/util/stored-access-token.util"
import { useMutation } from "react-query"

export const useRegister = () => {
    return useMutation({
        mutationFn: (data) => AuthApiService.register(data)
    })
}

export const useValidateOtp = () => {
    return useMutation({
        mutationFn: (data) => AuthApiService.validateOtp(data)
    })
}

export const useSignInUser = () => {
    const { navigate } = useNavigation(  )
    return useMutation({
        mutationFn: (data: any) => AuthApiService.login(data.email, data.password),
        onSuccess: (data: any) => {
            StoredAccessToken.setAccessToken(data.access_token);
            StoredAccessToken.setRefreshToken(data.refresh_token);
            navigate('Main')
        }
    })
}