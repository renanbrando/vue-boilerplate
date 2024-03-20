export const formatVehicle = (vehicle: string) => {
  const [model, plate] = vehicle.split('|')
  const [formattedModel] = model.split('-color: ')
  const [, color] = model.split('-color: ')

  return {
    model: formattedModel?.replace('carModel:', '') || '',
    color,
    plate: plate?.replace('licensePlate:', '') || '',
  }
}
