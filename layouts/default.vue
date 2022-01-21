<template>
  <a-layout id="components-layout-demo-top-side-2">
    <app-header />
    <a-layout>
      <app-sidebar />
      <a-layout>
        <app-breadcrumb />
        <a-layout-content
          :style="{
            background: '#fff',
            padding: '24px',
            margin: 0,
            minHeight: '280px',
          }"
        >
          Content
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import AppBreadcrumb from "../components/Layout/AppBreadcrumb.vue";
import AppHeader from "../components/Layout/AppHeader.vue";
import AppSidebar from "../components/Layout/AppSidebar.vue";
export default {
  components: { AppSidebar, AppHeader, AppBreadcrumb },
  data() {
    return {
      collapsed: false,
    };
  },
};
</script>
<style>
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
</style>
