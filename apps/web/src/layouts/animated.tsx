import { motion } from 'framer-motion';

type AnimatedLayoutProps = {
	children: React.ReactNode;
};
function AnimatedLayout({ children }: AnimatedLayoutProps) {
	return (
		<motion.div
			initial={{ y: 50, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			exit={{ y: 50, opacity: 0 }}
			transition={{
				type: 'spring',
				stiffness: 560,
				damping: 20,
				delay: 0.2,
			}}
		>
			{children}
		</motion.div>
	);
}

export { AnimatedLayout };
