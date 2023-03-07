<script setup>
import DistChart from "../components/DistChart.vue";
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

.btn-gradient-border {
  color: white;
  border: 5px double transparent;
  background-image: linear-gradient(rgba(13, 14, 33, 0), rgba(13, 14, 33, 0)),
    radial-gradient(
      circle at left top,
      rgb(1, 110, 218) 0%,
      rgb(217, 0, 192) 51%,
      rgb(1, 110, 218) 100%
    );
  background-origin: border-box;
  background-clip: padding-box, border-box;
  border-radius: 20px;
  transition: 0.5s;
  background-size: 200% auto;
}

.btn-gradient-border:hover {
  background-position: right center; /* change the direction of the change here */
}
</style>
