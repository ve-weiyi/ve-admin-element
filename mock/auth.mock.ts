import { defineMock } from "./base";

export default defineMock([
  {
    url: "/admin-api/v1/get_captcha_code",
    method: ["POST"],
    body: {
      code: 200,
      data: {
        captcha_key: "534b8ef2b0a24121bec76391ddd159f9",
        captcha_base64:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAAoCAYAAAA16j4lAAACfklEQVR4Xu3ZzWsTQRjH8Zz9M/wvPHn0YC1WEEEUI4iC1SqCtLQXr4IiCKLiTZQePRgrkniwQbDtpa21Ul+TSpvGZJPmbdPsZvZnstjQTKPbXbKTzdPnW56ydGag9NPSgQ2BI11I/gJHKwYmHgMTj4GJx8DEY2DiMTDxGJh4DEy8NmCjnkfJ+Ibc1iyKxvLOJV9bMOZx+vcpPCs9lZd8zEJGW8Hi50lE4+OYnX8obyCRDaybqzZqtvq+bSxLyPt9abL8HMfTAxjRhuUlX/ry4zVi8Qm8ejvSNkKY8ta+LySsWhuqVv3Qem7+lvuVaHyM50ZxIRPGvcJdG3giP4ax3E2EM2eRMH/KR7rSVq3Qhvrm3Sht4Oanan0NlcYP1BTFxnNKCbBpmRjOXrJh5TmRHsRS7aN8pGt9T8aw/PUF8oUEEr+m6QPvTBVwM9H4FzClR3AyPdTCvVO4jU2xKW/1LQb2sXR9w/5rbcI+KN7HUPqY/RzRX8pbfYuBfUy3dFzVLuOadgVlUcaT4iOcy5zBJ2NJ3upbKoGNmkA2pSOzXvnnVMvd/R56ChyEVAE3cW8MxnD+UOS/c/HwFJIrBfm45xhYEbCoW7gVju8Clef60ShSybJ83HMMrAi4V7kGPlBb7Dj9GgP/zQnSaT2oqQR2e8k6cnCm47hpT8Bu4NzsDUKqgL1csmRYL8iOwF7AvJzpVaqA93zJGohiY1XhJcsLlpczvUoVcK9i4H0HbK63gLdfF7oBc7M3CO074LpV6fjC3+mW7LQe1IqlNfvd8NzCY3mJRLuAndqGlIcLZq6Buf6KgYnHwMRjYOIxMPEYmHgMTDwGJh4DE4+BicfAxPsD/cvCgjI41TUAAAAASUVORK5CYII=",
        captcha_code: "1234",
      },
      msg: "一切ok",
    },
  },
  {
    url: "/admin-api/v1/login",
    method: ["POST"],
    body: {
      code: 200,
      data: {
        user_id: "1",
        scope: "admin",
        token: {
          token_type: "Bearer",
          access_token:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImRlcHRJZCI6MSwiZGF0YVNjb3BlIjoxLCJ1c2VySWQiOjIsImlhdCI6MTcyODE5MzA1MiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdLCJqdGkiOiJhZDg3NzlhZDZlYWY0OWY3OTE4M2ZmYmI5OWM4MjExMSJ9.58YHwL3sNNC22jyAmOZeSm-7MITzfHb_epBIz7LvWeA",
          expires_in: 7200,
          refresh_token:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImRlcHRJZCI6MSwiZGF0YVNjb3BlIjoxLCJ1c2VySWQiOjIsImlhdCI6MTcyODE5MzA1MiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdLCJqdGkiOiJhZDg3NzlhZDZlYWY0OWY3OTE4M2ZmYmI5OWM4MjExMSJ9.58YHwL3sNNC22jyAmOZeSm-7MITzfHb_epBIz7LvWeA",
          refresh_expires_in: 604800,
          refresh_expires_at: 1735797052,
        },
      },
      msg: "一切ok",
    },
  },
  {
    url: "/admin-api/v1/email_login",
    method: ["POST"],
    body: {
      code: 200,
      data: {
        user_id: "1",
        scope: "admin",
        token: {
          token_type: "Bearer",
          access_token:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImRlcHRJZCI6MSwiZGF0YVNjb3BlIjoxLCJ1c2VySWQiOjIsImlhdCI6MTcyODE5MzA1MiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdLCJqdGkiOiJhZDg3NzlhZDZlYWY0OWY3OTE4M2ZmYmI5OWM4MjExMSJ9.58YHwL3sNNC22jyAmOZeSm-7MITzfHb_epBIz7LvWeA",
          expires_in: 7200,
          refresh_token:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImRlcHRJZCI6MSwiZGF0YVNjb3BlIjoxLCJ1c2VySWQiOjIsImlhdCI6MTcyODE5MzA1MiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdLCJqdGkiOiJhZDg3NzlhZDZlYWY0OWY3OTE4M2ZmYmI5OWM4MjExMSJ9.58YHwL3sNNC22jyAmOZeSm-7MITzfHb_epBIz7LvWeA",
          refresh_expires_in: 604800,
          refresh_expires_at: 1735797052,
        },
      },
      msg: "一切ok",
    },
  },
  {
    url: "/admin-api/v1/phone_login",
    method: ["POST"],
    body: {
      code: 200,
      data: {
        user_id: "1",
        scope: "admin",
        token: {
          token_type: "Bearer",
          access_token:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImRlcHRJZCI6MSwiZGF0YVNjb3BlIjoxLCJ1c2VySWQiOjIsImlhdCI6MTcyODE5MzA1MiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdLCJqdGkiOiJhZDg3NzlhZDZlYWY0OWY3OTE4M2ZmYmI5OWM4MjExMSJ9.58YHwL3sNNC22jyAmOZeSm-7MITzfHb_epBIz7LvWeA",
          expires_in: 7200,
          refresh_token:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImRlcHRJZCI6MSwiZGF0YVNjb3BlIjoxLCJ1c2VySWQiOjIsImlhdCI6MTcyODE5MzA1MiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdLCJqdGkiOiJhZDg3NzlhZDZlYWY0OWY3OTE4M2ZmYmI5OWM4MjExMSJ9.58YHwL3sNNC22jyAmOZeSm-7MITzfHb_epBIz7LvWeA",
          refresh_expires_in: 604800,
          refresh_expires_at: 1735797052,
        },
      },
      msg: "一切ok",
    },
  },
  {
    url: "/admin-api/v1/logout",
    method: ["GET"],
    body: {
      code: 200,
      data: {},
      msg: "登出成功",
    },
  },
  {
    url: "/admin-api/v1/register",
    method: ["POST"],
    body: {
      code: 200,
      data: {},
      msg: "注册成功",
    },
  },
  {
    url: "/admin-api/v1/send_email_verify_code",
    method: ["POST"],
    body: {
      code: 200,
      data: {},
      msg: "验证码发送成功",
    },
  },
]);
