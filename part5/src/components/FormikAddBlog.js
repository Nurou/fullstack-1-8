import React from 'react'
import { withFormik, Form, Field } from 'formik'
import blogsService from '../services/blogs'
import * as Yup from 'yup'

const CreateBlog = ({ errors, touched, isSubmitting }) => (
  <Form>
    <div>
      {touched.title && errors.title && <p>{errors.title}</p>}
      <Field type="text" name="title" placeholder="title" />
    </div>
    <div>
      {touched.author && errors.author && <p>{errors.author}</p>}
      <Field type="text" name="author" placeholder="author" />
    </div>
    <div>
      {touched.url && errors.url && <p>{errors.url}</p>}
      <Field type="url" name="url" placeholder="url" />
    </div>
    <button disabled={isSubmitting} type="submit">
      Create
    </button>
  </Form>
)

// form logic lives within withFormik()
const FormikAddBlog = withFormik({
  // reset the form if the wrapped component props change (using deep equality)
  enableReinitialize: true,
  mapPropsToValues({
    title,
    author,
    url,
    updateBlogs,
    blogs,
    message,
    updateMessage,
  }) {
    return {
      title: title || '',
      author: author || '',
      url: url || '',
      blogs: blogs,
      updateBlogs: updateBlogs,
      message: message,
      updateMessage: updateMessage,
    }
  },
  validationSchema: Yup.object().shape({
    title: Yup.string().required('title is required'),
    author: Yup.string()
      .min(3, "author's name must be at least 3 characters long")
      .required('author is required'),
    url: Yup.string()
      .url()
      .required('url is required'),
  }),
  async handleSubmit(values, { resetForm, setSubmitting }) {
    try {
      const blogObject = {
        title: values.title,
        author: values.author,
        url: values.url,
      }
      const returnedBlog = await blogsService.create(blogObject)
      values.updateBlogs(values.blogs.concat(returnedBlog))
      values.updateMessage(
        `A new blog ${values.title} by ${values.author} was added!`,
      )
      setTimeout(() => {
        values.updateMessage(null)
      }, 2000)
      setSubmitting(false)
      resetForm()
    } catch (exception) {}
  },
})(CreateBlog)

export default FormikAddBlog
