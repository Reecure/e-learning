import {type FC, useEffect, useState} from "react";
import {type Module} from "@/enteties/Module";
import {
	closestCenter,
	DndContext,
	type DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors
} from "@dnd-kit/core";
import {arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {SortableModule} from "@/shared/ui/SortableItem/SortableModule";
import {type Lesson} from "@/enteties/Lesson";
import {Button} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {trpc} from "@/shared/utils/trpc";

interface Props<T> {
    items: T[]
    canEdit: boolean
    isModule: boolean
    isUserAuthor: boolean
    refetch: () => void
}

export const sortByOrder = <T extends { order: number }>(items: T[]): T[] => items.sort((a, b) => a.order - b.order);

const DragAndDrop: FC<Props<Lesson | Module>> = ({
	canEdit,
	isUserAuthor,
	items,
	isModule,
	refetch
}) => {
	const [startPropsItems, setStartPropsItems] = useState<Array<Lesson | Module>>(items);
	const [propsItems, setPropsItems] = useState<Array<Lesson | Module>>(items);
	const [orderChange, setOrderChange] = useState(false);

	const updateLessons = trpc.updateLessonOrder.useMutation();
	const updateModules = trpc.updateModuleOrder.useMutation();

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	);

	useEffect(() => {
		setPropsItems(items);
	}, [items, updateModules, updateLessons]);

	useEffect(() => {
		propsItems.forEach((item, i) => (item.order = i));
	}, [propsItems]);

	useEffect(() => {
		setPropsItems(prevState => sortByOrder(prevState));
	}, [items, propsItems]);

	const handleDragEnd = (event: DragEndEvent) => {
		const {active, over} = event;
		if (active?.id !== over?.id) {
			setPropsItems(items => {
				const oldIndex = items.findIndex(item => item.id === active.id);
				const newIndex = items.findIndex(item => item.id === over?.id);
				setOrderChange(true);
				return arrayMove(items, oldIndex, newIndex);
			});
		}
	};

	const saveLessons = async () => {
		try {
			const updatedItems = await Promise.all(
				propsItems.map(async item => {
					await updateLessons.mutate({
						id: item.id,
						order: item.order
					});
					return item;
				})
			);
		} catch (e) {
			console.log(e);
		}
	};

	const saveModules = async () => {
		try {
			const updatedItems = await Promise.all(
				propsItems.map(async item => {
					await updateModules.mutate({
						id: item.id,
						order: item.order
					});
					return item;
				})
			);
			setOrderChange(false);
		} catch (e) {
			console.log(e);
		}
	};

	const resetHandler = () => {
		setPropsItems(startPropsItems);
	};

	return (
		<div className={"mt-5"}>
			<div className={"flex justify-center mb-2"}>
				{isUserAuthor && canEdit && items.length > 1 && (isModule
					? (
						<div className={"flex gap-5"}>
							<Button
								disabled={!orderChange}
								theme={ButtonThemes.FILLED}
								onClick={saveModules}
							>
                                Save Order
							</Button>
							<Button
								disabled={!orderChange}
								theme={ButtonThemes.FILLED}
								onClick={resetHandler}
							>
                                Reset
							</Button>
						</div>

					)
					: (
						<div className={"flex gap-5"}>
							<Button
								disabled={!orderChange}
								theme={ButtonThemes.FILLED}
								onClick={saveLessons}
							>
                                Save Order
							</Button>
							<Button
								disabled={!orderChange}
								theme={ButtonThemes.FILLED}
								onClick={resetHandler}
							>
                                Reset
							</Button>
						</div>
					))}
			</div>
			{
				propsItems.length === 0
					? <>empty</>
					: <DndContext
						sensors={sensors}
						collisionDetection={closestCenter}
						onDragEnd={handleDragEnd}
					>
						<SortableContext
							items={propsItems}
							strategy={verticalListSortingStrategy}
							disabled={!canEdit}
						>
							{propsItems?.map(propsItem => (
								<SortableModule
									disabled={!canEdit}
									key={propsItem.id}
									item={propsItem}
									refetch={refetch}
									isModule={isModule}
								/>
							))}
						</SortableContext>
					</DndContext>
			}
		</div>
	);
};

export default DragAndDrop;
