<template>
  <div class="clearfix">
    <a-upload
      list-type="picture-card"
      :file-list="fileList"
      :remove="deleteImage"
      :custom-request="dummyRequest"
      @preview="handlePreview"
      @change="handleChange"
    >
      <div v-if="fileList.length < 2">
        <a-icon type="plus" />
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>
<script>
import Product from '~/services/API/ProductServices'
import { isEmpty } from '~/services/Helpers'
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

export default {
  props: {
    fList: {
      type: Array,
      default: () => [],
    },
    product: {
      type: Object,
      default: () => {},
      required: true,
    },
  },

  data() {
    return {
      previewVisible: false,
      previewImage: '',
      fileList: [],
    }
  },
  mounted() {
    this.boot()
  },
  updated() {},
  methods: {
    handleCancel() {
      this.previewVisible = false
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }

      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    boot() {
      if (!isEmpty(this.fList)) {
        this.fileList = this.fList
      }
    },
    handleChange() {
      // this.fileList = f.fileList;
    },
    dummyRequest(f) {
      const formData = new FormData()
      formData.append('file', f.file)

      Product.uploadImages(this.product.guid, formData).then((f) => {
        this.fileList = [...this.fileList, f]
      })
      setTimeout(() => {
        f.onSuccess('ok')
      }, 0)
    },
    close() {
      this.$notification.open({
        message: 'Job Post',
        description: 'Your add is now pending approval and will be live soon',
        class: 'successNotification',
      })
    },
    getServiceFileList() {},
    deleteImage(media) {
      Product.removeImage(media.guid).then(() => {
        this.fileList = this.fileList
          .filter((f) => f.uid !== media.uid)
          .map((f) => f)
      })
    },
  },
}
</script>
