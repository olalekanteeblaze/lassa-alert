import { NotificationApiService } from "lassa-alert/lib/http/services/notification.api.service"
import { useMutation, useQuery } from "react-query"
import { NOTIFICATIONS_QUERY_KEY } from "./query-keys"

export const useSubscribe = () => {
    return useMutation({
        mutationFn: (data: { email: string, deviceToken: string }) => NotificationApiService.subscribe(data.email, data.deviceToken),
        onSuccess: () => {
            console.log('subscribed')
        },
        onError: (err) => {
            console.log(err)
        }
    })
}

export const useGetNotifications = () => {
    return useQuery([NOTIFICATIONS_QUERY_KEY], () => NotificationApiService.getNotifications())
}