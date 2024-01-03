export const SubEvent = {
    newOrderAdmin: 'new-order-admin',
    allUserRoom: 'all_user_room',
    userIdRoom: (userId: string) => `user_id_${userId}`,
    roleRoom: (role: string) => `${role}_room`,
};

export const PubEvent = {
    markNotifyAsRead: 'mark-notification-as-read',
};
