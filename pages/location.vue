<template>
  <div>
    <div :style="{ padding: '24px', background: '#fff' }">
      <a-row style="margin-bottom:10px">
        <a-col :lg="{ span: 12 }" :xs="{ span: 12 }">
          <h1 class="title-head"> Search location</h1>
          </a-col>
        </a-row >
      <div>
        <a-row>
          <a-col :lg="{ span: 24 }" :xs="{ span: 24 }">
            <span class="small-text">
              Get the near chicken rep store closest to your location
            </span>
          </a-col>
        </a-row>
      </div>
      <div style="max-width: 1005px; margin: 30px auto">
        <a-row type="flex" justify="space-between">
          <a-col :lg="{ span: 20 }" :sm="{ span: 18 }" :xs="{ span: 24 }">
            <a-input
              size="large"
              placeholder="Input Address"
              id="autocomplete"
              type="text"
              v-model="address"
              style="margin:2px"
            />
          </a-col>
          <a-col
            :lg="{ span: 4, offset: 0 }"
            :sm="{ span: 6, offset: 0 }"
            :xs="{ span: 8, offset: 16 }"
          >
            <a-button
              style="color: white; background: #c22429; width: 100%; height: 42px; margin:0px 2px 2px 2px"
              @click="getLatAndLng"
              :disabled="!address"
              >Show on map
            </a-button>
          </a-col>
        </a-row>
        <a-row>
          <a-col
            :span="24"
            :style="{
              padding: '24px 0',
              background: '#fff'
            }"
          >
            <div>
              <GmapMap
                :center="center"
                :zoom="8"
                id="map"
                map-type-id="ROADMAP"
                style="height: 50vh"
              >
                <GmapMarker
                  :key="index"
                  v-for="(m, index) in markers"
                  :position="m.position"
                  :clickable="true"
                  :draggable="true"
                  @click="center = m.position"
                />
              </GmapMap>
            </div>
          </a-col>
        </a-row>
        <a-row type="flex" justify="end" style="margin-bottom:20px"> </a-row>
        <a-row>
          <a-form layout="vertical" hide-required-mark>
            <a-col :lg="{ span: 10 }" :xs="{ span: 11 }">
              <a-row type="flex">
                <a-form-item>
                  <a-input
                    size="large"
                    id="cityLat"
                    v-model="latitude"
                    :disabled="latitude"
                    placeholder="Latitude"
                    :rules="[v => !!v || 'Please enter latitude']"
                  />
                </a-form-item>
              </a-row>
            </a-col>
            <a-col :lg="{ span: 10 }" :xs="{ span: 11 }">
              <a-row type="flex" justify="start">
                <a-form-item>
                  <a-input
                    size="large"
                    id="cityLng"
                    v-model="longitude"
                    :disabled="longitude"
                    placeholder="Longitude"
                    :rules="[v => !!v || 'Please enter longitude']"
                  />
                </a-form-item>
              </a-row>
            </a-col>
            <a-col :lg="{ span: 16 }" :xs="{ span: 22 }">
              <!-- <a-col :span="15"> -->
              <a-form-item>
                <a-input
                  size="large"
                  id="address-details"
                  placeholder="Address"
                  type="text"
                  v-model="addressFinal"
                  :disabled="addressFinal"
                />
              </a-form-item>
            </a-col>
          </a-form>
        </a-row>
        <a-button
          style="color: white; background: #c22429; width: 175px; height: 50px"
          :loading="loading"
        >
          <!-- :disabled="!addressFinal" -->
          Update Details
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
const home = { lat: 7.24883, lng: 5.2303 };

import axios from "axios";

export default {
  name:'location',

  data() {
    return {
      drawerIsVisible: false,
      drawerIsOpen: false,
      loading: false,
      markers: [],
      center: home,
      paths: [],
      latitude: "",
      longitude: "",
      latitudeVal: "",
      longitudeVal: "",
      addressFinalVal: "",
      address: "",
      addressFinal: "",
      currentPosition: null
    };
  },
  computed: {
    token() {
      return this.$store.state.admin.token;
    }
  },
  methods: {
    showDrawer() {
      this.drawerIsVisible = true;
    },
    onClose() {
      this.drawerIsVisible = false;
    },

    openDrawer() {
      this.drawerIsOpen = true;
    },
    closeDrawer() {
      this.drawerIsOpen = false;
    },

    drawMarkers() {
      this.markers = [{ position: home }, { position: destination }];
    },
    drawDirections() {
      this.paths = [home, destination];
    },
    clearMap() {},

    async updateDetails() {
      console.log("cityLat", document.getElementById("cityLat").value);
      console.log("cityLng", document.getElementById("cityLng").value);
      this.loading = true;
      this.$axios
        .put(
          `/api/v1/checkout/update/fooditem/location`,
          {
            checkoutId: this.$route.params.id,
            latitude: document.getElementById("cityLat").value,
            longitude: document.getElementById("cityLng").value
          },
          {
            headers: {
              "x-admin-token": this.token
            }
          }
        )
        .then(res => {
          const { data } = res;
          this.loading = false;
          if (data.status == "OK") {
            this.$notification.success({
              message: "Success",
              description: data.message
            });
          } else if (data.statusCode == 400) {
            this.$notification.error({
              message: "Error",
              description: data.message
            });
          }
          this.loading = false;
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
          } else
            this.$notification.error({
              message: "Error",
              description: response.data.message || "Network Error"
            });
          this.loading = false;
        });
    },

    getLocation() {
      if (!navigator.geolocation) {
        return;
      } else {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => {
              this.getAddressFrom(
                position.coords.latitude,
                position.coords.longitude
              );
              // (this.latitude = position.coords.latitude),
              //   (this.longitude = position.coords.longitude);
              this.showUserLocationOnTheMap(
                position.coords.latitude,
                position.coords.longitude
              );
            },
            error => {
              this.$notification.error({
                message: "Error",
                description: error.message
              });
            }
          );
          const originInput = document.getElementById("autocomplete");
          const originAutocomplete = new google.maps.places.Autocomplete(
            originInput
          );
          originAutocomplete.setFields(["place_id"]);
        } else {
          this.$notification.error({
            message: "Error",
            description: "Your browser does not support geolocation API"
          });
        }
      }
    },

    getAddressFrom(lat, lng) {
      axios
        .get(
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
            lat +
            "," +
            lng +
            "&key=AIzaSyAiVp2qbQhCVb1WhCv11Kcs9yD1C36q_Hs"
        )
        .then(response => {
          if (response.data.error_message) {
            console.log(response.data.error_message);
          } else {
            // this.address = response.data.results[0].formatted_address;
          }
        });
      return;
    },

    showUserLocationOnTheMap(lat, lng) {
      var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: new google.maps.LatLng(lat, lng),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      console.log("Hi");
      //Add Marker
      new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: map
      });
    },

    getLatAndLng() {
      let geocoder = new google.maps.Geocoder();
      const address = document.getElementById("autocomplete").value;
      geocoder.geocode({ address: address }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          //In this case it creates a marker, but you can get the lat and lng from the location.LatLng

          let newMap = new google.maps.Map(document.getElementById("map"), {
            zoom: 15,
            center: results[0].geometry.location,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          });

          newMap.setCenter(results[0].geometry.location);

          new google.maps.Marker({
            map: newMap,
            position: results[0].geometry.location
          });
          if (!results[0].geometry.location) {
            return;
          } else {
            // this.currentPosition = results[0].geometry.location;
            console.log(":::1:::", results[0].geometry.location.lng());
            console.log(":::2:::", results[0].geometry.location.lat());
            console.log(
              ":::3:::",
              document.getElementById("autocomplete").value
            );
            document.getElementById(
              "cityLng"
            ).value = results[0].geometry.location.lng();
            document.getElementById(
              "cityLat"
            ).value = results[0].geometry.location.lat();
            document.getElementById(
              "address-details"
            ).value = document.getElementById("autocomplete").value;
          }
        } else {
          alert(
            "Geocode was not successful for the following reason: " + status
          );
        }
      });
    },
    mapInfo() {
      this.longitude = this.longitudeVal;
      this.latitude = this.latitudeVal;
      this.addressFinal = document.getElementById("autocomplete").value;
    }
  },
  mounted() {
    setTimeout(() => this.getLocation(), 1000);
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

.small-text{
  font-size:15px;
}

.add-admin {
  background: #c22429;
  border-radius: 20px;
  height: 32px;
  color: white;
}
.transit-image-wrapper {
  /* max-width: 100%; */
  max-width: 1005px;
  height: auto;
  position: relative;
  display: block;
  margin: 0 auto;
}
.google-map {
  width: 100% !important;
  height: 100% !important;
  display: block;
}
#map {
  position: relative;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  /* border-width: 2px; */
  background: transparent;
}
.pac-icon {
  display: none;
}
.pac-item {
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
}
.pac-item:hover {
  background-color: #ececec;
}
.ant-btn[disabled] {
  opacity: 0.3;
}
</style>