# zen
An attempt at creating a reusable force api with nodes that have a 3d gradient.

version 1.0.0

add linkStrength(0.1), between [0,1], can be a function
add friction(.9), 1 frictionless, 0 freeses all particles, value outside of [0,1] are not recommended
add gravity(.1), can be zero, but if zero bound nodes from escaping the layout
add theta(0.8), determines the accuracy of the Barnes-Hut approximation
add alpha(0.1)
add chargeDistance (max distance at which force is applied, default Infinity, a finite number improves performance)
linkDistance, can be a function
charge, can be a function (negative: respulsion, postive:attraction)
nodes can be symbols are images
edges can be any dom element as well, like nodes
