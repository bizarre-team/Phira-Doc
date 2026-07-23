// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import { 
  NolebaseEnhancedReadabilitiesMenu, 
  NolebaseEnhancedReadabilitiesScreenMenu, 
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client'
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import { useData, useRoute } from 'vitepress';
import mediumZoom from 'medium-zoom';
import { onMounted, watch, nextTick } from 'vue';
import { NuAsciinemaPlayer } from "@nolebase/ui-asciinema";
import { Footer } from '@theojs/lumen'
import { Footer_Data } from './data/FooterData.ts'

import "asciinema-player/dist/bundle/asciinema-player.css";
import 'virtual:group-icons.css' //代码组样式
import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css'
import './custom.css'

import Tooltip from './vue/Tooltip.vue'

export default {
  extends: DefaultTheme,
  setup() {
    const route = useRoute();
    const initZoom = () => {
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
    // Get frontmatter and route
    const { frontmatter } = useData();
  },
  Layout: () => {
    // 保留原有组件的同时添加footer插槽
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(NolebaseEnhancedReadabilitiesMenu),
      'nav-screen-content-after': () => h(NolebaseEnhancedReadabilitiesScreenMenu),
      'layout-bottom': () => h(Footer, { Footer_Data })
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component('Tooltip', Tooltip) // Tooltip
    app.component("NuAsciinemaPlayer", NuAsciinemaPlayer);
  }
} satisfies Theme
