<template>
  <div>
    <a-row type="flex" justify="center" style="margin: 10px auto">
      <a-col :lg="{ span: 18 }" :xs="{ span: 24 }">
        <a-row type="flex" justify="space-between">
          <a-col v-for="day in days" :key="day.id">
            <a-tag
              class="button-coloured"
              :style="{ color: '#c22429', fontWeight: '500' }"
            >
              {{ day.name }}
            </a-tag>
          </a-col>
        </a-row>
      </a-col>
    </a-row>

    <a-row type="flex">
      <a-col :lg="{ span: 24 }" :xs="{ span: 24 }">
        <div class="title-head">Today’s menu</div>
      </a-col>
    </a-row>

    <a-row type="flex" justify="space-between" v-if="products.length >= 1">
      <a-col
        :lg="{ span: 8 }"
        :sm="{ span: 22 }"
        :xs="{ span: 24 }"
        v-for="product in products"
        :key="product.key"
      >
        <a-card
          :bordered="false"
          class="card-major"
          @click="setProductDetails(product)"
          ><a-row>
            <a-col :span="24">
              <div class="meal_card">
                <img
                  :src="LogoLicious"
                  alt="Meal Image"
                  width="100%"
                  style="border-radius: 12px 12px 0px 0px"
                />
                <div class="discount">-4%</div>
              </div>
            </a-col>

            <a-col :span="24" style="margin-left: 15px">
              <a-row class="meal_title" type="flex" justify="start">
                {{ product.name }}
              </a-row>
              <a-row type="flex" justify="start">
                <span class="ratings"
                  ><a-icon
                    type="star"
                    theme="filled"
                    :style="{ color: '#FFC107', margin: '2px' }"
                  />
                  {{ product.rating }}</span
                >
              </a-row>
              <a-row class="meal_price" type="flex" justify="start">
                <span class="price">&#8358;{{ product.price }}</span>
                <span class="preprice">
                  <s>{{ product.preprice }}</s>
                </span>
              </a-row>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
    <a-row v-else>
      <a-col :lg="{ span: 24 }" :sm="{ span: 24 }" :xs="{ span: 24 }">
        <a-card :bordered="false" class="card-major">
          <a-row type="flex" justify="center">
            No Available Product</a-row
          ></a-card
        >
      </a-col>
    </a-row>
    <a-modal
      v-model="modalVisible"
      centered
      width="500px"
      @ok="() => (modalVisible = false)"
      :footer="null"
      class="card-modal"
    >
      <a-row>
        <a-col :span="24">
          <div class="modal-title">{{ modalProduct.name }}</div>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <div class="meal_card">
            <img
              :src="LogoLicious"
              alt="Meal Image"
              width="100%"
              style="border-radius: 12px 12px 0px 0px"
            />
            <div class="discount">-4%</div>
          </div>
        </a-col>

        <a-col :span="24" style="">
          <a-row type="flex" justify="space-between" style="margin: 13px 0">
            <span class="ratings" style="font-size: 16px"
              ><a-icon
                type="star"
                theme="filled"
                :style="{ color: '#FFC107', marginRight: '2px' }"
              />
              {{ modalProduct.rating }}</span
            >
            <div style="display: flex; align-items: center">
              <plus @click="count++" />
              <span
                style="font-weight: bold; font-size: 18px; margin: auto 10px"
              >
                {{ count }}
              </span>
              <minus @click="count--" />
            </div>
          </a-row>
          <a-row class="meal_price" type="flex" justify="start">
            <span class="price">&#8358;{{ modalProduct.price }}</span>
          </a-row>
          <a-row class="meal_actions" type="flex" justify="space-between">
            <a-col :span="11">
              <a-button
                block
                style="color: #c42d32; border-color: #c42d32"
                @click="addToCart(modalProduct)"
              >
                ADD TO CART
              </a-button></a-col
            >
            <a-col :span="11">
              <nuxt-link to="/checkout">
                <a-button block type="primary"> CHECKOUT </a-button></nuxt-link
              ></a-col
            >
          </a-row>
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import LogoLicious from "~/assets/data/LogoLicious.png";
import plus from "~/assets/icon/plus.svg";
import minus from "~/assets/icon/minus.svg";
export default {
  components: {
    plus,
    minus,
  },
  data() {
    return {
      modalProduct: {},
      modalVisible: false,
      count: 1,
      LogoLicious,
      days: [
        {
          id: "1",
          name: "Monday",
        },
        {
          id: "2",
          name: "Tuesday",
        },
        {
          id: "3",
          name: "Wednesday",
        },
        {
          id: "4",
          name: "Thursday",
        },
        {
          id: "5",
          name: "Friday",
        },
        {
          id: "6",
          name: "Saturday",
        },
      ],
      products: [
        {
          name: "Swallow & Soups",
          rating: "4.5",
          price: 34500,
          preprice: 40000,
          discount: "-4%",
        },
        {
          name: "Swallow & Soups",
          rating: "4.5",
          price: 34500,
          preprice: 40000,
          discount: "-4%",
        },
        {
          name: "Swallow & Soups",
          rating: "4.5",
          price: 34500,
          preprice: 40000,
          discount: "-4%",
        },
        {
          name: "Swallow & Soups",
          rating: "4.5",
          price: 34500,
          preprice: 40000,
          discount: "-4%",
        },
        {
          name: "Swallow & Soups",
          rating: "4.5",
          price: 34500,
          preprice: 40000,
          discount: "-4%",
        },
        {
          name: "Swallow & Soups",
          rating: "4.5",
          price: 34500,
          preprice: 40000,
          discount: "-4%",
        },
      ],
    };
  },
  methods: {
    setProductDetails(product) {
      this.modalProduct = product;
      this.modalVisible = true;
    },
    ...mapActions("cart", ["addProductToCart"]),
    ...mapActions("cart", ["removeProductFromCart"]),
    removeFromCart(product) {
      this.removeProductFromCart(product);
      this.$notification.success({
        message: "Success",
        description: "Product successfully removed from cart",
      });
    },
    addToCart(product) {
      this.addProductToCart({
        product: product,
        quantity: this.count,
        product_name: product.name,
        initial_cost: product.price,
        preprice: product.preprice,
      });
      this.$notification.success({
        message: "Success",
        description: "Product successfully added to cart",
      });
    },
  },
};
</script>

<style>
.title-head {
  color: #c22429;
  font-weight: 600;
  font-size: 30px;
  display: flex;
  float: left;
  margin-top: 1.2rem;
  /* margin-bottom: -1rem; */
}
@media screen and (max-width: 992px) {
  .title-head {
    font-size: 1.75rem;
  }
}

@media screen and (max-width: 576px) {
  .title-head {
    font-size: 1.6rem;
  }
}

.meal_title {
  font-weight: 500;
  font-size: 21px;
  margin-top: 5px;
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

.ratings {
  font-weight: 600;
  font-size: 12px;
  margin: 7px 0;
}

.card-modal {
  /* border-radius: 12px 12px 0px 0px; */
  /* margin-bottom: 25px;
  margin-top: 25px;
  margin-right: 7px;
  margin-left: 7px;
  max-width: 300px; */
  position: relative;
}

.ant-btn-primary:hover {
  background-color: #d1080e !important;
  color: white !important;
  border-color: #c22429;
}

.card-major {
  bottom: 5.35%;
  background: #ffffff;
  /* box-shadow: 0px 4px 21px rgba(0, 0, 0, 0.12); */
  border-radius: 12px 12px 0px 0px;
  margin-bottom: 25px;
  margin-top: 25px;
  margin-right: 7px;
  margin-left: 7px;
  max-width: 300px;
  position: relative;
}

.card-major:hover {
  transition: all 1s ease-out;
  box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.2);
  top: -4px;
  border: 1px solid #cccccc;
  background-color: white;
  cursor: pointer;
}

.card-major:before {
  transform: scale(2);
  transform-origin: 50% 50%;
  transition: transform 1s ease-out;
}

.card-major:hover:before {
  transform: scale(2.15);
}

.card-major .discount,
.card-modal .discount {
  position: absolute;
  left: 2.86%;
  top: 3.68%;
  background: #ffffff;
  border-radius: 5px;
  font-weight: 600;
  font-size: 13px;
  color: #c42d32;
  padding: 3px 10px;
}

.card-major .ant-card-body {
  padding: 0;
  padding-bottom: 15px;
}

.modal-title {
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  margin-bottom: 15px;
}

.meal_actions {
  margin-top: 20px;
}
</style>