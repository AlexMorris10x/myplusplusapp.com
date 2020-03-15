import { Generic } from "../types";

declare module "simple-shared-state";

declare function setState(name: Generic): void;

declare const store;
