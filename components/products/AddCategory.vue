<template>
  <a-form :form="form" @submit="categorySubmit">
    <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="Category Name">
      <a-input v-decorator="[
          'name',
          { rules: [{ required: true, message: 'Please enter Category name' }] },
        ]" placeholder="Please enter Category name" />
    </a-form-item>
    <a-form-item label='Type' v-bind="formItemLayout">
      <a-select :allowClear="true" style="width: 100%"
        v-decorator="['type',{ rules: [{ required: true, message: 'Please select a Type' }]}]">
        <a-select-option value="Product">Product
        </a-select-option>
        <a-select-option value="Service">Service
        </a-select-option>

      </a-select>
      <a-button type="primary" html-type="submit">
        Submit
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
  const formItemLayout = {
    labelCol: {
      span: 4
    },
    wrapperCol: {
      span: 8
    },
  };
  const formTailLayout = {
    labelCol: {
      span: 4
    },
    wrapperCol: {
      span: 8,
      offset: 4
    },
  };

  import Category from '~/services/API/Category';

  export default {
    data() {
      return {
        checkNick: false,
        formItemLayout,
        formTailLayout,
        form: this.$form.createForm(this, {
          name: 'dynamic_rule'
        }),
        componentKey: 0,
      }
    },
    methods: {
      categorySubmit(e) {
        e.preventDefault();
        let fields = this.form.getFieldsValue([
          "name",
          "type",
        ]);
        this.form.validateFields((err, values) => {
          console.log(values);
          if (!err) {
            this.save(values);
            this.visible = false;
          }
        });
      },
      save(params = {}) {
        Category.save(params)
          .then((response) => {
            this.$emit("onComplete", response)
            alert('Added Category')
          })
          .catch((err)=>{
              console.log(err);
          })
      }
    }
  }
</script>