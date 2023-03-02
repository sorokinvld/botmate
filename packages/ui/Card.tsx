type CardProps = {
	title: string;
	children: React.ReactNode;
	description?: string;
};
function Card({ title, description, children }: CardProps) {
	return (
		<div className='card w-96 bg-base-100 shadow-xl'>
			<div className='card-body'>
				<h2 className='card-title'>{title}</h2>
				{description && <p className='text-gray-500'>{description}</p>}

				<div className='my-4'>{children}</div>

				<div className='card-actions'>
					<button className='btn btn-primary'>Login</button>
				</div>
			</div>
		</div>
	);
}

export { Card };
