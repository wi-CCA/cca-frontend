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
      <RouterView />
    </div>
  </div>
</template>

<style scped>
.switch {
  position: relative;
}

.switch label {
  width: 50px;
  height: 25px;
  background-color: rgb(203, 203, 203);
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 50px;
  opacity: 0.5;
  box-shadow: 0px 0px 5px rgb(130, 130, 130);
}

.switch input[type="checkbox"] {
  visibility: hidden;
}

.switch label:after {
  content: "";
  width: 23px;
  height: 23px;
  border-radius: 50px;
  position: absolute;
  top: 1px;
  left: 1px;
  transition: 100ms;
  background-color: white;
}

.switch .look:checked + label:after {
  left: 26px;
}

.switch .look:checked + label {
  background-color: rgb(130, 130, 130);
}
</style>
