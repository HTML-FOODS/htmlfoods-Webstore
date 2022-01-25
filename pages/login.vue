<template>
  <div
    id="components-layout-demo-basic"
    :style="{
      minHeight: '100vh',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      backgroundSize: '100% 100%',
    }"
  >
    <a-layout>
      <a-layout-header>
        <a-row type="flex" justify="space-between">
          <a-col :span="6">
            <img :src="html_logo" />
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout-content class="container">
        <a-row type="flex" justify="space-between">
          <a-col :span="24" class="login-side">
            <a-row>
              <h3 class="login-text">Log into HTML FOODS Admin</h3>
            </a-row>
            <a-form style="margin-top: 40px">
              <a-row dense class="ma-0 pa-3">
                <a-input
                  size="large"
                  v-model="email"
                  placeholder="Enter your email"
                  type="email"
                  class="login__Input"
                  :rules="[(v) => !!v || 'Please enter your email']"
                >
                </a-input>
              </a-row>
              <a-row>
                <a-input-password
                  size="large"
                  v-model="password"
                  placeholder="Your Password"
                  class="login__Input"
                  :rules="[(v) => !!v || 'Please enter your password']"
                >
                </a-input-password>
              </a-row>
              <a-row type="flex" justify="start">
                <a-button
                  :disabled="email === '' || password === ''"
                  :loading="loading"
                  large
                  block
                  class="login-btn"
                  @click="processLogin()"
                >
                  <span
                    :style="{
                      color: '#FFFFFF',
                      fontWeight: 'bold',
                      fontSize: '17px',
                    }"
                  >
                    LOG IN</span
                  >
                </a-button>
              </a-row>
              <a-row type="flex" justify="start" class="admin">
                <span style="margin: 0 auto">
                  <a-button class="forgot-password" ghost>
                    Forgot Password?
                  </a-button></span
                >
              </a-row>
            </a-form>
          </a-col></a-row
        >
      </a-layout-content>
      <a-layout-footer></a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import html_logo from "~/assets/data/html_logo.png";
export default {
  layout: "auth",
  auth: false,
  data() {
    return {
      authForm: false,
      html_logo,
      email: "",
      password: "",
      loading: false,
    };
  },
  methods: {
    async processLogin() {
      const thisLogin = {
        email: this.email,
        password: this.password,
      };
      this.loading = true;
      await this.$auth
        .loginWith("local", { data: thisLogin })
        .then((res) => {
          const { data } = res;
          this.loading = false;
          if (data.status == "OK") {
            this.$store.commit("admin/setAdmin", data.payload);
            this.$notification.success({
              message: "Success",
              description: data.message,
            });
            // this.$router.history;
            // ? this.$router.replace(
            //     this.$router.history.current.query.redirect
            //   )
            // :
            this.$router.push(`/`);

            // this.$router.replace(this.$router.history.current.query.redirect);
          } else if (data.status == "ERROR") {
            this.authFailed = true;
            // this.$store.commit("admin/setAdmin", null, false);
            this.$notification.error({
              message: "Error",
              description: data.message,
            });
            return;
          }
        })
        .catch((err) => {
          this.loading = false;
          const { response, message } = err;
          if (response.data.message == "Authorization Denied/Invalid Token") {
            this.$notification.error({
              message: "Error",
              description: "You need to log in first",
            });
            this.$router.push(`/login`);
          } else
            this.$notification.error({
              message: "Error",
              description: response.data.message || "Network Error",
            });

          // this.$store.commit("admin/setAdmin", null, false);
        });
    },
  },
};
</script>

<style scoped>
/* .login-background {
  background-image: url("/assets/img/htmlUnderground.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;
} */
.ant-layout {
  background: transparent;
}
.ant-layout-header {
  background: transparent;
  padding: 50px 10px 0 40px;
  margin-bottom: 20px;
  height: 11vh;
}
.container {
  width: 75%;
  margin: 20px auto 0 !important;
  height: 70vh;
}
/* .ant-layout-content { */
/* margin: calc(100) auto auto 180px; */
/* height: vh; */
/* } */
.ant-layout-footer {
  height: 15vh;
  background: transparent;
}
.login-text {
  font-weight: 600;
  font-size: 30px;
  color: #000000;
}
.forgot-password {
  width: 153px;
  height: 26px;
  font-weight: 300;
  font-size: 17px;
  color: #948c8c;
  /* margin: 116px; */
}
.register-btn {
  border: 3px solid rgba(255, 0, 0, 0.67);
  box-sizing: border-box;
  box-shadow: 0px 4px 24px -28px rgba(0, 0, 0, 0.25);
  border-radius: 39px;
  width: 96px;
  height: 30px;
}
.login-btn {
  background: #c42d32;
  border: 1px solid #dcd8d8;
  box-sizing: border-box;
  box-shadow: 0px 4px 32px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  max-width: 385px;
  height: 40px;
  margin: 33px 0;
}
.ant-input {
  background: #ffffff;
  border: 1px solid #dcd8d8;
  box-sizing: border-box;
  border-radius: 5px;
  max-width: 385px;
  margin-bottom: 30px;
  /* height: 60px !important; */
}
/* input.ant-input {
  height: 60px !important;
} */
span.ant-input-affix-wrapper.ant-input-password {
  background: #ffffff;
  border: 1px solid #dcd8d8;
  box-sizing: border-box;
  border-radius: 5px;
  max-width: 385px;
  /* height: 60px !important; */
}
/* input[type="password"] {
  height: 60px !important;
}
input[type="email"] {
  height: 60px !important;
} */
input:-internal-autofill-selected {
  background: #ffffff !important;
}
/* .ant-input {
  height: 60px;
} */
.ant-select-selection {
  /* height: 60px; */
  max-width: 385px;
  /* padding-bottom: 30px; */
}
/* .ant-select-dropdown.ant-select-dropdown--single.ant-select-dropdown-placement-bottomLeft {
  width: 100% !important;
} */
.ant-btn[disabled] {
  opacity: 0.3;
}
/* .ant-select-selection__rendered {
  line-height: 60px;
} */
.admin {
  max-width: 385px;
}
@media screen and (max-width: 767px) {
  div#components-layout-demo-basic {
    background-image: none !important;
  }
}
</style>
