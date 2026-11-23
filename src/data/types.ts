export type ProductKind =
  | 'stubby'
  | 'freshener'
  | 'towel'
  | 'mug'
  | 'bottle'
  | 'sanitiser'
  | 'cap'
  | 'apparel'
  | 'bag'
  | 'keyring';

export type MarkKind =
  | 'mountain'
  | 'sun'
  | 'wave'
  | 'bolt'
  | 'leaf'
  | 'hex'
  | 'drop'
  | 'star'
  | 'bean'
  | 'flame';

export type Pattern = 'none' | 'stripes' | 'dots' | 'split' | 'hivis' | 'full';

/** A FICTIONAL example customer brand used to demonstrate customisation. */
export interface ExampleBrand {
  name: string;
  mark: MarkKind;
}

/** Describes one illustrated product mockup (placeholder for photography). */
export interface Artwork {
  kind: ProductKind;
  /** main product colour */
  body: string;
  /** secondary product colour (handle, brim, label, stripe...) */
  accent: string;
  /** print / ink colour */
  ink: string;
  brand: ExampleBrand;
  pattern?: Pattern;
  /** photography backdrop colour (CSS value) */
  backdrop: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  technique: string;
  art: Artwork;
  /** Real product photo (in /public). When set, the card shows it instead of the illustrated art. */
  photo?: {
    src: string;
    alt: string;
    /** scale-up factor for photos with lots of empty space around the product (default 1) */
    zoom?: number;
  };
}
