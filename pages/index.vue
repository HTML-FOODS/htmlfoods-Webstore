<template>
  <div>
    <a-row type="flex" style="margin: 10px auto">
      <a-col :lg="{ span: 45 }" :xs="{ span: 30 }" >
        <a-row type="flex" justify="start">
          <a-col v-for="item in categories" :key="item.id"  @click="getCard(item.id)">
            <a-tag
              class="button-coloured"
              :style="{ color: '#c22429', fontWeight: '500', margin:'7px'}"
            >
              {{ item.name }}
            </a-tag>
          </a-col>
        </a-row>
      </a-col>
    </a-row>

    <a-row type="flex" style="margin-bottom: 1rem">
      <a-col :lg="{ span: 24 }" :xs="{ span: 24 }">
        <div class="title-head">Today’s menu </div>
      </a-col>
    </a-row>
   
  <div v-if=" showComponent === '1' ">
      <EveryDayMeal/>
  </div>
  <div v-else-if="showComponent === '2'">
    <FriedMeal />
  </div>
  <div v-else>
    Not A/B/C
  </div>
  </div>
</template>

<script>

import EveryDayMeal from "../components/cards/DailyCard.vue"
import FriedMeal from "../components/cards/FriedCard.vue"

export default {
  components: {
    EveryDayMeal,
    FriedMeal
},
  data() {
    return {
      showComponent: 1,
      categories: [
        {
          id: "1",
          name: "Everyday Afforable Meal",  
          //ImgFolder: 
        },
        {
          id: "2",
          name: "Soulfully spiced Fried Chicken",
        },
        {
          id: "3",
          name: "Delicious Rotiserrie chicken",
        },
        {
          id: "4",
          name: "Flame Grilled Chicken",
        },
        {
          id: "5",
          name: "Burger , wraps, & chickwhizz",
        },
        {
          id: "6",
          name: "Tasty Sides",
        },
        {
          id: "7",
          name: "Sweet treats and beverages",
        }
      ],
    };
  },
  methods:{
    getCard(id){
       this.showComponent = id;
       console.log({showComponent:this.showComponent, id});
    }
  }
};
</script>

<style>
.title-head {
  color: #c22429;
  font-weight: 600;
  font-size: 27px;
  display: flex;
  float: left;
  margin-top: 1.5rem;
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