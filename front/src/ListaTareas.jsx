import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { PencilSquareIcon, PlusIcon } from "@heroicons/react/24/solid";

function MovableList({ tasks, setTasks }) {
  const refContainer = useRef();
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  });

  const listWidth = 350;
  const listHeight = 250;

  const [editingTask, setEditingTask] = useState(null);

  const updateBounds = () => {
    if (refContainer.current) {
      const containerWidth = refContainer.current.offsetWidth;
      const containerHeight = refContainer.current.offsetHeight;

      setBounds({
        left: -listWidth / 14,
        top: -listHeight / 14,
        right: containerWidth - listWidth,
        bottom: containerHeight - listHeight,
      });
    }
  };

  useEffect(() => {
    updateBounds();
    window.addEventListener("resize", updateBounds);

    return () => {
      window.removeEventListener("resize", updateBounds);
    };
  }, []);

  const addTask = () => {
    const newTask = { id: Date.now(), startTime: "", endTime: "", description: "" };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setEditingTask(newTask.id);
  };

  const editTask = (id) => {
    setEditingTask(id);
  };

  const confirmTask = (id, startTime, endTime, description) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, startTime, endTime, description } : task
      )
    );
    setEditingTask(null);
  };

  const cancelTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    setEditingTask(null);
  };

  return (
    <div ref={refContainer} className="relative w-full h-full">
      <Draggable bounds={bounds}>
        <div
          className="relative rounded-lg p-4 cursor-move bg-darkerbeige shadow-lg"
          style={{ width: `${listWidth}px`, minHeight: `${listHeight}px` }}
        >
          <h2 className="text-lg font-bold text-brown mb-4 text-center">Lista de Horarios</h2>
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li key={task.id} className="p-2 rounded-md bg-brown text-white flex flex-col space-y-2">
                {editingTask === task.id ? (
                  <>
                    <input
                      type="time"
                      defaultValue={task.startTime}
                      className="p-1 rounded-md text-black"
                      id={`startTime-${task.id}`}
                    />
                    <input
                      type="time"
                      defaultValue={task.endTime}
                      className="p-1 rounded-md text-black"
                      id={`endTime-${task.id}`}
                    />
                    <input
                      type="text"
                      placeholder="Descripción"
                      defaultValue={task.description}
                      className="p-1 rounded-md text-black"
                      id={`desc-${task.id}`}
                    />
                    <div className="flex justify-between space-x-2">
                      <button
                        onClick={() => {
                          const startTime = document.getElementById(`startTime-${task.id}`).value;
                          const endTime = document.getElementById(`endTime-${task.id}`).value;
                          const description = document.getElementById(`desc-${task.id}`).value;

                          if (startTime && endTime && description) {
                            confirmTask(task.id, startTime, endTime, description);
                          } else {
                            alert("Por favor, completa todos los campos.");
                          }
                        }}
                        className="px-2 py-1 bg-beige text-brown rounded-md"
                      >
                        Confirmar
                      </button>
                      <button
                        onClick={() => cancelTask(task.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded-md"
                      >
                        Cancelar
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="font-bold text-xs">{task.startTime}</span>
                        <span className="font-bold text-xs"> - </span>
                        <span className="font-bold text-xs">{task.endTime}</span>
                        <span className="text-xs" style={{ whiteSpace: "pre" }}>
                          {"  -- " + task.description}
                        </span>
                      </div>
                      <button
                        onClick={() => editTask(task.id)}
                        className="p-1 rounded-full hover:bg-brown hover:bg-opacity-10"
                      >
                        <PencilSquareIcon className="w-5 h-5 text-beige" />
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
          <button
            onClick={addTask}
            className="w-full mt-4 flex justify-center items-center bg-beige text-white rounded-md py-2"
          >
            <PlusIcon className="w-6 h-6 text-brown" />
          </button>
        </div>
      </Draggable>
    </div>
  );
}

export default MovableList;
