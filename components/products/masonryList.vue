<template>
  <div class="max-w-6xl mx-auto p-4">
    <client-only>
      <masonry class="masonry-container" :cols="{ default: 7, 1000: 3, 700: 2, 400: 1 }" :gutter="2">
        <div v-for="(item, index) in articles" :key="index" class="product-masonry" @click="showModal">
          <figure>
            <img class="img-responsive" :alt="item.name" src="https://static-01.daraz.pk/p/73f58ef4af4e68fc80398e0d7c214bdb.jpg" />
          </figure>

          <article class="detail">
            <h5 class="title">{{ item.product.name }}</h5>
            <p class="prices">$ {{ item.product.price }}</p>
            <p class="category">{{ item.category.name }}</p>
          </article>
          <a-modal v-model="visible" :title="item.product.name">
            <a-form  @submit="handleSubmit">
            <h5>Name:</h5>
            <a-input class="name" name="name" :value="item.product.name" v-decorator="['name',{rules:[{required:true, message:'Please enter name'}]}]"/>
            <h5>Price:</h5>
            <a-input class="prices" :value="item.product.price" v-decorator="['prices',{rules:[{required:true, message:'Please enter price'}]}]"/>
            <h5>Description</h5>
          <a-textarea placeholder="Description" :rows="4" v-decorator="[
          'description',
          {rules:[{required:true, message:'Please enter description'}]}
          ]" />       
          <h5>Action</h5>
            <a-popconfirm title="Are you sure want to delete this Product?" @confirm="deleteProduct(item.product.id)" ok-text="Yes" cancel-text="No">                
                <button class="delete-btn">Delete</button>
            </a-popconfirm>
              <button class="update-btn" html-type="submit">Update</button>
            </a-form>
          </a-modal>
        </div>
      </masonry>
    </client-only>
  </div>
</template>

<style scoped>
.delete-btn{
  color: white;
  background-color: tomato;
  border-radius: 4px;
  border: none;
  font-size: 0.8rem;
}
.update-btn{
  color: white;
  background-color: yellowgreen;
  border-radius: 4px;
  border: none;
  font-size: 0.8rem;
}
</style>

<script>
  import Products from '~/services/API/Product'
  export default {
    async fetch() {
      this.articles = await this.fetchData()
    },
    data() {
      return {
        page: 0,
        limit: 4,
        articles: [],
        selectedImage: '',
        images: [
          'https://static-01.daraz.pk/p/73f58ef4af4e68fc80398e0d7c214bdb.jpg',
          'https://static-01.daraz.pk/p/62db935bfe713de8a90df8ace8d8564e.jpg',
          'https://static-01.daraz.pk/p/62db935bfe713de8a90df8ace8d8564e.jpg',
          'https://static-01.daraz.pk/p/c6a7418673b9b156378b3cb005ab5903.jpg',
          'https://static-01.daraz.pk/p/73f58ef4af4e68fc80398e0d7c214bdb.jpg',
        ],
        visible: false,
        interval:null,
      }
    },
    methods: {
      created()
      {
        this.interval = setInterval(this.fetchData, 5000)
      },
      fetchData() {
        return Products.all();
      },
      deleteProduct(id)
      {
        return Products.destroy(id).then((response)=>{
          this.visible = false;
          alert('Product Deleted Successfully')
          location.reload();
        })
      },
      updateProduct(id,params={})
      {
      Products.update(id,params)
          .then((response) => {
            this.$emit("onComplete", response)
          })
      },
      showModal() {
        this.visible = true;
      },
      handleSubmit(e)
      {
        console.log(getFormValues());
        e.preventDefault();
        let fields = this.form.getFieldsValue([
          "name",
          "price",
          "description",
        ]);
        this.form.validateFields((err, values) => {
          if (!err) {
            this.updateProduct(id,values);
            alert('Product Added');
          }
        });

      },
      mounted() {
        this.fetchData();
        const idx = Math.floor(Math.random() * this.images.length)
        this.selectedImage = this.images[idx]
      },
      infiniteHandler($state) {
        setTimeout(async () => {
          this.page += 1
          const additionalItems = await this.fetchData()

          if (additionalItems.length > 0) {
            this.articles.push(...additionalItems)
            $state.loaded()
          } else {
            $state.complete()
          }
        }, 500)
      },
    },
    head: {
      title: 'Home page',
    },
  }
</script>