export const handleLogout = () => {
  blogsService.setToken(null)
  window.localStorage.removeItem('loggedBloglistUser')
  props.removeUser()
}
