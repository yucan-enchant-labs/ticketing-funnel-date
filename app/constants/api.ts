export enum AuthQueryList {
  logout = '/v1/auth/logout',
  user = '/v1/auth/user',
  login = '/v1/auth/magicLinkLogin',
  sendMagicLink = '/v1/auth/sendMagicLink',
}

export const UserQueryList = {
  getUser: () => `/v1/auth/user`,
  updateUser: () => `/v1/auth/user`,
  uploadImage: () => `/v1/auth/user/uploadProfileImage`,
};

export const OrdersQueryList = {
  getOrders: () => `/v1/selfServe/order`,
  getOrderWithDetails: (orderId: string) => `/v1/selfServe/order/${orderId}`,
  cancelVisit: (orderId: string) => `/v1/selfServe/order/${orderId}/cancel`,
  changeDate: (orderId: string) => `/v1/selfServe/order/${orderId}/changeDate`,
  upgradeToVip: (orderId: string) => `/v1/selfServe/order/${orderId}/upgradeToVip`,
  purchaseAddOns: (orderId: string) => `/v1/selfServe/order/${orderId}/purchaseAddOns`,
};

export const EventsQueryList = {
  getEventAvailable: (sellerId: string) =>
    `/v1/selfServe/events/available?_seller=${sellerId}&hidden_type=public_browsable&ticket_group.hidden_type._in=public_browsable&_embed=ticket_group,ticket_type,first_session,meta,seller,venue,seller.meta`,
  getSellerData: (sellerId: string) =>
    `/cached_api/events/available?_seller=${sellerId}&hidden_type=public_browsable&ticket_group.hidden_type._in=public_browsable&_embed=ticket_group,ticket_type,first_session,meta,seller,venue,seller.meta`,
  getEventSessions: (eventTemplateId: string) => `/v1/selfServe/events/${eventTemplateId}/sessions`,
  getEventSessionAndPrice: (eventTemplateId: string) => `/v1/selfServe/events/${eventTemplateId}/sessions?_limit=1000`,
  getEventSessionsForOneDate: (eventTemplateId: string, onDate: string) =>
    `/v1/selfServe/events/${eventTemplateId}/sessions?_ondate=${onDate}`,
  postEventSessions: (orderId: string) => `/v1/selfServe/events/${orderId}/sessions`,
};

export const CartQueryList = {
  createCart: () => `/v1/selfServe/cart`,
  reserveTicketsInCart: (cartId: string) => `/v1/selfServe/cart/${cartId}/reserve`,
  checkoutCart: (cartId: string) => `/v1/selfServe/cart/${cartId}/checkout`,
  guestCheckoutCart: (cartId: string) => `/v1/my/cart/${cartId}/guest_checkout`,
  createTicketUser: () => `/v1/selfServe/user`,
  checkCode: (code: string, sellerId: string) => `/v1/code/${code}?mode=cartmod,code&_seller=${sellerId}`,
  applyCode: (cartId: string, sellerId: string) => `/v1/my/cart/${cartId}/applyCode?sellerId=${sellerId}`,
};

export const ReferralQueryList = {
  generate: () => `/v1/user/generateReferralCode`,
  getReferrals: () => `/v1/user/getReferrals`,
  checkUsage: (email: string) => `/v1/referrals/checkEmailUsage?email=${email}`,
};

// export const 