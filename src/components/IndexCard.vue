<script setup>
import DistChart from "./DistChart.vue";
import JoinCard from "./JoinCard.vue";
</script>
<script>
import {
  getTokenName,
  getInputTokenName,
  getIndexTokenWeights,
  getMonthName,
} from "../assets/js/interface_request.js";
export default {
  props: ["address", "id"],
  data() {
    return {
      inputToken: "",
      weights: [],
      joinCardKey: 0,

      joined: false,
      buttonText: "Join",
      from: "-",
      to: "-",
      interval: "-",
    };
  },
  computed: {
    cardSrc() {
      return new URL(`/src/img/${this.id}.jpg`, import.meta.url).href;
    },
    avatarSrc() {
      return new URL(`/src/img/avatar/${this.id}.png`, import.meta.url).href;
    }
  },
  methods: {
    getIndexTokenNames() {
      let str = "";
      for (var i = 0; i < this.weights.length; i++) {
        if (this.weights[i] === 0) continue;
        str += getTokenName(i) + "/";
      }
      return str.substring(0, str.length - 1);
    },
    updateOnEnroll(msg) {
      if ( this.address !== msg[0] ) return;
      // update style & info (joined card)

      this.joined = true;
      this.buttonText = "Withdraw";
      this.from = "2023 MAR";
      this.to = "2023 " + (getMonthName((3 + parseInt(msg[1])) % 12).toUpperCase()).substring(0, 3);
      this.interval = msg[2] + " days";
    },
  },
  mounted() {
    console.log("MOUNT", this.address);
    getIndexTokenWeights(this.address).then((result) => {
      if (result) {
        console.log("getIndexTokenWeights success");
        for (var i = 0; i < result.length; i++) this.weights.push(parseInt(result[i]));
      } else {
        console.log("getIndexTokenWeights failed!");
      }
    });

    getInputTokenName(this.address).then((result) => {
      if (result) this.inputToken = result;
    });

    this.emitter.on("join-update-event", (msg) => {
      this.updateOnEnroll(msg);
    });
  },
};
</script>
<template>
  <div
    class="uk-card uk-card-default rotate"
    :class="{ 'default-gradient': !joined, 'golden-gradient': joined }"
  >
    <div class="uk-card-media-top">
      <img :src="cardSrc" width="1800" height="1200" alt="" />
    </div>
    <div>
      <div class="uk-card-header">
        <div class="uk-flex uk-flex-center">
          <img
            class="uk-border-circle"
            width="60"
            height="60"
            :src="avatarSrc"
            alt="Avatar"
            style="position: absolute; top: -50px; padding: 0"
          />
        </div>
        <div class="uk-text-center padding-top-only">
          <p
            class="text-address uk-text-meta uk-margin-remove-top uk-margin-remove-bottom"
          >
            <span class="text-small">@{{ address }}</span>
          </p>
        </div>
      </div>
      <div class="uk-card-body uk-text-center padding-small">
        <h3 class="uk-card-title uk-margin-remove-bottom">
          {{ inputToken }}<br />⬇️<br />{{ getIndexTokenNames() }}
        </h3>
        <div class="chart-padding">
          <DistChart :key="address" :weights="weights" />
        </div>
        <div class="uk-margin uk-margin-remove-top">
          <div class="uk-child-width-expand@s" uk-grid>
            <div>
              <span class="text-xsmall" style="font-weight: 500">From</span><br /><span
                class="text-small"
                >{{ from }}</span
              >
            </div>
            <div>
              <span class="text-xsmall" style="font-weight: 500">To</span><br /><span
                class="text-small"
                >{{ to }}</span
              >
            </div>
            <div>
              <span class="text-xsmall" style="font-weight: 500">Interval</span
              ><br /><span class="text-small">{{ interval }}</span>
            </div>
          </div>
        </div>
        <a href="#join-modal-center" :disabled="joined" uk-toggle>
          <button
            class="uk-button"
            :class="{ 'btn-gradient-border': !joined, 'black' : joined }"
            :disabled="joined"
            @click="joinCardKey++"
          >
            {{ buttonText }}
          </button></a
        >
        <div id="join-modal-center" class="uk-flex-top" bg-close="false" uk-modal>
          <JoinCard :address="address" :key="joinCardKey" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.black {
  color: black;
}

.uk-card-title {
  font-size: 1rem;
}

.text-address {
  overflow: hidden;
  text-overflow: ellipsis;
}

.text-small {
  font-size: 0.9rem;
}

.text-xsmall {
  font-size: 0.8rem;
}

.padding-top-only {
  padding: 15px 0 0 0;
}

.chart-padding {
  padding: 10px 0 15px 0;
}

.padding-small {
  padding: 30px 40px 30px 40px;
}
</style>
