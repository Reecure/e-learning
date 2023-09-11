import {FC, useEffect, useState} from 'react';
import {trpc} from "@/shared/utils/trpc";
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

export type LessonOrModuleArray = Lesson[] | Module[];

interface Props {
    items: LessonOrModuleArray
    canEdit: boolean
    isModule: boolean
}

const DragAndDrop: FC<Props> = ({canEdit, items, isModule}) => {
    const [propsItems, setPropsItems] = useState<Array<Lesson | Module>>(items)

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;
        if (active?.id !== over?.id) {
            console.log(active.data.current?.sortable?.index + ' ' + over?.data.current?.sortable?.index);
            setPropsItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over?.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    return (
        <div className={'mt-5'}>
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
