import Button, { ButtonType } from "./Button";
import Container, { Length } from "./Container";
import { Color, Font, Spacing } from "./cssConstants";
import Flex, { FlexAlign } from "./Flex";
import Text, { FontWeight } from "./Text";

function EasyFilter({
  selectedFilter,
  setSelectedFilter,
  filterObject,
}: {
  selectedFilter: { label: string; value: string };
  setSelectedFilter: ({
    label,
    value,
  }: {
    label: string;
    value: string;
  }) => void;
  filterObject: { label: string; value: string }[];
}) {
  return (
    <Container
      borderRadius={Spacing.s8}
      padding={[Spacing.s4]}
      bg={Color.grey100}
      width={Length.maxContent}
    >
      <Flex align={FlexAlign.Center}>
        {filterObject.map((filter) => (
          <Button
            buttonType={ButtonType.Primary}
            padding={[Spacing.s6, Spacing.s12]}
            backgroundColor={
              filter.label == selectedFilter.label
                ? Color.brand500
                : Color.grey100
            }
            color={
              filter.label == selectedFilter.label
                ? Color.brand100
                : Color.grey500
            }
            fontSize={Font.fs14}
            borderColor={
              filter.label == selectedFilter.label
                ? Color.grey200
                : Color.grey100
            }
            border={Spacing.s2}
            borderRadius={Spacing.s8}
            onClick={() => setSelectedFilter(filter)}
          >
            <Text
              color={
                filter.label == selectedFilter.label
                  ? Color.brand100
                  : Color.grey500
              }
              fontSize={Font.fs14}
              fontWeight={FontWeight.Medium}
            >
              {filter.label}
            </Text>
          </Button>
        ))}
      </Flex>
    </Container>
  );
}

export default EasyFilter;
