export default function (actionObj) {
  const actionCopy = { ...actionObj };
  delete actionCopy.type;
  return actionCopy;
}