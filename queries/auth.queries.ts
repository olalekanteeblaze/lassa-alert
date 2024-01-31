import useAuth from "lassa-alert/hooks/useAuth"
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
    const { saveUserData } = useAuth()
    return useMutation({
        mutationFn: (data: any) => AuthApiService.login(data.email, data.password),
        onSuccess: ({ data }) => {
            StoredAccessToken.setAccessToken(data.access_token)
            saveUserData({
                token: data.access_token,
                email: data.user.email,
                firstname: data.user.firstname,
                lastname: data.user.lastname,
                mobileNumber: data.user.mobileNumber,
            })
        },
    })
}