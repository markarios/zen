# zen
An attempt at creating a reusable force api with nodes that have a 3d gradient.

version 1.0.0

== backlog == 
1. linkStrength(0.1), between [0,1], can also be a function
2. friction(.9), 1 frictionless, 0 freeses all particles, value outside of [0,1] are not recommended
3. gravity(.1), can be zero, but if zero bound nodes from escaping the layout
4. theta(0.8), determines the accuracy of the Barnes-Hut approximation
5. alpha(0.1)
6. chargeDistance (max distance at which force is applied, default Infinity, a finite number improves performance)
7. add coding for alternate node and edge html element (like images)
8. testing

