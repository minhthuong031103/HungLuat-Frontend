export const KEY_CONTEXT = {
  TOKEN: 'token',
  REFRESH_TOKEN: 'refreshToken',
  LANGUAGE: 'language',
  THEME_MODE: 'themeMode',
  USER: 'user'
}

export enum EUserType {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  CHANGE_LANGUAGE = 'CHANGE_LANGUAGE',
  CHANGE_PASSWORD = 'CHANGE_PASSWORD',
  UPDATE_AVATAR = 'UPDATE_AVATAR',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  FORGOT_PASSWORD_SCODE = 'FORGOT_PASSWORD_SCODE',
  FORGOT_PASSWORD_SPASSWORD = 'FORGOT_PASSWORD_SPASSWORD'
}

export const imageApartment =
  'https://s3-alpha-sig.figma.com/img/f538/4e15/2c753e8baef4a06273983d45756cae45?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=S6Gvfqlq2ibb~veFg~n0OKTwB~GO1wPJjI8nQnWF~vOzCAl0PaJI~90w15oKMlaMBWA39-RPKIeVivTK1VgLuJ1OKWwRNfy-yQqEfTjIJ2V6H2Q01x1Jy72KyzOG1o-d~MN6sEWqpL0YuVq56Yp23lAx5j7bIXI4GB2g-keFeEnGk2XI-8mikV4dZrIyW7od-S0VkyFAStpiq5ZFyyPDmaijNTd~I2x7lFL1w2dv4WMadubEpkJTRUvI-M3cjlr2SKbG7gjkf0HgGUqJ6Kn2X4jUE6sVDmiLlCwXmMKqb48CHLaJe8i6rSwWeJaOa9B34v-YLNPkRu0n1Xcn4wOrSg__'

export const meaningRoom = [
  {
    id: 1,
    content: 'Chưa xuất phiếu thu',
    className: 'bg-room-red'
  },
  {
    id: 2,
    content: 'Phòng trống',
    className: 'bg-room-empty border-1 border-room-borderColor'
  },
  {
    id: 3,
    content: 'Đợi thu',
    className: 'bg-room-orange'
  },
  {
    id: 4,
    content: 'Đã thu',
    className: 'bg-room-green'
  },
  {
    id: 5,
    content: 'Đặt cọc',
    className: 'bg-room-blue'
  },
  {
    id: 6,
    content: 'Dự kiến trả',
    className: 'bg-room-yellow'
  }
]
