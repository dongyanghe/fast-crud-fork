import FsExtendsType from "./type";
import { utils } from "@fast-crud/fast-crud";
export * from "./components/fs-phone-input";
// @ts-ignore
const asyncModules = import.meta.glob("./components/**/*.vue");
const FsExtendsComponents = {
  install(app: any) {
    //加载异步组件，异步组件将会被懒加载，所以不用担心打包之后的体积问题
    utils.vite.installAsyncComponents(app, asyncModules, [], null, null);
  }
};

export const FsExtendsInput = {
  install(app: any) {
    app.use(FsExtendsType);
    app.use(FsExtendsComponents);
  }
};
