<template>
  <div uk-tooltip="title: Ethereum : 60%<br>Bitcoin : 20%<br>Coin1 : 10%<br>Coin2 : 3%<br>Coin3 : 3%<br>Coin4 : 3%<br>Coin5 : 1%;
    pos: top-left" class="uk-width-1-1" style="height: 20px; display: flex;">
    <div class="comp" style="width: 60%; background: purple"></div>
    <div class="comp" style="width: 20%; background: red"></div>
    <div class="comp" style="width: 10%; background: orange"></div>
    <div class="comp" style="width: 3%; background: green"></div>
    <div class="comp" style="width: 3%; background: blue"></div>
    <div class="comp" style="width: 3%; background: cyan"></div>
    <div class="comp" style="width: 1%; background: black"></div>
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
