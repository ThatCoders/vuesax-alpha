import { computed, unref } from 'vue'
import { vuesaxColors } from '@vuesax-alpha/constants'
import { useNamespace } from '../use-namespace'
import type { MaybeRef } from '@vuesax-alpha/utils'

export const useBaseComponent = (color?: MaybeRef<string | undefined>) => {
  const ns = useNamespace('component')

  const className = computed(() => {
    return vuesaxColors.includes(unref(color) as any) ? ns.m(unref(color)) : ''
  })

  const isColor = computed(() => (!!unref(color) && ns.m(ns.is('color'))) || '')

  return [unref(className), unref(isColor)]
}
