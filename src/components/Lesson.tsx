import { CheckCircle, Lock } from 'phosphor-react';
import { isPast, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
import { Link, useParams } from 'react-router-dom';
import classnames from 'classnames';

interface LessonProps {
	title: string;
	slugProps: string;
	availableAt: Date;
	type: 'live' | 'class';
}

export function Lesson(props: LessonProps) {
	const { slug } = useParams<{ slug: string}>();

	const { title, slugProps, availableAt, type } = props;

	const isLassonAvailable = isPast(availableAt);
	const availableDateFormatted = format(availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm", {locale: ptBR});
	const isActiveLesson = (slug == slugProps);

	return (
		<Link to={`/event/lesson/${slugProps}`} className='group'>
			<span className="text-gray-300">
				{availableDateFormatted}
			</span>

			<div 
				className={classnames('rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500', {
					'bg-green-500': isActiveLesson
				})}
			>

				<header className="flex items-center justify-between">
					{isLassonAvailable ? (
						<span 
							className={classnames('text-sm text-blue-500 font-medium flex items-center gap-2', {
								'text-white': isActiveLesson,
								'text-blue': !isActiveLesson,
							})}
						>
							<CheckCircle size={20} />
							Conteúdo liberado
						</span>
					) : (
						<span className="text-sm text-orange-500 font-medium flex items-center gap-2">
							<Lock size={20} />
							Em breve
						</span>
					)}

					<span 
						className={classnames('text-xs rounded py[2px] px-2 text-white border border-green-300 font-bold', {
							'border-white': isActiveLesson,
							'border-green': !isActiveLesson
						})}
					>
						{type == 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
					</span>
				</header>

				<strong 
					className={classnames('text-gray-300 mt-5 block', {
						'text-white': isActiveLesson
					})}
				>
					{title}
				</strong>
			</div>
		</Link>
	)
}