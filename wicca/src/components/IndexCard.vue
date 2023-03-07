<script setup>
import DistChart from "./DistChart.vue";
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
          <p class="uk-text-meta uk-margin-remove-top uk-margin-remove-bottom">
            <span class="text-small">@Luke Park</span> <br />
            <span class="text-xsmall">6 joined</span>
          </p>
        </div>
      </div>
      <div class="uk-card-body uk-text-center padding-small">
        <h3 class="uk-card-title uk-margin-remove-bottom">BTC/USDT Daily</h3>
        <div class="chart-padding"><DistChart /></div>
        <p class="text-small uk-margin-remove-top">
          Today candle show that market respon to Higher Low. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt.
        </p>
        <div class="uk-margin uk-margin-remove-top">
          <div class="uk-child-width-expand@s" uk-grid>
            <div>
              <span class="text-xsmall" style="font-weight: 500">From</span><br /><span
                class="text-small"
                >2023 JAN</span
              >
            </div>
            <div>
              <span class="text-xsmall" style="font-weight: 500">To</span><br /><span
                class="text-small"
                >2023 MAY</span
              >
            </div>
            <div>
              <span class="text-xsmall" style="font-weight: 500">Interval</span
              ><br /><span class="text-small">7 days</span>
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
