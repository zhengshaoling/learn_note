<template>
  <div>
    <Nuxt />
  </div>
</template>

<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: .16rem;
  word-spacing: .01rem;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 2rem;
  border: .01rem solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: .1rem .3rem;
  margin-bottom: .5rem;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 2rem;
  border: 0.05rem solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: .1rem .3rem;
  margin-left: .15rem;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
