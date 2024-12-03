import '../../todo.css'

const TodoItem = ({ task }: { task: string }) => {
  return <li className="li">{task}</li>;
};

export default TodoItem;
