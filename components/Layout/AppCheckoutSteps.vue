<template>
  <div>
    <a-layout-sider
      :style="{
        overflow: 'auto',
        maxWidth: '230px',
        width: '230px',
        height: '100vh',
        position: 'fixed',
        left: 0,
        paddingTop: '1rem',
      }"
    >
      <a-card class="steps">
        <a-timeline class="timeline">
          <a-timeline-item><one slot="dot" />Cart</a-timeline-item>
          <a-timeline-item><two slot="dot" />Delivery Details</a-timeline-item>
          <a-timeline-item>
            <three slot="dot" />
            Payment
          </a-timeline-item>
          <a-timeline-item><four slot="dot" />Order Complete</a-timeline-item>
        </a-timeline>
      </a-card>
    </a-layout-sider>
  </div>
</template>

<script>
import one from "~/assets/icon/one.svg";
import two from "~/assets/icon/two.svg";
import three from "~/assets/icon/three.svg";
import four from "~/assets/icon/four.svg";
export default {
  components: {
    one,
    two,
    three,
    four,
  },
};
</script>

<style>
.timeline {
  margin: 5px 2px;
  /* padding-left: 35px; */
}
.ant-timeline-item {
  padding: 0 0 50px !important;
}
.ant-timeline-item-content {
  margin: 0 0 0 40px !important;
  font-weight: bold;
  font-size: 14px;
}
.steps {
  background: #ffffff;
  padding: 5px 3px;
  width: 95%;
  margin: 20px auto;
}
</style>