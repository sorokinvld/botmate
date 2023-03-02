function Login() {
	return (
		<div className='flex items-center justify-center h-screen'>
			<div className='card w-[400px] bg-base-100 shadow-xl'>
				<div className='card-body'>
					<h2 className='card-title'>Setup Admin Account</h2>
					<p className='text-gray-500'>
						Create an administrator account to continue.
					</p>

					<div className='py-4 flex flex-col gap-2'>
						<div className='form-control w-full'>
							<label className='label'>
								<span className='label-text'>Name</span>
							</label>
							<input
								type='text'
								placeholder='John Doe'
								className='input w-full input-bordered'
							/>
						</div>

						<div className='form-control w-full'>
							<label className='label'>
								<span className='label-text'>Email</span>
							</label>
							<input
								type='text'
								placeholder='you@domain.com'
								className='input w-full input-bordered'
							/>
						</div>

						<div className='form-control w-full'>
							<label className='label'>
								<span className='label-text'>Password</span>
							</label>
							<input
								type='password'
								placeholder='•••••••••'
								className='input w-full input-bordered'
							/>
						</div>
					</div>

					<div className='card-actions'>
						<button className='btn btn-primary'>Register</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
