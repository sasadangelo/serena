import { CategoryId } from "../theme/theme";

export type RootStackParamList = {
  Home: undefined;
  Player: { categoryId: CategoryId };
};
