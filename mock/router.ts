import mock from "mockjs";

const routers = [
  {
    pid: 0,
    id: 1,
    path: "dashboard",
    component: "/views/dashboard",
    name: "dashboard",
    meta: {
      title: "router.title.dashboard",
      auth: false,
      isMenu: true,
      icon: "icon-dashboard",
    },
  },
  {
    pid: 1,
    id: 2,
    path: "workplace",
    component: "/views/dashboard/workplace.vue",
    name: "workplace",
    meta: {
      title: "router.title.workbench",
      auth: false,
      isMenu: true,
      icon: "icon-common",
    },
  },
  {
    pid: 0,
    id: 3,
    path: "notComponent",
    component: "/views/notComponent",
    name: "notExist",
    meta: {
      title: "router.title.abnormal",
      auth: false,
      isMenu: true,
      icon: "icon-exclamation-polygon-fill",
    },
  },
  {
    pid: 0,
    id: 4,
    path: "utils",
    component: "/views/utils",
    name: "utils",
    meta: {
      title: "router.title.toolLibrary",
      auth: false,
      isMenu: true,
      icon: "icon-calendar",
    },
  },
  {
    pid: 4,
    id: 5,
    path: "fileSplit",
    component: "/views/utils/FileSplit",
    name: "fileSplit",
    meta: {
      title: "router.title.fileSplitting",
      auth: false,
      isMenu: true,
      icon: "icon-file",
    },
  },
];

const validPperiod = 1000 * 60 * 60;

export default [
  {
    url: "/api/v1/router/routers",
    method: "get",
    response: (req: any) => {
      const isOk = verifiToken(req.headers.authorization);
      if (!isOk) {
        req.headers["new-token"] = mock.Random.word(20, 50) + "-" + Date.now();
      }
      return {
        stateCode: 200,
        message: "ok",
        data: routers,
      };
    },
  },
];

function verifiToken(tokenstr: string) {
  const token = tokenstr.split(" ")[1];
  const time = token.split("-")[1];
  return Number(time + validPperiod) > Date.now();
}
