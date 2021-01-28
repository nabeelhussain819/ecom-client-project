<template>
  <div>
    <a-row justify="center " class="border" :gutter="1">
      <a-col :xs="24" :md="6"> </a-col>
      <a-col :xs="24" :md="12">
        <a-col :span="24" :xs="24" :md="12">
          <a-card :loading="loading"> whatever content </a-card>
        </a-col>
        <a-col :span="100" :xs="24" :md="12">
          <a-card :loading="loading"> whatever content </a-card>
        </a-col>
      </a-col>
      <a-col :xs="24" :md="6"> </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
    }
  },
}
</script>
