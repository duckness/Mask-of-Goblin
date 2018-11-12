<script>
export default {
  name: "AnchorHeading",
  props: {
    header: {
      type: Number,
      required: true
    }
  },
  render: function (createElement) {
    return createElement(
      "h" + this.header,
      {
        class: ["is-h" + String(this.header)]
      },
      this.$slots.default
    );
  }
};
</script>
