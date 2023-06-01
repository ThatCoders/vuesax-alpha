---
PROPS:
  - name: color
    type: String
    values: Vuesax Colors, RGB, HEX
    description: Change the color of the radio.
    default: primary
    link: null
    usage: '#color'
    code: null

  - name: disabled
    type: Boolean
    values: true,false
    description: Determine if the component is in the disabled state.
    default: false
    link: null
    usage: '#default'
    code: null

  - name: loading
    type: Boolean
    values: true,false
    description: Determine if the component has a loading animation and is disabled.
    default: false
    link: null
    usage: '#loading'
    code: null

  - name: val
    type: String
    values: String
    description: Determine the value of the radio input.
    default: null
    link: null
    usage: '#default'
    code: null

SLOTS:
  - name: default
    type: slot
    values: null
    description: Add a label to the component.
    default: null
    link: null
    usage: '#label'
    code: null

  - name: icon
    type: slot
    values: null
    description: Add an icon inside the radio.
    default: null
    link: null
    usage: '#icon'
    code: null

---

# Radio

<card>

## Default

<docs-warn />

Add the radio type input with the component `<vs-radio />`

<template #example>
<radio-default />
</template>

<template #template>

@[code{1-8}](../.vuepress/components/radio/default.vue)

</template>

<template #script>

@[code{10-14}](../.vuepress/components/radio/default.vue)

</template>

</card>

<card>

## Color

<coloren />

<template #example>
<radio-color />
</template>

<template #template>

@[code{1-13} vue{4-9}](../.vuepress/components/radio/color.vue)

</template>

<template #script>

@[code{15-19}](../.vuepress/components/radio/color.vue)

</template>

</card>

<card>

## Label <Badge text="New"/>

Add a label to the radio with the `default` slot, if you need the label to be before the radio you can use the `label-before` property

<template #example>
<radio-label />
</template>

<template #template>

@[code{1-6} vue{4}](../.vuepress/components/radio/label.vue)

</template>

<template #script>

@[code{8-12}](../.vuepress/components/radio/label.vue)

</template>

</card>

<card>

## Loading <Badge text="New"/>

Add a loading animation to the component, when the radio has this property active it is as if it were in `disabled`

<template #example>
<radio-loading />
</template>

<template #template>

@[code{1-6} vue{3,4}](../.vuepress/components/radio/loading.vue)

</template>

<template #script>

@[code{8-12}](../.vuepress/components/radio/loading.vue)

</template>

</card>

<card>

## Icon <Badge text="New"/>

Add an icon inside the radio with the `icon` slot

<template #example>
<radio-icons />
</template>

<template #template>

@[code{1-46} vue{5-7}](../.vuepress/components/radio/icons.vue)

</template>

<template #script>

@[code{48-52}](../.vuepress/components/radio/icons.vue)

</template>

</card>

<card>

## API

</card>
