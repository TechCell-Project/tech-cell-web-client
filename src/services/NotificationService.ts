import instanceAuth from "@config/instanceAuth.config";
import { getSearchParams } from '@utils/funcs';
import { PagingResponse } from '@models/Common';
import { NotificationModel, PagingNotify } from '@models/Notification';
import { NOTIFICATION_ENDPOINT } from '@constants/Services';

export const getNotifications = (params: PagingNotify) => {
    const url = getSearchParams(params);
    return instanceAuth.get<PagingResponse<NotificationModel>>(NOTIFICATION_ENDPOINT + '?' + url);
};