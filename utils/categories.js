export const MODELS = ['3060', '3070', '3080', '3090']
export const model = (title) => {
  const model = MODELS.find((model) => title.includes(model))
  return model ? model : ''
}
