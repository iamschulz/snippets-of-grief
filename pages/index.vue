<template lang="pug">
  .stack
    - for (var x = 0; x < 40; x++)
      input(
        type="radio"
        name="stack"
        class="stack__control"
        id="stack-item-"+x
      )
      label(for="stack-item-"+x).stack__item
        article.card
          div.card__content
            h2 Card #{x}
            img(src="https://picsum.photos/id/"+x+"/80/80")
            p Lorem Ipsum Dolor Sit Amet
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss">
$cardsAmount: 40;

body {
  height: 80vh;
  display: grid;
  place-items: center;
  background: #222228;
}

.stack {
  position: relative;
  width: 20ch;
  list-style: none;
  margin-top: 0;
  margin-left: $cardsAmount * -2ch;

  &__control {
    display: none;
  }

  &__item {
    --active: 0;
    position: absolute;
    perspective: 800px;
    transition: transform 0.2s ease-out;
    cursor: pointer;

    @for $i from 1 through $cardsAmount {
      &:nth-of-type(#{$i}) {
        margin-left: $i * 1em;
        --rotate: #{($cardsAmount * -0.5deg) - ($i * -1deg)};
        --translateX: #{$cardsAmount * -0.2em - $i * -0.4em};
      }
    }

    transform: rotate(var(--rotate)) translateX(var(--translateX));

    :not(:checked) + &:hover {
      transform: rotate(var(--rotate)) translateX(var(--translateX))
        translateY(-2em);
    }

    :checked + & {
      --active: 1;
      --rotate: 0;
      pointer-events: none;
      cursor: initial;
    }
  }
}

.card {
  --border-radius: 5px;
  position: relative;
  width: 20ch;
  height: 15em;
  border-radius: var(--border-radius);
  background-color: #eee;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  transition: transform 0.4s ease-out, box-shadow 0.4s ease-out;

  transform: rotateY(calc(180deg + var(--active) * 180deg))
    rotateZ(calc(var(--active) * 4deg))
    translate(calc(var(--active) * 8em), calc(var(--active) * 23em))
    scale(calc(1 + var(--active) / 5));

  box-shadow: 0 calc(var(--active) * 0.3em) calc((var(--active) + 0.2) * 1em) 0
    rgba(0, 0, 0, 0.5);

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border: 2px solid #888;
    border-radius: var(--border-radius);
    background-color: #ddd;
    background-image: url(https://picsum.photos/180/240);
    z-index: 2;
    backface-visibility: hidden;
    transform: rotateY(180deg);
  }

  &__content {
    position: absolute;
    display: grid;
    place-items: center;
    text-align: center;
    padding: 1em 1ch;
    font-family: sans-serif;
    color: #333;
    pointer-events: all;
    backface-visibility: hidden;

    img {
      border-radius: 50%;
    }
  }
}
</style>
