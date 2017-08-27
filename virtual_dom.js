/** @jsx h */

// Diff start //

function updateElement ($parent, newNode, oldNode, index = 0) {
  console.log('$parent = ', $parent, ' \n newNode = ', newNode, ' \n oldNode = ', oldNode, ' \n index = ', index)
  if(!oldNode) {
    $parent.appendChild(
      createElement(newNode)
    )
  } else if (!newNode) {
    $parent.removeChild(
      $parent.childNodes[index]
    )
  } else if (changed(newNode, oldNode)) {
    $parent.replaceChild(
      createElement(newNode),
      $parent.childNodes[index]
    )
  } else if (newNode.type) {
    let newNodeLength = newNode.children.length
    let oldNodeLength = oldNode.children.length
    console.log('newNodeLength = ', newNodeLength, ' ---- ', ' oldNodeLength = ', oldNodeLength)
    console.log('\n========================================\n')
    for (let i = 0; i < newNodeLength || i < oldNodeLength; i++) {
      updateElement(
        $parent.children[index],
        newNode.children[i],
        oldNode.children[i],
        i
      )
    }
  }
}

function changed (node1, node2) {
  return typeof node1 !== typeof node2 ||
          typeof node1 === 'string' && node1 !== node2 ||
          node1.type !== node2.type
}
// Diff end //

function h (type, props, ...children) {
  return {type, props, children}
}

function createElement (node) {
  if (typeof node === 'string') {
    return document.createTextNode(node)
  }
  let $el = document.createElement(node.type)
  node.children
      .map(createElement)
      .forEach($el.appendChild.bind($el))
  return $el
}

const a = (
  <ul>
    <li>item 1</li>
    <li>item 2</li>
  </ul>
)

const b = (
  <ul>
    <li>text 1</li>
    <li>hello!</li>
  </ul>
)

const $root = document.getElementById('root')
const $reload = document.getElementById('reload')

$root.appendChild(createElement(a))
$reload.addEventListener('click', () => {
  updateElement($root, b, a)
})