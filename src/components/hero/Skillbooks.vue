<template>
  <div>
    <ol class="no-margin-ol">
      <li
        v-for="book in books"
        :key="book"
      >
        {{ book }}
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "Skillbooks",
  props: {
    books: {
      type: Array,
      required: true
    }
  }
};
</script>
