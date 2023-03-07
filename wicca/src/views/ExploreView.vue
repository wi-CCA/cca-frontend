<script setup>
import HelloWorld from "../components/HelloWorld.vue";
import IndexCard from "../components/IndexCard.vue";
</script>

<template>
  <div class="uk-width-1-1 uk-text-center">
    <div class="width-1-1">
      <div class="uk-child-width-1-2@s uk-child-width-1-3@m uk-text-center" uk-grid>
        <div>
          <IndexCard />
        </div>
        <div>
          <IndexCard />
        </div>
        <div>
          <IndexCard />
        </div>
      </div>
    </div>
  </div>
</template>