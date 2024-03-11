function Todo({task, isDone}){
    return (
        <div>
            <li>Task: {task} {isDone && ": Done"}</li>
        </div>
    )
}


export default Todo;