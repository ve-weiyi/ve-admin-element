import { defineMock } from "./base";

export default defineMock([
  {
    url: "menus/routes",
    method: ["GET"],
    body: {
      code: "00000",
      data: [
        {
          path: "/api",
          component: "Layout",
          name: "/api",
          meta: {
            title: "接口文档",
            icon: "api",
            hidden: false,
            alwaysShow: true,
            params: null,
          },
          children: [
            {
              path: "apifox",
              component: "demo/api/apifox",
              name: "Apifox",
              meta: {
                title: "Apifox",
                icon: "api",
                hidden: false,
                keepAlive: true,
                alwaysShow: false,
                params: null,
              },
            },
          ],
        },
        {
          path: "/doc",
          component: "Layout",
          redirect: "https://juejin.cn/post/7228990409909108793",
          name: "/doc",
          meta: {
            title: "平台文档",
            icon: "document",
            hidden: false,
            alwaysShow: false,
            params: null,
          },
          children: [
            {
              path: "internal-doc",
              component: "demo/internal-doc",
              name: "InternalDoc",
              meta: {
                title: "平台文档(内嵌)",
                icon: "document",
                hidden: false,
                alwaysShow: false,
                params: null,
              },
            },
            {
              path: "https://juejin.cn/post/7228990409909108793",
              name: "Https://juejin.cn/post/7228990409909108793",
              meta: {
                title: "平台文档(外链)",
                icon: "el-icon-link",
                hidden: false,
                alwaysShow: false,
                params: null,
              },
            },
          ],
        },
      ],
      msg: "一切ok",
    },
  },
]);
