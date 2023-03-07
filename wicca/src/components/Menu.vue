<template>
  <div>
    <nav class="uk-navbar-container uk-navbar-transparent">
      <div class="uk-container">
        <div uk-navbar>
          <div class="uk-navbar-left">
            <div class="logo color-rainbow" style="display: inline-block">wicca</div>
            <ul class="uk-navbar-nav">
              <li><a class="active" href="#">all</a></li>
              <li><a href="#">top</a></li>
              <li><a href="#">my</a></li>
            </ul>
          </div>

          <div class="uk-navbar-right">
            <ul class="uk-navbar-nav">
              <!--li>
                <a href="#">Account</a>
                <div class="uk-navbar-dropdown">
                  <ul class="uk-nav uk-navbar-dropdown-nav">
                    <li class="uk-active"><a href="#">Active</a></li>
                    <li><a href="#">Item</a></li>
                    <li><a href="#">Item</a></li>
                  </ul>
                </div>
              </li-->
              <li><a href="#"><button class="uk-button uk-button-default">new card</button></a></li>
              <li><a href="#"><button class="uk-button uk-button-default">connect wallet</button></a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.logo {
  display: block;
  font-size: 2.5rem;
  font-weight: 800;
  color: rgb(72, 73, 58);
  text-align: center;
}

.uk-navbar-nav .active {
  color: #fff;
}

.uk-button-default {
  background-color: transparent;
  color: #fff;
  border: 1px solid #e5e5e5;
}

.uk-button-default:hover {
  color: #fff;
}
</style>
