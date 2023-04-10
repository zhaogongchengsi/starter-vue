<template>
  <div class="w-full h-screen relative dark:bg-#232324 flex items-center justify-center">
    <div class="login-box-bg rounded-md flex" ref="boxref">

      <div class="z-10 h-150 flex items-center text-black border-box p-10 dark:text-white rounded-md login-container-box">
        <div class="w-150">
          <a-form size="large" :model="form" layout="vertical" :label-col-props="{ span: 3 }"
            :wrapper-col-props="{ span: 21 }" @submit="handleSubmit">
            <a-form-item field="phone" :label="translate('loginpage.from.account')">
              <a-input v-model="form.phone" :placeholder="translate('loginpage.from.place.account')" />
            </a-form-item>
            <a-form-item field="password" :label="translate('loginpage.from.password')">
              <a-input v-model="form.password" :placeholder="translate('loginpage.from.place.password')" />
            </a-form-item>
            <a-form-item field="captcha" :label="translate('loginpage.from.verifi')">
              <div class="flex w-full">
                <a-input class="flex-1" v-model="form.captcha" :placeholder="translate('loginpage.from.place.verifi')" />
                <div class="w-30 flex items-center justify-center cursor-pointer cap-bg" @click="captcha">
                  <a-spin class="h-full bg-white" :loading="captchaImg.image === ''">
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
import { State } from "@/enums/code";
import { Message } from "@arco-design/web-vue";
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
  phone: "12312312312",
  password: "123456",
  remember: true,
  captcha: "",
});

const captcha = async () => {
  captchaImg.image = "";
  const { code, data } = await getCaptcha<{ id: string; url: string }>()
  if (code != State.Ok) {
    Message.error("获取验证码失败,请重试")
    captchaImg.image = '/404.png'
    return
  }
  captchaImg.id = data.id
  captchaImg.image = data.url
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
      value: data.values.captcha,
      id: captchaImg.id,
    },
  });

  btnLading.value = false;

  if (!islogin) return

  const { isSuccess, message, data: r } = await useRouterAsync();

  if (!isSuccess) {
    Message.error(message || "路由获取失败")
    return
  }

  const baseRouter = createDefaultRouter(r);

  router.addRoute(baseRouter as RouteRecordRaw);
  
  router.push("/");

};


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
