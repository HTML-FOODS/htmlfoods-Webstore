<template>
    <div></div>
</template>

<script>
export default {
    data() {
        return {
            markers: [],
            center: {},
            latitude: "",
            longitude: "",
            currentPosition: null
        };
    },
    mounted() {
        setTimeout(() => this.getLocation(), 1000);
    },
    methods: {
        setLngAndLat(lat, lng) {
            this.$store.commit("location/setLocation", { lat, lng });
            console.log('setloc:::::::', { lat: lat, lng: lng });
        },

        getAddressFrom(lat, lng) {
            this.$axios
                .get(
                    "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
                    lat +
                    "," +
                    lng +
                    "&key=" +
                    process.env.GOOGLE_MAP_KEY
                )
                .then(response => {
                    if (response.data.error_message) {
                        console.log(response.data.error_message);
                    } else {
                        console.log('response', response.data.results[0]);
                        // this.address = response.data.results[0].formatted_address;
                    }
                });
            return;
        },

        getLocation() {
            //Ask for browser location access
            if (!navigator.geolocation) {
                return;
            } else {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        position => {
                            // this.getAddressFrom(
                            //     position.coords.latitude,
                            //     position.coords.longitude
                            // );
                            this.setLngAndLat(
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
                } else {
                    this.$notification.error({
                        message: "Error",
                        description: "Your browser does not support geolocation API"
                    });
                }
            }
        },
    },
}
</script>

<style scoped>
.container {
    max-width: 700px;
    margin: 10px auto;
}
</style>