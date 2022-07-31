export const BASE_URL = process.env.baseUrl
export const BASE_API = process.env.api
export const CLIENT_ID = process.env.client_id
export const CLIENT_SECRET = process.env.client_secret
export const GRANT_TYPE = process.env.grant_type
export const FACEBOOK_APP_ID = process.env.facebook_app_id
export const GOOGLE_CLIENT_ID = process.env.google_client_id
export const STRIPE_PK = process.env.stripe_pk

/* ===========================
        EVENTS
============================================== */
export const EVENT_LOGIN_MODAL = 'EVENT_LOGIN_MODAL'
export const EVENT_SIGNUP_MODAL = 'EVENT_SIGNUP_MODAL'

export const PRODUCT_ID = 1
export const CATEGORY_ID = 2

export const ATTRIBUTE_TYPES = {
  TEXT: 'TEXT',
  CHECKBOX: 'CHECKBOX',
  CHECKBOX_GROUP: 'CHECKBOX_GROUP',
  RADIO_GROUP: 'RADIO_GROUP',
  SELECT: 'SELECT',
}

export const OFFERS_STATUS = {
  new: { name: 'NEW_REQUEST' },
}
