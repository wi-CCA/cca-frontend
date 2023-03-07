<script setup>
import DistChart from "./DistChart.vue";
</script>
<script>
import { getTokenName, getTokenColor, create } from "../assets/js/interface_request.js";
const MAX_SUM = 10000;
export default {
  data() {
    return {
      selectedOutputTokenIndex: "",
      inputTokenIndex: "",
      outputTokenIndexList: [],
      weights: [0, 0, 0, 0, 0, 0],
    };
  },
  computed: {
    weightsum: {
      get() {
        return this.getComputedWeights().reduce((partialSum, a) => partialSum + a, 0);
      },
    },
  },
  methods: {
    getTokenColor(id) {
      return getTokenColor(id);
    },
    addOutputToken() {
      this.outputTokenIndexList.push({
        id: this.selectedOutputTokenIndex,
        text: getTokenName(this.selectedOutputTokenIndex),
      });
      this.weights[this.selectedOutputTokenIndex] = 1;
      this.selectedOutputTokenIndex = "";
    },
    removeToken(token) {
      this.outputTokenIndexList = this.outputTokenIndexList.filter((t) => t !== token);
      this.weights[token.id] = 0;
    },
    getComputedWeights() {
      let lastIndex = 0;
      let sum = 0;
      let remain = MAX_SUM;
      let computedWeights = [0, 0, 0, 0, 0, 0];

      for (var i = 0; i < this.weights.length; i++) {
        sum += parseInt(this.weights[i]);
      }
      if (sum === 0) return computedWeights;

      for (var i = 0; i < this.weights.length; i++) {
        let weight = parseInt(this.weights[i]);
        if (weight === 0) continue;
        computedWeights[i] = parseInt(MAX_SUM * (weight / sum));
        remain -= computedWeights[i];
        lastIndex = i;
      }

      if (remain !== 0) computedWeights[lastIndex] += remain;
      return computedWeights;
    },
    getTokenRatio(id) {
      let sum = 0;
      let width = 0;

      for (var i = 0; i < this.weights.length; i++) {
        sum += parseInt(this.weights[i]);
      }
      if (sum === 0) width = 0;
      else width = (this.weights[id] / sum) * 100;
      return width.toFixed(4).toString() + "%";
    },
    CreateOnClick: function () {
      if ( this.weightsum !== MAX_SUM ) return;
      this.emitter.emit("loading-event", true);
      create(this.inputTokenIndex, this.getComputedWeights()).then((result) => {
        this.emitter.emit("loading-event", false);
        if (result) {
            console.log("create success!");
            /* modal close & update cards */
            this.emitter.emit("card-update-event", true);
        }
        else console.log("create failed!");
      });
    },
  },
};
</script>

<template>
  <div class="uk-modal-dialog uk-margin-auto-vertical">
    <button class="uk-modal-close-default" type="button" uk-close></button>
    <div class="uk-modal-header">
      <h2 class="uk-modal-title title">📊 new card</h2>
    </div>
    <div class="uk-modal-body">
      <div class="uk-margin">
        <label class="uk-form-label" for="form-stacked-select">📩 INPUT TOKEN</label>
        <div class="uk-form-controls">
          <select class="uk-select" aria-label="Select" v-model="inputTokenIndex">
            <option value="" selected disabled>Select token</option>
            <option value="0">BTC</option>
            <option value="1">ETH</option>
            <option value="2">FTM</option>
            <option value="3">LINK</option>
            <option value="4">WICCA</option>
            <option value="5">USDC</option>
          </select>
        </div>
      </div>

      <div class="uk-margin">
        <label class="uk-form-label" for="form-stacked-select">📦 OUTPUT TOKEN</label>
        <div class="uk-form-controls">
          <select
            class="uk-select"
            aria-label="Select"
            v-model="selectedOutputTokenIndex"
            @change="addOutputToken"
          >
            <option value="" selected disabled>Select token</option>
            <option value="0">BTC</option>
            <option value="1">ETH</option>
            <option value="2">FTM</option>
            <option value="3">LINK</option>
            <option value="4">WICCA</option>
            <option value="5">USDC</option>
          </select>
        </div>
      </div>
      <div class="uk-margin" v-for="(token, index) in outputTokenIndexList" :key="index">
        <span class="token-name" :style="{ 'background-color': getTokenColor(token.id) }">
          {{ token.text }} ({{ getTokenRatio(token.id) }})</span
        >
        <button
          class="uk-button uk-button-text uk-text-danger"
          @click="removeToken(token)"
        >
          remove
        </button>
        <input
          class="uk-range"
          type="range"
          v-model="weights[token.id]"
          min="1"
          max="10"
          step="1"
          aria-label="Range"
        />
      </div>
      <!--p>
        Input Token : {{ inputTokenIndex }} <br />
        outputTokenIndexList : {{ outputTokenIndexList }} <br />
        Weights : {{ weights }} <br />
      </p-->
      <label class="uk-form-label" for="form-stacked-select"
        >📊 INDEX TOKEN DISTRIBUTION</label
      >
      <DistChart
        :key="weights"
        :tokens="outputTokenIndexList"
        :weights="getComputedWeights()"
      />
    </div>
    <div class="uk-modal-footer uk-text-center">
      <button class="uk-button btn-gradient-border uk-modal-close" type="button" @click="CreateOnClick">Create</button>
    </div>
  </div>
</template>
<style scoped>
.uk-form-label,
.token-name {
  font-weight: 500;
}
.token-name {
  color: white;
}
.uk-button-text {
  padding-left: 10px;
  font-size: 0.7rem;
}
.uk-modal-dialog {
  border-radius: 10px;
  overflow: hidden;
  perspective: 1px;
}
div {
  color: rgb(72, 73, 58);
}
.title {
  font-weight: 800;
  color: rgb(72, 73, 58);
}
</style>
