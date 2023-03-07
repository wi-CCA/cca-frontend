<script setup>
import DistChart from "./DistChart.vue";
</script>
<script>
import {
  getTokenName,
  getInputTokenName,
  getIndexTokenWeights,
} from "../assets/js/interface_request.js";
export default {
  props: ["address"],
  data() {
    return {
      inputToken: "",
      weights: [],
    };
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
  },
};
</script>
<template>
  <div class="uk-card uk-card-default golden-gradient rotate">
    <div class="uk-card-media-top">
      <img src="../img/sample.png" width="1800" height="1200" alt="" />
    </div>
    <div>
      <div class="uk-card-header">
        <div class="uk-flex uk-flex-center">
          <img
            class="uk-border-circle"
            width="60"
            height="60"
            src="../img/avatar.jpeg"
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
                >-</span
              >
            </div>
            <div>
              <span class="text-xsmall" style="font-weight: 500">To</span><br /><span
                class="text-small"
                >-</span
              >
            </div>
            <div>
              <span class="text-xsmall" style="font-weight: 500">Interval</span
              ><br /><span class="text-small">-</span>
            </div>
          </div>
        </div>
        <button class="uk-button btn-gradient-border">Join</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
