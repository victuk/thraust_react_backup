import { ProductInterface } from "./interfaces/ProductInterface";
import { IoShirt } from "react-icons/io5";
import { GiUnderwearShorts } from "react-icons/gi";
import { GiConverseShoe } from "react-icons/gi";
import { FaRedhat } from "react-icons/fa";
import { GiPearlNecklace } from "react-icons/gi";
import { IoGlasses } from "react-icons/io5";
import { IoBagHandle } from "react-icons/io5";
import { TbPerfume } from "react-icons/tb";

export const sampleProducts: ProductInterface[] = [
  {
    id: 1,
    name: "White shirt with design",
    categories: ["shirts"],
    description: "A really nice shirt",
    picture: "/clothe.png",
    sizesAvailable: ["M"],
    cost: "20,000.00",
  },
  {
    id: 2,
    name: "White shirt",
    categories: ["shirts"],
    description: "A really nice shirt",
    picture: "/clothe.png",
    sizesAvailable: ["L", "XL", "M"],
    cost: "18,000.00",
  },
  {
    id: 3,
    name: "White shirt",
    categories: ["shirts"],
    description: "A really nice shirt",
    picture: "/clothe.png",
    sizesAvailable: ["L", "M"],
    cost: "12,000.00",
  },
  {
    id: 4,
    name: "White shirt",
    categories: ["shirts"],
    description: "A really nice shirt",
    picture: "/clothe.png",
    sizesAvailable: ["L", "XL", "M"],
    cost: "14,000.00",
  },
];

interface SampleProductCategories {
    name: string;
    icon: JSX.ElementType;
}

export const sampleProductCategories: SampleProductCategories[] = [
    {
        name: "shirts",
        icon: IoShirt
    },
    {
        name:  "shorts",
        icon: GiUnderwearShorts
    },
    {

        name: "shoes",
        icon: GiConverseShoe
    },
    {

        name: "hats",
        icon: FaRedhat
    },
    {
        name: "jewelries",
        icon: GiPearlNecklace
    },
    {
        name: "glasses",
        icon: IoGlasses
    },
    {
        name: "bags",
        icon: IoBagHandle

    },
    {
        name: "perfumes",
        icon: TbPerfume

    }
];