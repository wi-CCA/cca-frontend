<script>
import { connectContract } from "./assets/js/interface_request.js";
import Menu from "./components/Menu.vue";
import { RouterLink, RouterView } from "vue-router";

export default {
  data() {
    return {
      connected: false,
      loading: false,
    };
  },
  components: {
    Menu,
  },
  mounted() {
    this.emitter.on("metamask-connect-event", (msg) => {
      this.connected = msg;
    });

    this.emitter.on("loading-event", (msg) => {
      this.loading = msg;
    });

    connectContract();
  },
};
</script>

<template>
  <div>
    <div v-if="loading" class="spinner-outer">
      <div class="spinner-inner">
        <div uk-spinner="ratio: 3"></div>
      </div>
    </div>
    <div id="app-content">
      <div><Menu /></div>
      <div class="uk-padding">
        <div v-if="!connected" class="uk-text-center notice-box">
          <span class="notice border-rainbow">Please connect to wallet.</span>
        </div>
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scped>
.spinner-outer {
  z-index: 2;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.5);
}

.spinner-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -50px 0 0 -50px;
}

.notice {
  color: white;
  border: 1px white solid;
  padding: 10px;
}

.notice-box {
  padding: 200px 0 200px 0;
}
</style>
