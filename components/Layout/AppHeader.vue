<template>
  <a-layout-header class="header" :style="{ background: 'white', padding: 0 }">
    <div class="logo">
      <a-row type="flex" justify="space-around" align="middle">
        <a-col :span="3">
          <img :src="html_logo" />
        </a-col>

        <a-col :span="3">
          <a-button
            icon="environment"
            class="button-coloured"
            :style="{ color: '#c22429', fontWeight: '500' }"
          >
            Your location
          </a-button>
        </a-col>
        <a-space />
        <a-col :span="10">
          <a-input
            v-model="search"
            placeholder="Search for your favourite meals"
          >
            <a-icon slot="prefix" type="search" />
          </a-input>
        </a-col>
        <a-space />
        <a-col :span="2">
          <a-button
            icon="user"
            class="button-coloured"
            :style="{ color: '#c22429', fontWeight: '500' }"
          >
            Cart
          </a-button>
        </a-col>

        <a-col :span="2">
          <a-button
            icon="user"
            class="button-coloured"
            :style="{ color: '#c22429', fontWeight: '500' }"
          >
            Log in
          </a-button>
        </a-col>
      </a-row>
    </div>
    <!-- <a-menu
      mode="horizontal"
      :default-selected-keys="['2']"
      :style="{ lineHeight: '64px' }"
    >
      <a-row type="flex" justify="space-between">
        <a-col :span="6">
          <img :src="html_logo" />
        </a-col>
      </a-row>
    </a-menu> -->
  </a-layout-header>
</template>

<script>
import html_logo from "~/assets/data/html_logo.png";
export default {
  data() {
    return {
      html_logo,
      search: null,
    };
  },
};
</script>

<style scoped>
.button-coloured {
  background: rgba(196, 45, 50, 0.1);
  border-radius: 5px;
  height: 38px;
  padding: 0 20px;
  margin: 0 auto;
}

/* .ant-input::placeholder {
  color: blue !important;
} */
</style>