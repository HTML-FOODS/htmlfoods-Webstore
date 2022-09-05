<template>
  <div>
    <a-row type="flex" style="margin: 10px auto; position: sticky; top: 0; z-index: 10000;"
      :class="changeColor ? 'scroll-bg' : ''">
      <a-col :lg="{ span: 45 }" :xs="{ span: 30 }">
        <a-row type="flex" justify="start">
          <a-col v-for="item in categories" :key="item.id" @click="getCard(item.id)" :style="{ margin: '8px' }">
            <a :href="'#' + item.id" v-smooth-scroll="{ duration: 2000 }">
              <a-tag class="menu-coloured" :style="{ color: '#c22429', fontWeight: '500', margin: 'auto' }">
                {{ item.name }}
              </a-tag>
            </a>
          </a-col>
        </a-row>
      </a-col>
    </a-row>

    <a-row type="flex" v-for="item in categories" :key="item.id">
      <div :id="item.id">
        <EveryDayMeal :categoryName="item.categoryName" />
      </div>
    </a-row>
  </div>
</template>

<script>

import axios from 'axios';
import EveryDayMeal from "../components/cards/DailyCard.vue"
// import FriedMeal from "../components/cards/FriedCard.vue"

export default {
  auth: false,
  components: {
    EveryDayMeal,
    // FriedMeal
  },
  data() {
    return {
      showComponent: 1,
      scrollPosition: null,
      changeColor: false,
      categories: [
        {
          id: "affordable-value-meals",
          name: `Everyday Afforable Meal`,
          categoryName: "EVERY DAY AFFORDABLE VALUE MEALS"
        },
        {
          id: "fried-chicken",
          name: "Soulfully spiced Fried Chicken",
          categoryName: "FLAME GRILLED CHICKEN"
        },
        {
          id: "rotisserie-chicken",
          name: "Delicious Rotiserrie chicken",
          categoryName: "BURGERS, WRAPS & CHICKWHIZZ"
        },
        {
          id: "flame-grilled",
          name: "Flame Grilled Chicken",
          categoryName: "DELICIOUS ROTISSERIE CHICKEN"
        },
        {
          id: "burgers",
          name: "Burger, wraps, & chickwhizz",
          categoryName: ""
        },
        {
          id: "tasty-sides",
          name: "Tasty Sides",
          categoryName: "TASTY SIDES"
        },
        {
          id: "sweets",
          name: "Sweet treats and beverages",
          categoryName: "SWEET TREATS & BEVERAGES"
        }
      ],
    };
  },
  computed: {
    location() {
      return this.$store.state.location.location
    }
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll);
    this.getMeals()
  },
  methods: {
    getCard(id) {
      this.showComponent = id;
      console.log({ showComponent: this.showComponent, id });
    },

    updateScroll() {
      this.scrollPosition = window.scrollY
      if (this.scrollPosition > 85) {
        this.changeColor = true;
      }
      else {
        this.changeColor = false;
      }
    },

    getMeals() {
      console.log("hi:::::::", this.location);
      axios
      .post(`https://html-vendor.herokuapp.com/api/v1/vendor/getclosestores/${process.env.CHICKEN_REP}`, {
          lng: this.location.lng,
          lat: this.location.lat
        })
        .then(res => {
          console.log('res', res);
          const { data } = res.data.payload[0];
          if (res.data.statusCode == 200) {
            console.log("data", data);
            this.allMeals = data;
            this.$store.commit("meal/setMeal", this.allMeals);
          } else if (data.status == "ERROR") {
            this.authFailed = true;
            this.$notification.error({
              message: "Error",
              description: data.message
            });
            return;
          }
        })
        .catch(err => {
          this.loading = false;
          const { response, message } = err;
          if (response.data.message == "Authorization Denied/Invalid Token") {
            this.$notification.error({
              message: "Error",
              description: "You need to log in first"
            });
            this.$router.push(`/login`);
          } else {
            this.$notification.error({
              message: "Error",
              description: response.data.message || "Network Error"
            });
          }
        });
    },
  },
};
</script>

<style>
/* class="title-head" */
.title-head {
  color: #c22429;
  font-weight: 600;
  font-size: 27px;
  display: flex;
  float: left;
  margin-top: 1.5rem;
}

.scroll-bg {
  background: white;
}

@media screen and (max-width: 992px) {
  .title-head {
    font-size: 1.50rem;
  }
}

@media screen and (max-width: 576px) {
  .title-head {
    font-size: 1.35rem;
  }
}
</style>