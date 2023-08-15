import {supabase} from './supabase';

export const getAllTodoList = async () => {
  const {data, error} = await supabase.from('TodoList').select('*');
  return data;
};

export const addTodoItem = async (id: number, todoItem: string) => {
  const {error} = await supabase.from('TodoList').insert({id, todoItem});
};

export const deleteTodoItem = async (id: number) => {
  const {error} = await supabase.from('TodoList').delete().eq('id', id);
};
