<template>
  <client-only>
    <GmapMap
      :center="{ lat: parseInt(lat), lng: parseInt(lng) }"
      :zoom="16"
      map-type-id="terrain"
      style="width: 100%; height: 300px"
    >
      <GmapMarker
        v-for="(m, index) in markers"
        :key="index"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center = m.position"
      />
    </GmapMap>
  </client-only>
</template>
<script>
export default {
  props: {
    lat: { default: '0', type: String, required: true },
    lng: { default: '0', type: String, required: true },
  },
  data() {
    return { markers: [] }
  },
}
</script>
