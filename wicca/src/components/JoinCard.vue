<script>
import { enroll } from "../assets/js/interface_request.js";
export default {
  props: ["address"],
  data() {
    return {
      month: 1,
      interval: 7,
    };
  },
  methods: {
    EnrollOnClick: function () {
      if (this.joined) return;
      this.emitter.emit("loading-event", true);
      enroll(this.address).then((result) => {
        this.emitter.emit("loading-event", false);
        if (result) {
          console.log("enroll success!");
          /* modal close & update cards */
          this.emitter.emit("join-update-event", [ this.address, this.month, this.interval ]);
        } else console.log("enroll failed!");
      });
    },
  },
};
</script>

<template>
  <div class="uk-modal-dialog uk-margin-auto-vertical">
    <button class="uk-modal-close-default" type="button" uk-close></button>
    <div class="uk-modal-header">
      <h2 class="uk-modal-title title">📥 join card</h2>
    </div>
    <div class="uk-modal-body">
      <div class="uk-margin">
        <label class="uk-form-label" for="form-stacked-select"
          >🗓 PERIOD : {{ month }} month</label
        >
        <input
          class="uk-range"
          type="range"
          v-model="month"
          min="1"
          max="24"
          step="1"
          aria-label="Range"
        />
      </div>

      <div class="uk-margin">
        <label class="uk-form-label" for="form-stacked-select"
          >📍 INTERVAL : {{ interval }} days</label
        >
        <input
          class="uk-range"
          type="range"
          v-model="interval"
          min="1"
          max="31"
          step="1"
          aria-label="Range"
        />
      </div>
    </div>
    <div class="uk-modal-footer uk-text-center">
      <button
        class="uk-button btn-gradient-border uk-modal-close"
        type="button"
        @click="EnrollOnClick"
      >
        Join
      </button>
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
