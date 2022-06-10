app.use((req, res, next) => {
  console.log("what is the Fuckin protocol: ", req.header('x-forwarded-proto'))
  next()
})