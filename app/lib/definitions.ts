export type TUser = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type TPreviewCocktail = {
  id: number;
  name: string;
  level: number;
  levelid: number;
  flavourid: number;
  spiritid: number;
  categoryid: number;
};

export type TCollection = {
  collectionPreview: {
    id: number;
    name: string;
    level: number;
    levelid: number;
    flavourid: number;
    flavour: string;
    spirit: string;
    spiritid: number;
    description: string;
    glass: string;
    method: string;
    garnish: string;
    category: string;
    categoryid: number;
  }[];
};
