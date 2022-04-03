export const model = (title) => {
  const models = ['3060', '3070', '3080', '3090']
  const model = models.find((model) => title.includes(model))
  return model ? model : ''
}
