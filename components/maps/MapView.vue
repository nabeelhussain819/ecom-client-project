<template>
  <client-only>
    <GmapMap
      :center="{ lat: 24.8621536, lng: 67.0701651 }"
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
export default {}
</script>
