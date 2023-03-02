<template>
  <div class="tabs-container tabs-container-border" ref="tabRef" :style="{
    '--tabs-pane-height': poros.height + 'px',
    '--tabs-py': tabsEmpty ? poros.paddingY + 'px' : '0px',
    '--tabs-px': tabsEmpty ? poros.paddingX + 'px' : '0px',
    height: poros.scroll ? height : `auto`,
  }">
    <div v-for="(item, index) of tabsStore.routerHistory" :key="item.name"
      :class="['tabs-pane', { 'tabs-pane-active': tabsStore.currentPointer === index }]" @click="clickTag(item)">
      <span class="tab-laber">
        {{ translate(item.title) }}
      </span>
      <div class="tab-icon" @click.stop="tabsStore.deleteTab(item.name!, item.path)">
        <div class="i-tabler-x icon"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useHistory, HistoryRecord } from "@/store";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useMouseScroll } from "./useMouseScroll";
import { useLocal } from "@/locale/useLocale";
const { translate } = useLocal();

defineOptions({
  name: 'Tabs',
})

const tabsStore = useHistory();
const router = useRouter();

const tabRef = ref();

useMouseScroll(tabRef);

const tabsEmpty = computed(() => {
  return !(tabsStore.routerHistory.length === 0);
});

const scrollbarHeight = parseInt(window.getComputedStyle(document.querySelector("body")!, null).getPropertyValue("--scrollbar-height"));

const poros = defineProps({
  height: {
    type: Number,
    default: 30,
  },
  paddingY: {
    type: Number,
    default: 8,
  },
  paddingX: {
    type: Number,
    default: 8,
  },
  scroll: {
    type: Boolean,
    default: false,
  },
});

const paddingTop = computed(() => {
  if (!tabsEmpty.value) {
    return 0;
  }
  return poros.paddingY;
});

const paddingBottom = computed(() => {
  if (!tabsEmpty.value) {
    return 0;
  }
  const height = Math.abs(poros.paddingY - scrollbarHeight);
  return height ? height : poros.paddingY;
});

const height = computed(() => {
  /**
   * 此处需要计算高度 因为当标签过多 需要出现横向滚动条 会影响高度 出现页面抖动 避免这种情况 需要把滚动条设置为
   * 不占有内容高度 但是会遮挡标签 所以让其等于外部容器的内边距高度 就不会遮挡内容
   * see https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-gutter
   * height: .tabs-pane(内容的高度) + 容器顶部的内边距 + 容器底部的内边距 + y轴滚动条高度
   */
  return tabsEmpty.value ? `${poros.height + paddingTop.value + paddingBottom.value + scrollbarHeight}px` : 0;
});

const clickTag = (item: HistoryRecord) => {
  router.push(item.path);
};
</script>

<style lang="scss">
.tabs-container {
  // --tabs-px: 10px;
  // --tabs-py: 8px
  width: 100%;
  overflow-x: auto;

  padding: var(--tabs-py) var(--tabs-px);
  box-sizing: border-box;

  &::-webkit-scrollbar {
    display: none;
  }

  display: flex;
  gap: 10px;

  &-border {
    border-bottom: 1px solid rgba(rgb(207, 206, 206), 0.2);
  }

  .tabs-pane {
    height: var(--tabs-pane-height);
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0 8px;
    background-color: var(--tabs-pane-background);
    color: var(--tabs-pane-color);
    transition: all 0.1s cubic-bezier(0, 0, 1, 1);
    flex-shrink: 0;

    user-select: none;
    border-radius: 4px;

    &-active {
      background-color: var(--tabs-pane-background-active);
      color: var(--tabs-pane-color-active);

      .tab-icon {
        color: var(--tabs-pane-color-active);
      }
    }

    .tab-laber {
      margin-right: 8px;
      font-size: 12px;
    }

    .tab-icon {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: inherit;

      .icon {
        color: inherit;
      }

      &:hover {
        .icon {
          color: #10b981;
        }
      }
    }
  }
}
</style>
