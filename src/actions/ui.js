import { types } from "../types/types";



export const startOpenModal=()=>({
    type:types.uiOpenModal
});

export const startCloseModal=()=>({
   type:types.uiCloseModal
});