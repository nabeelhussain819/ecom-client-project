<template class="profile-banner">
  <a-skeleton :loading="loading">
    <div class="center-container user-profile">
      <a-row :gutter="18">
        <a-col :xs="24" class="border profile-detail py-4" :sm="6">
          <h1 class="text-center heading-profile">Profile</h1>
          <upload v-if="!isEmpty(user)" :user="user" />
          <h2 class="heading text-center text-capitalize">{{ user.name }}</h2>
          <h3 class="join-date text-center text-capitalize">
            Joined November 2022
          </h3>
          <hr />
          <span id="profile-icon" :size="size2">
            <a-button type="" class="icon-email"> </a-button>
            <a-button type="" class="icon-mob"> </a-button>
            <a-button type="" class="icon-fb"> </a-button>
            <a-button type="" class="icon-chat"> </a-button>
          </span>
          <hr />
          <span> Followers (6)</span>
          <hr />
          <span> Following (9)</span>
          <hr />
          <a-button
            class="btn-follow"
            type="primary"
            style="text-align: center"
            block
            >Follow</a-button
          >
        </a-col>
        <a-col :xs="24" :sm="16" class="profile-tiles px-5 pt-4 pb-0">
          <a-row :gutter="18">
            <a-col
              v-for="product in products"
              :key="product.id"
              :xs="24"
              :sm="6"
              class="profile-tile-width"
            >
              <!-- editabel 'falsed', if needed make 'true'-->
              <tile
                :show-editable="false"
                :product="product"
                class="profile-cards"
              />
            </a-col>
          </a-row>
        </a-col>
      </a-row></div
  ></a-skeleton>
</template>
<script>
import upload from '~/components/user/upload'
import Product from '~/services/API/ProductServices'
import tile from '~/components/products/Tile'
import { isEmpty } from '~/services/Utilities'
export default {
  components: { upload, tile },
  data() {
    return { loading: false, user: {}, products: [] }
  },
  mounted() {
    this.user = this.$store.getters.getUser
    this.getProducts()
  },
  methods: {
    isEmpty,
    getProducts() {
      Product.self().then((products) => {
        this.products = products.data
      })
    },
    goto(guid) {
      this.$router.push({ path: `/user/product/${guid}` })
    },
  },
}
</script>
<style scoped lang="scss">
.profile-banner {
  background-image: url('https://www.teahub.io/photos/full/254-2549402_background-facebook-cover-photo-size.jpg');
  background-repeat: no-repeat;
  .heading-profile {
    font-size: 27px;
  }
  .profile-detail {
    width: 260px;
    padding: 15px;
    .btn-follow {
      margin-top: 50px;
    }
  }
}
.icon-fb {
  width: 30px;
  padding: 0px;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEX///84Xpg4XZg1YpkzZpk3YJk0ZJn4+vygsMgwZJhHdKLq7/QrZJjz9fktWpaInL1EZ56hrsi+x9q3wdRbe6goW5UrVZRcd6cmXpUnVZONoMBIcaJKbqIzWJYiTpGfssjZ3+mUqcTP1uOuutFtg65Yc6UZSY+UpMPFzt9mf60YUZFyjLRBY51ggqwbVpLh5+7b4THPAAADlUlEQVR4nO3abVPiMBSGYWvbKMtSsNqKL6AirIqu/v9/twjSpsmpZGpnknP2ucdPjh9yTYa84dERQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEELBdDKyOvE9pp4aLR7Hy5fV7dtksvnRis59D62PRmeXs3lZznYdNyoFCBfLP6XB2hZt4y+8X84p3h7IX/hETl8N5C4crg4BoyvWwntzWbGBKWvhom0CNSBrocsMshYOXWaQtXDlBGQsfCqdgHyF9we3iZS58NIRyFaYzx2BbIW3355FNSBX4TM9hQSQq/CFnEIKyFRIb/YkkKnwjNoLaSBTIbVVtAB5CofuM8hUSKykDWAUZXVrjkL7SKoDs6tssny93jde+B5uh5bmx1C/8Ebjxcj3AH/aydusFbh+GPoeXg+N5m3AKHv2Pbhe+pi3zWD24Xts/dRcSvXPYO57aD11XrbM4NL3yPrqsSSB6ZrjvkCmCXXg8cr3wHqrPnc3TjLZk++B9VYlbJ5FxawztdA4bK8l7PW7voQGMMrYH9aqdkLruhQLE1rA6FbKP13shPaFV5iQuNHLEhJAWcIrAihTmEoXptKFqXSh+S4qTmgC0/SGqfB5dWl0MSGBcXxBdhP6vTifz2bV+3V1p6CAsfWLbevQX6f0r7Opjd7w2BW+BYfShJ2A8V/fgkPl9JOFM7B48C04VE4/WbgC4yL4t42cfrJwBcbvwb9t5OSThTMwToLfJXP6ycIVGL/6BhwsJ58snIHhLzRbYXdg/B7+1205+WThClRF6CeaT+EPgHHM4DheC7sAwz/RaMIuQDUNf6GphJ2Aqgh/odkLuwHVNPyF5kvY5SO4AarY9/Ad2go7zqDisNBshV2BLBaaT2FnIIuFZiPsDlThX5025evMrE1YVE33+R69S4ux2fUFTVTWX45PfY++Y6cZKbzxPa7+ahOGf8h2DUL+nRYQcg9C/kHIP1qopAuVdKGSLlTShUq6UEkXKulCJV24B6pfQoVKurDyDYQKa6BQoQaUKdSBIoUNoERhEyhQaADlCU2gOKEFHAxkCW1gIktIAIUKNaAs4ZQAihQ2gBKFTaBAoQGUJzSB4oQWUJrQBgoTEkChwkS6MJEuTKQLE+nCRLrQBIoTWkBpQhsoTEgAIWTVHYTsg5B/d/XtSUvSfyrcTX/bDaaC5nA0pPM9LoQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCH0X/YPwmNtddlVLa0AAAAASUVORK5CYII=')
    8px 8px no-repeat;
}
.icon-email {
  padding: 0px;
  width: 30px;
  background: url('https://www.iconsdb.com/icons/preview/barbie-pink/email-5-xxl.png')
    8px 8px no-repeat;
}
.icon-mob {
  padding: 0px;
  width: 30px;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEX////gIYreAIDhMo/99PjfGIf75PDoYanjNZP0t9ffDIXvjMLxmMn0uNbun8T97/frf7b/+/3iLJHumcL86vTgGovyps/tfbvxlcf62ez3zOLqb7Hsd7ffAIjnWaT50ej3w+DkRZvkUJ363u30r9TxqszpcK7kR5v1w9ruhb7nUaTyo87rbLLoZ6noWqfmYKSWkjDLAAAF4UlEQVR4nO2dbXeiOhRG0SEI0RZ5FVArFEecabn9///uWhIULS4HPScwnbPXmqWOpI8bEnISP6hpj+LohjWbYjCzDN15+PM9queny2DMsRi7y73fp6QTexlnI0wYz7y4N0ffK5D9hGMR+v0IJmWA71c5BrukD8FtpsbvE55Z6gVD9yTIGMp9hjUS3FC54KiOPzyak0U0gyZaTMxRI0WxYmqyOvl1GqPFxNFr7cjMFC2mhfyDy9wislGT7OhVKvKPHDXpDD2SgkGJf5Pb7AKpGOnoYTWJKwXnhoI0Yy4VXWVzhrMUl5CVamZivxQdlS9VFTe5FCxUDYy8kIqqAldyFG4V5R2qCzkSV4ry1uISviiK++RFXMS1mrTNWJzQVE1cRSq6zXijJE1OFYGSsJpAThhKwt6rHsOWjf/yrWd4LP9r6LsSQ7Gm4I060Zi7CIW325xtw6rjsEyJ4Y8vQ+InzjqK/TxFyMH/Q6Xh6QT7OyTD3amfGj0YnopEY4JkODmdRZ0MlRjCrfTZMA3dnQfFzh2koWlpDgyaZQ7VEAoyRIYMASBDZMgQADJEhgwBIENkyBAAMkSGDAEgQ2TIEAAyRIYMASBDZMgQADJEhgwBIENkyBAAMkSGDAEgQ2TIEAAyRIYMASBDZMgQADJEhgwBIENkyBAAMkSGDAEgQ2TIEAAyRIYMASBDZMgQADJEhgwBIENkyBAAMkSGDAEgQ2TIEAAyRIYMASBDZMgQADJEhgwBIENkyBAAMkSGDAEgQ2TIEAAyRIYMASBDZMgQADJEhgwBIENkyBAAMkSGDAEgQ2TIEAAyRIYMASBDZMgQADJEhgwBIENkyBAAMkRGgWFa/U4mn59+8/u7GdolP1zCoPEHv5uhZvw3HgdvjR+p/naGmuZvzn6E+xsaXkCGoJAhCmQIChmiQIag/MOGW92GZHg1zWgyB8WLB2fIGGfVvxsPf3gUf2koDsMQGj47ZXxPQ1b6AzG05xzFcDhrfO1phHER2ejpFNGzoe0VLjyFd7qEfRtqevIET3KW0LMhPmQIChmiQIagkCEKZAgKGaJAhqCQ4XX0PN4/7eP8nqZ/g6GTRNmac77OosS5ffg5f4Oh75lc7lhx0/NvNzjjLzD0542NADaad1QcvqE+Pd/oYNOO7QdvmF5uVgVpp/b9GzotNN62M3kJGaufZPafN+/f0LemX5k17piJ+IAj92P34YqnPDm+6ySzlvZWc6j2bJiXvI0gPCr+Ep3UfbM1OxSK/NdRMAxa25f5UAyd5/YdYRYcP+Lvqm+yVfViJV78rt80gvbtVv586gT9GvrLKxvC47Q+RAxDvq1ebLkYiPWb6bi9OVsOZVff310zPG5a32e4G4qhFl7ppevjJ5S9dFK9mFz0Un99pZeGp4ieDQ/1Shvm/nhEJM4BW9iOvRA+fHp8d2+2tm/WPX3PFk7qzb7w1rgVxvIqs8AM5FPe+P4zf/va3EubM2LfhjfRJ3VHrjskn3T7A0M31PbuRV3q7m83ajB8Q8cLzgwDr9sScfiGmh415nUWRF2bD99Qc7bucQXsbrsu8vswNG4feYEzE7OCOeu8iaEZPRhu7mlrJGnS/dQc2Kg0lBVYePtIQMKLSg+Vd1F0vSsJ6yVUVmCBkrAaMdfwSEmYHBI8VZImkMuP+wZ/d9binv+iJq3iRcwza0VxK1ljbhXlHVaUspZdKcrL5VKoyG8fCxNYyAWXqkBnKRXLrnvz9+GXUnDZvVK4k0RuCAbzu2bvjhj1+tpNbh8MhC4njFGwww9NSrkq4V2r9UfIP+o1exHZtw9/ADuSY/CwZFY1CitSs96cH71G8e3j7ySevtabAsxM0WJaCY/bEYdHc7KIvm60PEi0mJijRoraOvhT0WwsaFnrrvyjsEaCq1xQ06zsyj4wAjxTV100SHZXvm+AhgWlunniDD8sOL4j48WzmsqiBSf2MmRHxjMvVlbKtDn6+6U7RrnPfDIOlnu/Tz8hqRtW21e4jzOzDP1xvf8B+ITJPEzJfzUAAAAASUVORK5CYII=')
    8px 8px no-repeat;
}
.icon-chat {
  padding: 0px;
  width: 30px;
  background: url('https://icon-library.com/images/pink-messages-icon/pink-messages-icon-7.jpg')
    8px 8px no-repeat;
}
</style>
