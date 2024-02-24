export type TUser = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type TCocktail = {
  name: string;
  cocktail_id: number;
  level: number;
  level_id: number;
  flavour_id: number;
  flavour: string;
  flavourcolour: string;
  spirit: string;
  spiritId: number;
  description: string;
  glass: string;
  garnish: string;
  category: string;
  categoryId: number;
  slug: string;
};

export type TPreviewCocktail = {
  id: number;
  name: string;
  level: number;
  levelid: number;
  flavourid: number;
  spiritid: number;
  categoryid: number;
  slug: string;
};

export type TFlavour = {
  id: number;
  name: string;
};

export type TSpirit = {
  id: number;
  name: string;
};

export type TCategory = {
  id: number;
  name: string;
};

export type TLevel = {
  id: number;
  level: number;
};

export type TCollection = {
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
  slug: string;
};
