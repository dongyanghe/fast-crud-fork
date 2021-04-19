import FsUploaderType from "./type";
export { FsUploaderType };
import Components from "./index.glob";
export default {
  install(app, options) {
    app.use(FsUploaderType, options);
    app.use(Components);
  }
};
