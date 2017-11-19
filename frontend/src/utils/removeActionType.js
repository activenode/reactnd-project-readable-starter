import { deleteComment } from "../components/comment_section/actions";

export default function (actionObj) {
  const actionCopy = { ...actionObj };
  delete actionCopy.type;
  return actionCopy;
}