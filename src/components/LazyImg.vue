<template>
  <img :src="imgsrc" />
</template>

<script>
export default {
  name: "LazyImg",
  props: {
    src: {
      type: String,
      required: true
    }
  },
  data: function() {
    return {
      image: new Image(),
      imgsrc: this.loading,
      loading:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJsb2FkaW5nc3ZnIiBkYXRhLW5hbWU9ImxvYWRpbmdzdmciIHZpZXdCb3g9IjAgMCAxMjggMTI4Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImNpcmNsZS1saW5lYXItZ3JhZGllbnQiIHgxPSI2NCIgeDI9IjY0IiB5MT0iMzIiIHkyPSI5NiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZmZiIgc3RvcC1vcGFjaXR5PSIwIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNzk1N2Q1Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHBhdGggZmlsbD0idXJsKCNjaXJjbGUtbGluZWFyLWdyYWRpZW50KSIgZD0iTTY0IDMyYTQgNCAwIDAgMCAwIDggMjQgMjQgMCAwIDEgMCA0OCA0IDQgMCAwIDAgMCA4IDMyIDMyIDAgMCAwIDAtNjR6Ij48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIGR1cj0iMXMiIGZyb209IjAgNjQgNjQiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiB0bz0iMzYwIDY0IDY0IiB0eXBlPSJyb3RhdGUiLz48L3BhdGg+PC9zdmc+"
    };
  },
  watch: {
    src: function(newval) {
      this.imgsrc = this.loading;
      this.image.onload = () => (this.imgsrc = this.image.src);
      this.image.src = newval;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.imgsrc = this.loading;
      this.image.onload = () => (this.imgsrc = this.image.src);
      this.image.src = this.src;
    });
  }
};
</script>
