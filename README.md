# Language specifications

### General

- Each line represents an instruction
- There is no end-line character
- There is no way (currently) to write an instruction on multiple line, or to write multiple instruction per line
- All keywords are expressed all-caps
- One line comment are expressed with `// comment`

### Reserved keywords

- DEFINE
- POINT
- LINE
- DRAFT
- LAYER
- AS
- USE

### Variables

- All user defined values (aka. variables) are expressed lower-case and cammel-case (eg. `variable_test`)
- They can only contain lower-case alphabetic characters, number digits and _
- They cannot start with a number digit
- There is one primitive variable type : `number`
- There are multiple complex variable type : `point`, `line` and `layer`
- A variable can be defined with the keywords `DEFINE ... AS` (eg. `DEFINE my_variable AS 12`)
- Primitive variables are actually constants, when defined they cannot be changed anymore
- There cannot be duplicate variable name

### Numbers and operators

- A number is noted with point decimal separator (eg. `12`, `17.5`)
- Available operators are `+`, `-`, `*` and `/`
- The notation `[xxx, yyy]` let you define a "tuple" which is a set of two values, usually used to define points or lines

### Points notation

- Coordinates are expressed as standard cartesian plane, having as origin the top left corner
- A point is expressed as a tuple of coordinate (eg. `[12, 14]`, `[11.6, 12.3]`)
- A point has two read-only properties : `x` and `y`
- A point always belong to a layer
- A point can be assigned to a variable for later reuse

### Lines notation

- A line is expressed as a tuple of points (eg. `[point_1, point_2]`, `[point_1, [12, 45]]`)
- A line has two read-only properties : `p1` and `p2` being the points of the line, in the defined order

Examples :

```
    // Draw an anonymous point at origin
    DEFINE POINT AS [0,0]
    
    // Draw a named point
    DEFINE POINT point_1 AS [20, 20]
    
    // Draw a point at x = 15.6 and y = 12.3
    DEFINE POINT point_2 AS [15.6, 12,3]
    
    // Draw a point at the same x coordinate as p_2
    DEFINE POINT point_3 AS [point_2.x, 100]
    
    // Create a point as a x translation of p_2
    DEFINE POINT point_4 as [point_2.x + 100, point_2.y]
    
    // Define a variable
    DEFINE variable_1 AS 123
    
    // Define another variable reading a value from a point
    DEFINE variable_2 AS point_2.x + 100
    
    // Draw a point using variables and operators
    DEFINE POINT AS [variable_1, variable_2 + 5]
    
    // Draw an anonymous line
    DEFINE LINE AS [point_2, point_3]
    
    // Draw a named line
    DEFINE LINE line_1 as [point_2, [point_3.x, point_3.y + 10]]
```
