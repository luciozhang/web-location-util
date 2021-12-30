<template>
  <div>
    <button class="button" @click.stop="getH5Location">
      获取H5原生定位位置
    </button>
    <button class="button" @click.stop="getTencentMapLocation">
      获取腾讯地图定位位置
    </button>
    <button class="button" @click.stop="getTencentMapIPLocation">
      获取腾讯地图IP定位位置
    </button>
    <button class="button" @click.stop="getWeixinSdkLocation">
      获取微信SDK定位位置
    </button>
    <p>{{ locationResult }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import location from "../location";

export default defineComponent({
  name: "LocationDemo",
  data() {
    return {
      locationResult: {},
    };
  },
  methods: {
    getH5Location() {
      const options = {
        sessionCache: false,
        useWxSdk: false,
        useTencentMapApi: false,
        useH5Geolocation: true,
      };
      location.getLocation(options as any).then((location) => {
        this.locationResult = location as any;
      });
    },
    getTencentMapLocation() {
      const options = {
        sessionCache: false,
        useWxSdk: false,
        useTencentMapApi: false,
        useH5Geolocation: false,
      };
      location.getLocation(options as any).then((location) => {
        this.locationResult = location as any;
      });
    },
    getTencentMapIPLocation() {
      const options = {
        sessionCache: false,
        useWxSdk: false,
        useTencentMapApi: true,
        useH5Geolocation: false,
      };
      location.getLocation(options as any).then((location) => {
        this.locationResult = location as any;
      });
    },
    getWeixinSdkLocation() {
      const options = {
        sessionCache: false,
        useWxSdk: true,
        useTencentMapApi: false,
        useH5Geolocation: false,
      };
      location.getLocation(options as any).then((location) => {
        this.locationResult = location as any;
      });
    },
  },
});
</script>

<style scoped>
.button {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>
