<script>
import { getTokenName, getTokenColor } from "../assets/js/interface_request.js";
export default {
  props: ["tokens", "weights"],
  methods: {
    getTokenColor(id) {
      return getTokenColor(id);
    },
    getTokenRatio(id) {
      let sum = 0;
      let width = 0;

      for (var i = 0; i < this.weights.length; i++) {
        sum += parseInt(this.weights[i]);
      }
      if (sum === 0) width = 0;
      else width = (this.weights[id] / sum) * 100;
      return width.toString() + "%";
    },
    getTooltip() {
      let tooltip = "";
      for (var i = 0; i < this.weights.length; i++) {
        if ( this.weights[i] == 0 ) continue;
        tooltip += ( getTokenName(i) + " : " + this.getTokenRatio(i) );
        if ( i < this.weights.length - 1 ) tooltip += "<br>";
      }
      return "title: " + tooltip + "; pos: top-left";
    }
  },
};
</script>
<template>
  <div>
    <div
      v-if="tokens && tokens.length"
      :uk-tooltip="getTooltip()"
      class="uk-width-1-1"
      style="height: 20px; display: flex"
    >
      <div
        v-for="(token, index) in tokens"
        :key="index"
        class="comp"
        :style="{ width: getTokenRatio(token.id), background: getTokenColor(token.id) }"
      ></div>
    </div>
    
    <div
      v-else
      class="uk-width-1-1"
      style="height: 20px; display: flex"
    >
      <div class="comp" style="width: 60%; background: purple"></div>
      <div class="comp" style="width: 20%; background: red"></div>
      <div class="comp" style="width: 10%; background: orange"></div>
      <div class="comp" style="width: 3%; background: green"></div>
      <div class="comp" style="width: 3%; background: blue"></div>
      <div class="comp" style="width: 3%; background: cyan"></div>
      <div class="comp" style="width: 1%; background: black"></div>
    </div>

    <!--div>
      {{ tokens }}
      {{ weights }}
    </div-->
  </div>
</template>

<style scoped>
.comp {
  height: 20px;
  display: inline-block;
  position: relative;
  margin-left: 1px;
  border-radius: 2px;
}
</style>
