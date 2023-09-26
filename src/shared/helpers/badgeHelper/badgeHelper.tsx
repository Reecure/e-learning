import {DifficultLevels} from "@/enteties/Course/model/types/course";
import Badge, {BadgeColors} from "@/shared/ui/Badge/Badge";

export const difficultLevelBadgeHelper = (level: string) => {
	switch (level) {
	case DifficultLevels.EASY:
		return <Badge color={BadgeColors.GREEN} text={level} />;
	case DifficultLevels.MEDIUM:
		return <Badge color={BadgeColors.YELLOW} text={level} />;
	case DifficultLevels.HARD:
		return <Badge color={BadgeColors.RED} text={level} />;
	default:
		return <></>;
	}
};
