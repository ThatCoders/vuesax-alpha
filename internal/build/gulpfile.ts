import path from 'path'
import { copyFile, mkdir, readdir, rm } from 'fs/promises'
import { copy } from 'fs-extra'
import { parallel, series } from 'gulp'
import {
  buildOutput,
  cpdirRecursive,
  projRoot,
  vsOutput,
  vsPackage,
} from '@vuesax-alpha/build-utils'
import { buildConfig, run, runTask, withTaskName } from './src'
import type { TaskFunction } from 'gulp'
import type { Module } from './src'

export const copyFiles = () =>
  Promise.all([
    copyFile(vsPackage, path.join(vsOutput, 'package.json')),
    copyFile(
      path.resolve(projRoot, 'README.md'),
      path.resolve(vsOutput, 'README.md')
    ),
    copyFile(
      path.resolve(projRoot, 'global.d.ts'),
      path.resolve(vsOutput, 'global.d.ts')
    ),
  ])

export const copyTypesDefinitions: TaskFunction = (done) => {
  const src = path.resolve(buildOutput, 'types', 'packages')
  const copyTypes = (module: Module) =>
    withTaskName(`copyTypes:${module}`, () =>
      copy(src, buildConfig[module].output.path, { recursive: true })
    )

  return parallel(copyTypes('esm'), copyTypes('cjs'))(done)
}

export const copyFullStyle = async () => {
  await mkdir(path.resolve(vsOutput, 'dist'), { recursive: true })
  await copyFile(
    path.resolve(vsOutput, 'theme-chalk/index.css'),
    path.resolve(vsOutput, 'dist/index.css')
  )
}

async function moveAndRemovePackagesDir() {
  const files = await readdir(path.resolve(vsOutput, 'es/packages'), {
    withFileTypes: true,
  })

  for (const file of files) {
    const fromPath = path.resolve(vsOutput, 'es/packages', file.name)
    const toPath = fromPath.replace('packages', '')

    if (file.isDirectory()) {
      await cpdirRecursive(fromPath, toPath)
    } else {
      await copyFile(fromPath, toPath)
    }
  }

  // Remove empty packages dir
  await rm(path.resolve(vsOutput, 'es/packages'), { recursive: true })
}

export default series(
  withTaskName('clean', () => run('pnpm run clean')),
  withTaskName('createOutput', () => mkdir(vsOutput, { recursive: true })),

  parallel(
    runTask('buildModules'),
    runTask('buildFullBundle'),
    runTask('generateTypesDefinitions'),
    runTask('buildHelper'),
    series(
      withTaskName('buildThemeChalk', () =>
        run('pnpm run -C packages/theme-chalk build')
      ),
      copyFullStyle
    )
  ),

  parallel(copyTypesDefinitions, copyFiles),
  parallel(moveAndRemovePackagesDir)
) as any

export * from './src'
