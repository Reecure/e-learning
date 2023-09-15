import {FC, useEffect, useState} from 'react';
import {Module} from "@/enteties/Module";
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {SortableModule} from "@/shared/ui/SortableItem/SortableModule";
import {Lesson} from "@/enteties/Lesson";
import {Button} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {trpc} from "@/shared/utils/trpc";

export type LessonOrModuleArray = Lesson[] | Module[];

interface Props {
    items: LessonOrModuleArray
    canEdit: boolean
    isModule: boolean
    isUserAuthor: boolean
}

const lessonsSortByOrder = (lessons: LessonOrModuleArray) => {
    return lessons.sort((a, b) => a.order - b.order)
}

const DragAndDrop: FC<Props> = ({canEdit, isUserAuthor, items, isModule}) => {
    const [propsItems, setPropsItems] = useState<Array<Lesson | Module>>(items)
    const [orderChange, setOrderChange] = useState(false)

    const updateLessons = trpc.updateLessonOrder.useMutation()
    const updateModules = trpc.updateModuleOrder.useMutation()

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        propsItems.forEach((item, i) => item.order = i)
    }, [propsItems])

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;
        if (active?.id !== over?.id) {
            setPropsItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over?.id);
                setOrderChange(true)
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    useEffect(() => {
        console.log('items', propsItems == items)
    }, [items, propsItems])

    const saveLessons = async () => {
        try {
            const updatedItems = await Promise.all(
                propsItems.map(async (item) => {
                    await updateLessons.mutate({
                        id: item.id,
                        order: item.order
                    });
                    console.log('updated');
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
                propsItems.map(async (item) => {
                    await updateModules.mutate({
                        id: item.id,
                        order: item.order
                    });
                    console.log('updated');
                    return item;
                })
            );
            setOrderChange(false);
        } catch (e) {
            console.log(e);
        }
    };


    return (
        <div className={'mt-5'}>
            <div className={'flex justify-center mb-2'}>
                {
                    isUserAuthor && canEdit && items.length > 1 && (
                        isModule ? <div>
                                <Button disabled={!orderChange} theme={ButtonThemes.FILLED}
                                        onClick={saveModules}>Save
                                    Order</Button>
                            </div> :
                            <div>
                                <Button disabled={!orderChange} theme={ButtonThemes.FILLED}

                                        onClick={saveLessons}>Save
                                    Order</Button>
                            </div>)
                }
            </div>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={propsItems}
                    strategy={verticalListSortingStrategy}
                    disabled={!canEdit}
                >
                    {propsItems?.map((propsItem) => (
                        <SortableModule disabled={!canEdit} key={propsItem.id} items={propsItem} isModule={isModule}/>
                    ))}
                </SortableContext>
            </DndContext>
        </div>
    );
};
export default DragAndDrop;
