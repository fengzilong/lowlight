/**
 * @typedef {import('mdast').Root} Root
 */

import fs from 'node:fs'
import path from 'node:path'
import {zone} from 'mdast-zone'
import {u} from 'unist-builder'

/** @type {{common: string[], uncommon: string[]}} */
const data = JSON.parse(
  String(fs.readFileSync(path.join('script', 'data.json')))
)

export default function count() {
  return transformer
}

/**
 * @param {Root} tree
 */
function transformer(tree) {
  zone(tree, 'index', (start, _, end) => {
    const {common, uncommon} = data

    return [
      start,
      u('list', {spread: false}, [
        u('listItem', [
          u('paragraph', [
            u('inlineCode', 'lib/core.js'),
            u('text', ' — 0 languages')
          ])
        ]),
        u('listItem', [
          u('paragraph', [
            u('inlineCode', 'lib/common.js'),
            u('text', ' (default) — ' + common.length + ' languages')
          ])
        ]),
        u('listItem', [
          u('paragraph', [
            u('inlineCode', 'lib/all.js'),
            u('text', ' — ' + (common.length + uncommon.length) + ' languages')
          ])
        ])
      ]),
      end
    ]
  })
}
