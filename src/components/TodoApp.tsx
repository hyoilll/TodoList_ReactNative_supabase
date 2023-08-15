import 'react-native-get-random-values';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import TodoList from './TodoList';
import {addTodoItem, getAllTodoList} from '../../utils/supabaseFuction';
import {v4 as uuidv4} from 'uuid';

interface Todo {
  id: number;
  todoItem: string;
}

const TodoApp = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<any>([]);

  useEffect(() => {
    const getTodos = async () => {
      const todos = await getAllTodoList();
      setTodos(todos);
    };
    getTodos();
  }, []);

  const onChangeText = useCallback((e: string) => {
    setText(e);
  }, []);

  const createTwoButtonAlert = () =>
    Alert.alert('Text Length error', 'Nothing is entered in the text.', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

  const handelAddTodoItem = useCallback(async () => {
    if (text.length === 0) {
      createTwoButtonAlert();
      return;
    }
    const strId = uuidv4();
    const srdIdParts = strId.split('-'); // UUIDをハイフンで分割
    const intId = parseInt(srdIdParts[0], 16); // 最初の部分を整数に変換

    const newTodos = [
      ...todos,
      {
        id: intId,
        todoItem: text,
      },
    ];

    await addTodoItem(intId, text);
    setTodos(newTodos);
    setText('');
  }, [todos, text]);

  return (
    <View style={styles.container}>
      <View style={styles.todoTitle}>
        <Text style={styles.title}>Todo List</Text>
      </View>
      <View style={styles.todoInput}>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeText}
          value={text}
          placeholder="wait a input text"
          onSubmitEditing={handelAddTodoItem}
        />
        <Button title="Add" onPress={handelAddTodoItem}></Button>
      </View>
      <View style={styles.todoList}>
        <TodoList todos={todos} setTodos={setTodos}></TodoList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  todoTitle: {
    marginTop: 20,
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  todoInput: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'row',
  },
  textInput: {
    height: 40,
    width: '60%',
    borderWidth: 1,
    padding: 10,
  },
  todoList: {
    flex: 6,
    alignItems: 'center',
  },
});

export default TodoApp;
