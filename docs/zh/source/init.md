# fast-crud

## fast-crud注册

#### 初始化
    了解[集成到你的项目中](../guide/start/integration.md)之后，我们来看看`app.use()`的初始化安装内容:

    1. [@fast-crud/ui-interface](https://github.com/fast-crud/fast-crud/tree/11809c8d15dbe1dc30b4c820f0c622b30dd260a9/packages/ui/ui-interface/src)的[uiContext](https://github.com/fast-crud/fast-crud/blob/11809c8d15dbe1dc30b4c820f0c622b30dd260a9/packages/ui/ui-interface/src/context.ts)

    2. defaultCrudOptions: 暂存默认配置在`commonOptions`中

    3. [Dict](https://github.com/fast-crud/fast-crud/blob/11809c8d15dbe1dc30b4c820f0c622b30dd260a9/packages/fast-crud/src/use/use-dict-define.ts#L4)

    4. I18n：国际化`vue-i18n`的实例，这里的`vue-i18n`得先与`fast-crud`注册到Vue上，不然Vue实例会错乱

    5. components：这里注册了所有独立组件，包括`fs-crud`

    6. FsFormWrapper：

    7. types：

    8. $fsui：

#### 导出
以下代码导出了`import * as fastCrud from "@fast-crud/fast-crud"`获得的功能
```TypeScript
export * from "./utils/index";  //  工具函数
export * from "./use";  // hoot函数，fast-crud的核心代码
export * from "./components";   // fast-crud独立组件
export * from "./ui"; // @fast-crud/ui-interface的所有导出，就是UI库
export * from "./d/index";  // TS类型定义
```

## fs-crud

    了解[第一个CRUD](../guide/start/first.md)和[基于配置](../guide/advance/options.md)之后，我们来看看`fs-crud`组件的实例是怎么来的:


简写：
 ```TypeScript
<template>
    <fs-page>
        <fs-crud ref="crudRef" v-bind="crudBinding" />
    </fs-page>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useFs } from "@fast-crud/fast-crud";
// 此为你产生CreateCrudOptionsRet类的hoot
import createCrudOptions from "./crud";
export default defineComponent({
    name: "FsCrudFirst",
    setup() {
        const customValue: any = {}; // 自定义变量, 将会传递给createCrudOptions
        const onExpose(e:OnExposeContext){}; // 将在createOptions之前触发，可以获取到crudExpose,和context
        const { crudRef, crudBinding, crudExpose, context } = useFs({ createCrudOptions, onExpose,context:customValue});
        return {
            crudBinding,
            crudRef
        };
    }
});
</script>
 ```

完整写法：
 ```TypeScript
<template>
    <fs-page>
        <fs-crud ref="crudRef" v-bind="crudBinding" />
    </fs-page>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useExpose, useCrud } from "@fast-crud/fast-crud";
// 此为你产生CreateCrudOptionsRet类的hoot
import createCrudOptions from "./crud";
//  此处为组件定义
export default defineComponent({
    name: "FsCrudFirst",
    setup() {
        // crud组件的ref
        const crudRef = ref();
        // crud 配置的ref
        const crudBinding = ref();
        // 暴露的方法
        const { crudExpose } = useExpose({crudRef, crudBinding});
        // 你的crud配置
        const { crudOptions } = createCrudOptions({crudExpose});
        // 初始化crud配置
        const { resetCrudOptions , appendCrudBinding } = useCrud({crudExpose, crudOptions});
        return {
            crudBinding,
            crudRef
        };
    }
});
</script>
 ```
通过上面代码，我们得出一句废话：

    `<fs-crud>`是一个Vue组件，它只接收`crudBinding`作为`prop`参数，也就是任何交互（比如`crudExpose`上的方法）最终都是对`crudBinding`进行修改以来影响`<fs-crud>`