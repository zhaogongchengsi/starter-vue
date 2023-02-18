<template>
  <div class="w-full h-screen relative dark:bg-#232324 flex items-center justify-center">
    <div class="login-box-bg rounded-md flex" ref="boxref">

      <div class="z-10 h-150 flex items-center text-black border-box p-10 dark:text-white rounded-md login-container-box">
        <div class="w-150">
          <a-form size="large" :model="form" layout="vertical" :label-col-props="{ span: 3 }"
            :wrapper-col-props="{ span: 21 }" @submit="handleSubmit">
            <a-form-item field="account" :label="translate('loginpage.from.account')">
              <a-input v-model="form.account" :placeholder="translate('loginpage.from.place.account')" />
            </a-form-item>
            <a-form-item field="password" :label="translate('loginpage.from.password')">
              <a-input v-model="form.password" :placeholder="translate('loginpage.from.place.password')" />
            </a-form-item>
            <a-form-item field="captcha" :label="translate('loginpage.from.verifi')">
              <div class="flex w-full">
                <a-input class="flex-1" v-model="form.captcha" :placeholder="translate('loginpage.from.place.verifi')" />
                <div class="w-30 flex items-center justify-center cursor-pointer cap-bg" @click="captcha">
                  <a-spin class="h-full" :loading="captchaImg.image === ''">
                    <img class="h-full" :src="captchaImg.image" alt="" />
                  </a-spin>
                </div>
              </div>
            </a-form-item>
            <a-form-item>
              <a-button html-type="submit" type="primary" long :loading="btnLading">
                <div class="flex items-center">
                  <div class="i-tabler-login w-6 h-6"></div>
                  <span class="m-3">{{ translate('loginpage.from.login') }}</span>
                </div>
              </a-button>
            </a-form-item>
          </a-form>
          <a-divider orientation="center"></a-divider>
          <div class="flex justify-center mt-10">
            <div class="i-tabler-brand-wechat icon w-10 h-10"></div>
          </div>
        </div>
      </div>

    </div>

    <LoginSetting />
  </div>
</template>
<script setup lang="ts">
import LoginSetting from "./setting.vue";
import { getCaptcha } from "@/api/user";
import { useUserStore } from "@/store";
import { RouteRecordRaw, useRouter } from "vue-router";
import { onMounted, reactive, ref } from "vue";
import { useRouterAsync } from "@/hooks/useRouter";
import { createDefaultRouter } from "@/routers/base";
import { useLocal } from "@/locale/useLocale";
import { useEventListener } from "@/hooks/useEventListener";
const { translate } = useLocal();
const router = useRouter();
const userStore = useUserStore();
const btnLading = ref(false);
const boxref = ref<HTMLDivElement | null>(null);

const captchaImg = reactive({
  id: "",
  image: "",
});

const form = reactive({
  account: "",
  password: "",
  remember: true,
  captcha: "",
});

const captcha = () => {
  captchaImg.image = "";
  getCaptcha<{ id: string; image: string }>({ width: 100, height: 30 })
    .then((res) => {
      captchaImg.id = res.id;
      captchaImg.image = res.image;
    })
    .catch((message) => {
      console.log(message);
    });
};

onMounted(() => {
  captcha();
});

const handleSubmit = async (data: any) => {
  if (data.errors) {
    console.log(data.errors);
    return;
  }

  btnLading.value = true;

  const islogin = await userStore.login({
    ...data.values,
    captcha: {
      text: data.values.captcha,
      id: captchaImg.id,
    },
  });

  const asyncRouters = await useRouterAsync();
  const baseRouter = createDefaultRouter(asyncRouters);

  btnLading.value = false;

  if (islogin) {
    router.push("/");
    router.addRoute(baseRouter as RouteRecordRaw);
  }
};



// function getDeg(x: number, y: number, center: [number, number]) {
//   const [cx, cy] = center;
//   const dx = x - cx;
//   const dy = y - cy;
//   const deg = Math.atan2(dy, dx) * 180 / Math.PI;
//   return deg;
// }

// function getAngle(x: number, y: number) {
//   return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360
// }

// useEventListener("mousemove", (e: any) => {
//   const { clientX, clientY } = e;
//   const { width, height, top, left } = boxref.value!.getBoundingClientRect()
//   // 获取表单的中心
//   const [x, y]: [number, number] = [(width / 2) + left, (height / 2) + top]

//   // 获取屏幕的中心
//   // const winWidth = document.body.clientWidth || document.documentElement.clientWidth,
//   //   winHeight = document.body.clientHeight || document.documentElement.clientHeight,
//   //   [x, y] = [winWidth / 2, winHeight / 2];

//   console.log(x, y);


// }, 'body')

</script>
<style lang="scss">
.fixed-button {
  border-radius: 50%;
}

@keyframes rotate {
  100% {
    transform: rotate(1turn);
  }
}

.login-box-bg {
  --border-width: 2px;
  --deg: 45deg;
  position: relative;
  overflow: hidden;

  &::after {
    display: block;
    content: "";
    position: absolute;
    left: -50%;
    top: -50%;
    width: 200%;
    height: 200%;
    background-image: conic-gradient(transparent, rgb(145, 229, 248), transparent 30%);
    animation: rotate 4s linear infinite;
  }

  padding: var(--border-width);
  box-sizing: border-box;
}

.login-container-box {
  background: var(--color-bg-2);
  border: 1px solid var(--color-border-4);
}


// 右上角旋转不规则椭圆背景
.login-page {
  position: relative;
  overflow: hidden;

  --t: -15%;
  --l: -15%;
  --bg-color: #08aeea;
  --time: 15s;

  &::after,
  &::before {
    display: block;
    content: "";
    width: 900px;
    height: 900px;
    position: absolute;
    z-index: 5;
    top: var(--t);
    left: var(--t);
    // filter: contrast(15);
    filter: blur(2px);
  }

  &::after {
    border-radius: 60% 40% 67% 33% / 36% 71% 29% 64%;
    box-shadow: 0px 0px 0 15px rgb(8 174 234 / 52%);
    background: var(--bg-color);
    animation: rotation var(--time) infinite linear;
  }

  &::before {
    border-radius: 60% 40% 67% 33% / 36% 71% 29% 64%;
    box-shadow: 0px 0px 0 15px rgba(41, 167, 212, 0.52);
    background: var(--bg-color);
    animation: counterclockwise var(--time) infinite linear;
  }
}

@keyframes rotation {
  to {
    transform: rotate(0deg);
  }

  from {
    transform: rotate(360deg);
  }
}

@keyframes counterclockwise {
  to {
    transform: rotate(0deg);
  }

  from {
    transform: rotate(-360deg);
  }
}

.cap-bg {
  background-color: var(--color-fill-2);
}
</style>
