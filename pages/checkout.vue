<template>
  <div>
    <a-row type="flex" justify="center" class="title"> Check Out </a-row>
    <a-row v-for="item in cartItems" :key="item" style="margin: auto 35px">
      <a-card>
        <a-row class="single-checkout">
          <a-col :span="3">
            <a-radio />
          </a-col>
          <a-col :span="15">
            <a-row class="meal_title" type="flex" justify="start">{{
              item.product.name
            }}</a-row>
            <a-row class="meal_price" type="flex" justify="start">
              <span class="price">&#8358;{{ item.product.price }}</span>
              <span class="preprice">
                <s>{{ item.product.preprice }}</s>
              </span>
            </a-row>
          </a-col>

          <a-col :span="6">
            <div style="display: flex; align-items: center">
              <plus @click="item.quantity++" />
              <span
                style="font-weight: bold; font-size: 18px; margin: auto 10px"
              >
                {{ item.quantity }}
              </span>
              <minus @click="item.quantity--" />
            </div>
          </a-col>
        </a-row>
      </a-card>
      <a-row type="flex" justify="end" style="margin-top: 25px">
        <a-col>
          <a-row type="flex" justify="start" class="total_label">Total</a-row>
          <a-row type="flex" justify="start" class="total"
            >&#8358;{{ cartTotalPrice }}</a-row
          ></a-col
        >
      </a-row>
    </a-row>
    <a-row type="flex" justify="center" style="margin-top: 45px">
      <nuxt-link to="/delivery">
        <a-button block type="primary" style="width: 200px; height: 45px">
          CONTINUE
        </a-button></nuxt-link
      >
    </a-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import plus from "~/assets/icon/plus.svg";
import minus from "~/assets/icon/minus.svg";
export default {
  layout: "checkout",
  components: {
    plus,
    minus,
  },
  computed: {
    cartItems() {
      return this.$store.state.cart.cart;
    },
    ...mapGetters("cart", ["cartTotalPrice"]),
  },
};
</script>

<style scoped>
.title {
  font-weight: 600;
  font-size: 2rem;
  color: #c42d32;
  margin-bottom: 20px;
}

.price {
  background: rgba(196, 45, 50, 0.2);
  border-radius: 5px;
  color: #c42d32;
  font-weight: bold;
  padding: 5px 10px;
  margin-right: 15px;
}

.preprice {
  color: #c42d32;
}

.meal_price {
  margin: 15px auto;
}

.meal_title {
  font-weight: 500;
  font-size: 21px;
  margin: 15px auto;
}

.single-checkout {
  display: flex;
  align-items: center;
}

.total_label {
  font-weight: 600;
  font-size: 12px;
}

.total {
  font-weight: 600;
  font-size: 30px;
  color: #c42d32;
}
</style>