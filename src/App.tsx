import React, { Fragment, useState } from 'react';

type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>('');
  const [tasks, setTasks] = useState<ITask[]>([]);
  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask('')
  }
  const addTask = (name: string) => {
    const newTasks: ITask[] = [...tasks, { name, done: false }]
    setTasks(newTasks)
  }
  const toggleDoneTask = (i: number) => {
    const newTasks: ITask[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks)
  }
  const removeTask = (i: number) => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(i, 1)
    setTasks(newTasks)
  }
  return (
    <Fragment>
      <div className="container p-4">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card text-white bg-secondary">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <p className="card-text">¿Qué tengo que hacer?</p>
                  <input autoFocus required className="form-control" type="text" onChange={e => setNewTask(e.target.value)} value={newTask} />
                  <button className="btn btn-success mt-3">
                    Guardar
                  </button>
                </form>
              </div>
            </div>
            {
              tasks.map((t: ITask, i: number) => {
                return <div className="card bg-light my-3" key={i}>
                  <div className="card-header">Tarea n° {i + 1}</div>
                  <div className="card-body">
                    <h2 className="card-text" style={{ textDecoration: t.done ? 'line-through' : '' }}><strong>{t.name}</strong></h2>
                    <div className="mt-5 d-flex justify-content-end">
                      <button className="btn btn-danger me-3" onClick={() => removeTask(i)}>🗑</button>
                      <button className="btn btn-success" onClick={() => toggleDoneTask(i)}>{t.done ? '✓' : '✗'}</button>
                    </div>
                  </div>
                </div>
              })
            }
          </div>
        </div>
      </div>
    </Fragment>
  );
}


export default App;
