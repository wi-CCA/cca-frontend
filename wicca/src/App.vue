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
    <div><Menu /></div>
    <div class="uk-padding">
      <div v-if="!connected" class="uk-text-center notice-box"><span class="notice border-rainbow">Please connect to wallet.</span></div>
      <RouterView />
    </div>
  </div>
</template>

<style scped>
.notice {
  color: white;
  border: 1px white solid;
  padding: 10px;
}

.notice-box {
  padding: 200px 0 200px 0;
}
</style>
