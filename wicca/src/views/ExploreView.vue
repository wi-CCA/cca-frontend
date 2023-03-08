<script setup>
import IndexCard from "../components/IndexCard.vue";
</script>
<script>
import { getCardAdressList } from "../assets/js/interface_request.js";
export default {
  data() {
    return {
      cardAddressList: [],
    };
  },
  mounted() {
    this.emitter.on("metamask-connect-event", (msg) => {
      this.emitter.emit("loading-event", true);
      getCardAdressList().then((res) => {
        this.emitter.emit("loading-event", false);
        if (res != 0) {
          this.cardAddressList = res;
          console.log("success");
        } else console.log("fail");
      });
    });

    this.emitter.on("card-update-event", (msg) => {
      this.emitter.emit("loading-event", true);
      getCardAdressList().then((res) => {
        this.emitter.emit("loading-event", false);
        if (res != 0) {
          this.cardAddressList = res;
          console.log("success");
        } else console.log("fail");
      });
    });
  },
  methods: {},
};
</script>

<template>
  <div class="uk-width-1-1 uk-text-center">
    <div class="width-1-1">
      <div class="uk-child-width-1-2@s uk-child-width-1-3@m uk-text-center" uk-grid>
        <div v-for="(address, index) in cardAddressList.slice().reverse()" :key="index">
          <IndexCard :address="address" :id="cardAddressList.length - index - 1" :key="address" />
        </div>
      </div>
    </div>
  </div>
</template>
