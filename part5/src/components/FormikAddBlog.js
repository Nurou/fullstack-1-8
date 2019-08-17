import React from 'react'
import { withFormik, Form, Field, ErrorMessage } from 'formik'
import blogsService from '../services/blogs'
import * as Yup from 'yup'
import PropTypes from 'prop-types'

const CreateBlog = ({ isSubmitting }) => {
  return (
    <Form>
      <div>
        <Field type="text" name="title" placeholder="title" />
        <ErrorMessage name="title" />
      </div>
      <div>
        <Field type="text" name="author" placeholder="author" />
        <ErrorMessage name="author" />
      </div>
      <div>
        <Field type="url" name="url" placeholder="url" />
        <ErrorMessage name="url" />
      </div>
      <button disabled={isSubmitting} type="submit">
        Create
      </button>
    </Form>
  )
}

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
      // eslint-disable-next-line quotes
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
    } catch (exception) {
      console.log(exception)
      resetForm()
    }
  },
})(CreateBlog)

FormikAddBlog.propTypes = {
  blogs: PropTypes.array.isRequired,
  updateBlogs: PropTypes.func.isRequired,
  updateMessage: PropTypes.func.isRequired,
}

export default FormikAddBlog
