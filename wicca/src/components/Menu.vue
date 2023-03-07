<script setup>
import CreateCard from "./CreateCard.vue";
</script>
<script>
import { connectMetamask, getAccount } from "../assets/js/interface_request.js";
export default {
  data() {
    return {
      connected: false,
      btnText: "connect wallet",
      createCardKey: 0,
    };
  },
  mounted() {
    this.emitter.on("metamask-connect-event", (msg) => {
      this.connected = msg;
      if (this.connected) {
        let account = getAccount();
        this.btnText = account;
      }
    });
  },
  methods: {
    connectOnClick: function () {
      if (getAccount() !== "") return;
      connectMetamask().then((success) => {
        if (success) {
          console.log("metamask successfully connected!");
          this.emitter.emit("metamask-connect-event", true);
        } else {
          console.log("metamask connection failed!");
          this.btnTest = "metamask required!";
          this.emitter.emit("metamask-connect-event", false);
        }
      });
    },
  },
};
</script>
<template>
  <div>
    <nav class="uk-navbar-container uk-navbar-transparent">
      <div class="uk-container">
        <div uk-navbar>
          <div class="uk-navbar-left">
            <div class="logo color-rainbow" style="display: inline-block">wicca</div>
            <ul class="uk-navbar-nav">
              <li><a class="active" href="#">all</a></li>
              <li><a href="#">top</a></li>
              <li><a href="#">my</a></li>
            </ul>
          </div>

          <div class="uk-navbar-right">
            <ul class="uk-navbar-nav">
              <li v-if="connected">
                <a href="#modal-center" uk-toggle
                  ><button class="uk-button uk-button-default" @click="createCardKey++">new card</button></a
                >
                <div id="modal-center" class="uk-flex-top" bg-close="false" uk-modal>
                  <CreateCard :key="createCardKey"/>
                </div>
              </li>
              <li>
                <a href="#"
                  ><button class="uk-button uk-button-default" @click="connectOnClick">
                    <span
                      style="display: block; overflow: hidden; text-overflow: ellipsis"
                      >{{ btnText }}</span
                    >
                  </button></a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.logo {
  display: block;
  font-size: 2.5rem;
  font-weight: 800;
  color: rgb(72, 73, 58);
  text-align: center;
}

.uk-navbar-nav .active {
  color: #fff;
}

.uk-button-default {
  background-color: transparent;
  color: #fff;
  border: 1px solid #e5e5e5;
}

.uk-button-default:hover {
  color: #fff;
}
</style>
