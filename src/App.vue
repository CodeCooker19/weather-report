<template>
  <div class="w-full h-full block">
    <HomeComponent></HomeComponent>
    
  </div>
</template>

<script>
import HomeComponent from "./components/HomeComponent.vue";
export default {
  name: "App",
  components: {
    HomeComponent,
  },
  data() {
    return {
      currentYear: new Date().getFullYear()
    };
  },
  methods: {
    setRootFontSize() {
      const width = window.innerWidth;
      const minWidth = 378; // The width under which the font size starts decreasing
      const maxWidth = 992; // The width over which the font size stops increasing

      // Define the font size limits (you can adjust these values)
      const minFontSize = 40;
      const maxFontSize = 78;
      let fontSize;

      if (width < minWidth) {
        fontSize = minFontSize;
      } else if (width > maxWidth) {
        fontSize = maxFontSize;
      } else {
        fontSize = minFontSize + ((width - minWidth) / (maxWidth - minWidth)) * (maxFontSize - minFontSize);
      }
      document.documentElement.style.fontSize = `${fontSize}px`;
    }
  },

  computed: {},

  mounted() {
    setInterval(() => {
      window.location.reload();
    }, 300000);
    this.setRootFontSize();
    window.addEventListener('resize', this.setRootFontSize);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener('resize', this.setRootFontSize);
    // Refresh the page every 5 minutes (300,000 milliseconds)
  }
};
</script>

<style scoped></style>
