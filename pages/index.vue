<template>
  <div>
    <a-row type="flex" justify="center" style="margin: 10px auto">
      <a-col :lg="{ span: 18 }" :xs="{ span: 24 }">
        <a-row type="flex" justify="space-between">
          <a-col v-for="day in days" :key="day.id">
            <a-button
              class="button-coloured"
              :style="{ color: '#c22429', fontWeight: '500' }"
            >
              {{ day.name }}
            </a-button>
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
        <a-card :bordered="false" class="card-major"
          ><a-row>
            <a-col :span="24">
              <div class="meal_card">
                <img
                  :src="LogoLicious"
                  alt="Meal Image"
                  width="100%"
                  style="border-radius: 12px 12px 0px 0px"
                />
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
          <a-row type="flex" justify="center"> No Pending Order</a-row></a-card
        >
      </a-col>
    </a-row>
  </div>
</template>

<script>
import LogoLicious from "~/assets/data/LogoLicious.png";
export default {
  data() {
    return {
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
          price: "34,500",
          preprice: "40,000",
          discount: "-4%",
        },
        {
          name: "Swallow & Soups",
          rating: "4.5",
          price: "34,500",
          preprice: "40,000",
          discount: "-4%",
        },
        {
          name: "Swallow & Soups",
          rating: "4.5",
          price: "34,500",
          preprice: "40,000",
          discount: "-4%",
        },
        {
          name: "Swallow & Soups",
          rating: "4.5",
          price: "34,500",
          preprice: "40,000",
          discount: "-4%",
        },
        {
          name: "Swallow & Soups",
          rating: "4.5",
          price: "34,500",
          preprice: "40,000",
          discount: "-4%",
        },
        {
          name: "Swallow & Soups",
          rating: "4.5",
          price: "34,500",
          preprice: "40,000",
          discount: "-4%",
        },
      ],
    };
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
}

.price {
  background: rgba(196, 45, 50, 0.2);
  border-radius: 5px;
  color: #c42d32;
  padding: 5px 10px;
  margin-right: 15px;
}

.preprice {
  color: #c42d32;
}

.ratings {
  font-weight: 600;
  font-size: 12px;
  margin: 5px 0;
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
}

.card-major .ant-card-body {
  padding: 0;
  padding-bottom: 15px;
}
</style>