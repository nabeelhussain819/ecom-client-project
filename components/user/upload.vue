<template>
  <a-upload
    name="avatar"
    list-type="picture-card"
    class="profile-uploader"
    :show-upload-list="false"
    :before-upload="beforeUpload"
    :custom-request="dummyRequest"
    @change="handleChange"
  >
    <img v-if="imageUrl" :src="imageUrl" class="preview-dp" alt="avatar" />
    <div v-else>
      <a-icon :type="loading ? 'loading' : 'plus'" />
      <div class="ant-upload-text">Upload</div>
    </div>
  </a-upload>
</template>

<script>
// revamp required component
import UserService from '~/services/API/UserServices'
import { isEmpty } from '~/services/Utilities'
function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  layout: 'dashboard',
  middleware: 'authenticated',
  props: {
    user: { default: () => {}, type: Object },
  },
  data() {
    return {
      fileList: [],
      previewVisible: false,
      previewImage: '',
      form: this.$form.createForm(this, { name: 'profile' }),
      loading: false,
      imageUrl: null,
    }
  },
  updated() {},
  mounted() {
    this.getUserDetails()
  },
  methods: {
    handleCancel() {
      this.previewVisible = false
    },
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl
          this.loading = false
        })
      }
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJpgOrPng && isLt2M
    },
    dummyRequest(f) {
      const formData = new FormData()
      formData.append('file', f.file)
      UserService.upload(formData).then(() => {
        this.$notification.open({
          message: 'Image Upload',
          description: 'Your image has been uploaded',
          class: 'success-notification',
        })
      })
      setTimeout(() => {
        f.onSuccess('ok')
      }, 0)
    },
    getUserDetails() {
      if (!isEmpty(this.user)) {
        console.log(this.user)
        this.imageUrl = this.user.profile_url
      }
    },
  },
}
</script>
