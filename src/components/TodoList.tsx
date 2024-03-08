import { useState } from 'react';
import {
	useCreateTodoMutation,
	useDeleteTodoMutation,
	useGetTodosQuery
} from '../redux/api/crud';


const TodoList = () => {
	const [firstName, setFirstName] = useState('');
	const { data, isLoading } = useGetTodosQuery();
	const [createTodo] = useCreateTodoMutation();

	const addTodo = async () => {
		const createData = {
			firstName
		};
		setFirstName('');
		await createTodo(createData);
	};

	const [deleteTodo] = useDeleteTodoMutation();
	const handleDelete = (_id) => {
		deleteTodo(_id);
	};
	return (
		<div>
			<input
				type="text"
				value={firstName}
				onChange={(e) => setFirstName(e.target.value)}
			/>
			<button onClick={addTodo}>Add</button>
			{isLoading ? (
				<>
					<h1>Loading...</h1>
				</>
			) : (
				<>
					{data?.map((item) => (
						<div key={item._id}>
							<h1>{item.firstName}</h1>
							<button onClick={() => handleDelete(item._id)}>delete</button>
						</div>
					))}
				</>
			)}
		</div>
	);
};

export default TodoList;
