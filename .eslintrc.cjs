module.exports = {
    root: true,
    env: {
        browser: true, // 支持浏览器环境的检测
        es2021: true, // 支持es2021语法的检测
        node: true, // 支持node环境的检测
    },
    extends: ['@nuxtjs/eslint-config-typescript', 'plugin:prettier/recommended'],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 'latest', // 解析文件的时候使用最新的ecmaVersion
        sourceType: 'module', // 文件是ES6模块规范
    },
    rules: {
        // eslint (http://eslint.cn/docs/rules)
        'prettier/prettier': 'error',

        camelcase: 'off', // 强制使用骆驼拼写法命名约定
        'no-var': 'warn', // 要求使用 let 或 const 而不是 var
        'no-unused-vars': 'off', // 禁止出现未使用过的变量
        'no-use-before-define': 'off', // 禁止在 函数/类/变量 定义之前使用它们
        'prefer-const': 'off', // 此规则旨在标记使用 let 关键字声明但在初始分配后从未重新分配的变量，要求使用 const
        'no-irregular-whitespace': 'off', // 禁止不规则的空白
        'prefer-promise-reject-errors': 'off', // 要求使用 Error 对象作为 Promise 拒绝的原因
        'no-console': 'off',
        'symbol-description': 'off',
        'no-unreachable-loop': 'off',
        'import/no-named-as-default-member': 'off',

        // typeScript (https://typescript-eslint.io/rules)

        '@typescript-eslint/prefer-ts-expect-error': 'error', // 禁止使用 @ts-ignore
        '@typescript-eslint/no-inferrable-types': 'off', // 可以轻松推断的显式类型可能会增加不必要的冗长
        '@typescript-eslint/no-namespace': 'off', // 禁止使用自定义 TypeScript 模块和命名空间。
        '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
        '@typescript-eslint/ban-types': 'off', // 禁止使用特定类型
        '@typescript-eslint/explicit-function-return-type': 'off', // 不允许对初始化为数字、字符串或布尔值的变量或参数进行显式类型声明
        '@typescript-eslint/no-var-requires': 'off', // 不允许在 import 语句中使用 require 语句
        '@typescript-eslint/no-empty-function': 'off', // 禁止空函数
        '@typescript-eslint/no-use-before-define': 'off', // 禁止在变量定义之前使用它们
        '@typescript-eslint/ban-ts-comment': 'off', // 禁止 @ts-<directive> 使用注释或要求在指令后进行描述
        '@typescript-eslint/no-non-null-assertion': 'off', // 不允许使用后缀运算符的非空断言(!)
        '@typescript-eslint/explicit-module-boundary-types': 'off', // 要求导出函数和类的公共类方法的显式返回和参数类型

        // vue (https://eslint.vuejs.org/rules)
        'vue/no-v-html': 'off', // 禁止使用 v-html
        'vue/script-setup-uses-vars': 'error', // 防止<script setup>使用的变量<template>被标记为未使用，此规则仅在启用该no-unused-vars规则时有效。
        'vue/v-slot-style': 'error', // 强制执行 v-slot 指令样式
        'vue/no-mutating-props': 'off', // 不允许组件 prop的改变
        'vue/custom-event-name-casing': 'off', // 为自定义事件名称强制使用特定大小写
        'vue/attributes-order': 'off', // vue api使用顺序，强制执行属性顺序
        'vue/one-component-per-file': 'off', // 强制每个组件都应该在自己的文件中
        'vue/html-closing-bracket-newline': 'off', // 在标签的右括号之前要求或禁止换行
        'vue/max-attributes-per-line': 'off', // 强制每行的最大属性数
        'vue/multiline-html-element-content-newline': 'off', // 在多行元素的内容之前和之后需要换行符
        'vue/singleline-html-element-content-newline': 'off', // 在单行元素的内容之前和之后需要换行符
        'vue/attribute-hyphenation': 'off', // 对模板中的自定义组件强制执行属性命名样式
        'vue/require-default-prop': 'off', // 此规则要求为每个 prop 为必填时，必须提供默认值
        'vue/multi-word-component-names': 'off', // 要求组件名称始终为 “-” 链接的单词
        'vue/require-toggle-inside-transition': 'off', // 要求在 <transition> 内必须存在 <template> 或 <script> 标签
        'vue/valid-template-root': 'off', // 强制执行有效的模板根节点
        'vue/prop-name-casing': 'off', // 强制执行属性名称样式
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'always',
                    normal: 'never',
                    component: 'always',
                },
                svg: 'always',
                math: 'always',
            },
        ], // 强制执行自闭合标签的样式

        // 公司规定
        'brace-style': ['error', '1tbs'], // 大括号单独占一行
        'space-infix-ops': 'error', // 在操作符前后插入空格，删除操作符中多余的空格
        'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }], // 删除函数或方法中的多余空行
        curly: ['error', 'all'], // 给单行的条件与循环语句加上大括号
        'vue/no-use-v-if-with-v-for': 'off',
    },
};
