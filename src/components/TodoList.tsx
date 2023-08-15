import React, {useCallback} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {deleteTodoItem} from '../../utils/supabaseFuction';

interface Todo {
  id: number;
  todoItem: string;
}

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList = ({todos, setTodos}: Props) => {
  const handleDeleteTodoItem = useCallback(
    async (id: number) => {
      const updateTodos = todos.filter(todo => todo.id !== id);
      setTodos(updateTodos);

      await deleteTodoItem(id);
    },
    [todos],
  );

  return (
    <>
      {todos.map(todo => {
        return (
          <View key={todo.id} style={styles.todosWrapper}>
            <Text style={styles.todoText}>{todo.todoItem}</Text>
            <Button
              title="X"
              onPress={() => handleDeleteTodoItem(todo.id)}></Button>
          </View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  todosWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '70%',
  },
  todoText: {
    fontSize: 20,
    marginTop: 10,
  },
  deleteTodo: {
    fontSize: 20,
  },
  deleteBtn: {
    backgroundColor: 'red',
  },
});

export default TodoList;
