import { Button } from 'ui';
import { useQuery, gql } from '@apollo/client';
import { User } from '../types';

const query = gql(`
	query GetUser($id: Int!) { 
		user(id: $id) { 
			name 
		}
	}
`);

export default function Web() {
	const { data } = useQuery<{ user: User }>(query, {
		variables: {
			id: 1,
		},
	});

	console.log('data', data?.user);

	return (
		<div>
			<h1 className='text-3xl font-bold underline'>Hello world!</h1>
			<Button />
			<button className='btn'>Button</button>
		</div>
	);
}
