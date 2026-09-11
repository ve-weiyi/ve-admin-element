import { defineMock } from "./base";

/** 模拟验证码，生成可读的 SVG 图片便于开发态登录 */
const MOCK_CAPTCHA_CODE = "1234";

const mockCaptchaImage = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="40">
     <rect width="120" height="40" fill="#f2f3f5"/>
     <text x="60" y="27" font-size="20" font-family="monospace" text-anchor="middle" fill="#303133">${MOCK_CAPTCHA_CODE}</text>
   </svg>`
)}`;

/** 模拟令牌，字段与后端 Token 结构一致 */
const mockToken = {
  token_type: "Bearer",
  access_token: "mock-access-token",
  expires_in: 3600,
  refresh_token: "mock-refresh-token",
  refresh_expires_in: 604800,
  refresh_expires_at: Math.floor(Date.now() / 1000) + 604800,
};

/** 模拟登录响应 */
const mockLoginResp = {
  user_id: "00000000-0000-0000-0000-000000000001",
  user_type: "admin",
  scope: "admin",
  token: mockToken,
};

export default defineMock([
  {
    url: "auth/captcha",
    method: ["GET"],
    body: {
      code: 200,
      data: {
        captcha_key: "mock-captcha-key",
        captcha_base64: mockCaptchaImage,
        captcha_code: MOCK_CAPTCHA_CODE,
      },
      msg: "ok",
    },
  },

  {
    url: "auth/login/password",
    method: ["POST"],
    body: { code: 200, data: mockLoginResp, msg: "ok" },
  },

  {
    url: "auth/refresh-token",
    method: ["POST"],
    body: { code: 200, data: mockLoginResp, msg: "ok" },
  },

  {
    url: "auth/logout",
    method: ["POST"],
    body: { code: 200, data: {}, msg: "ok" },
  },
]);
