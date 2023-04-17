<template>
  <div id="toast" :class="toast.show && `show ${toast.type} mx-2`">
    {{ toast.text }}
    <span style="cursor: pointer" @click="closeToast"><svg-btn-close /></span>
  </div>
</template>
<script>
export default {
  props: {
    toast: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    setTimeout(() => {
      this.$emit('update:toast', {})
    }, 5000)
  },
  methods: {
    closeToast() {
      this.$emit('update:toast', {})
    },
  },
}
</script>
<style lang="scss" scoped>
.success {
  background-color: var(--success);
}
.error {
  background-color: var(--error);
}

#toast {
  display: flex;
  justify-content: space-between;
  visibility: hidden;
  min-width: 250px;
  text-align: left;
  padding: 16px;
  position: fixed;
  z-index: 1;
  right: 2%;
  top: 7.8%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  font-weight: 400;
  font-size: 15px;
  color: #fff;
  span {
    margin-left: 15px;
  }
  @media screen and (max-width: 740px) {
    top: 1% !important;
  }
}

#toast.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 5s;
  animation: fadein 0.5s, fadeout 0.5s 5s;
}

@-webkit-keyframes fadein {
  from {
    right: 0;
    opacity: 0;
  }
  to {
    right: 30px;
    opacity: 1;
  }
}

@keyframes fadein {
  from {
    right: 0;
    opacity: 0;
  }
  to {
    right: 2%;
    opacity: 1;
  }
}

@-webkit-keyframes fadeout {
  from {
    right: 2%;
    opacity: 1;
  }
  to {
    right: 0;
    opacity: 0;
  }
}

@keyframes fadeout {
  from {
    right: 2%;
    opacity: 1;
  }
  to {
    right: 0;
    opacity: 0;
  }
}
</style>
