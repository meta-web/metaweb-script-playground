# META Script Playground Guide

META Script is an expression scripting language designed for the META Web project.

**META Script is used for:**

- Defining conditional data model properties and attributes
- Defining dynamic expressions
- Interconnecting UI components
- It works similar to spreadsheet formulas but uses data model properties instead of cells.

## How to Use this Tool

META Script uses data model so we need to define it. Then you can write and test expressions.

## Data Model

- Data model consists of nodes
- Each node has a value and attributes
- Node can contain other nodes instead of value
- Nodes can represent tree structure
- Written as JSON

**NOTE:** this tool uses data model mockup class for testing purposes. It’s not full-features META Web data model.

### Nodes

- Node value is JSON property identified by `_` sign
- Child nodes and attributes are defined as direct JSON properties
- Node can have only value or child nodes, not both
- Attributes are child properties prefixed with `$` sign


### Attributes

Attributes work the same as nodes and can represent a tree structure as well.

Node attributes are JSON properties prefixed with `$` char.

**Example**

```json
{
    "$attribute1": "value",
    "$attribute2": { "_": "value" },
    "$structAttribute": {
        "subAttr1": "value",
        "subAttr2": { "_": "value" }
    },
    "childNode": {
        "$attribute": "value",
        "_": "nodeValue"
    },
    "anotherNode": "nodeValue"
}
```

### Placeholders

Placeholders act as an alias for a path in the data model.

Its purpose is to define iterators and shortcuts in the data model and UI components.

Placeholders are defined as JSON properties where the key is placeholder name and the value is a data model path as an array.

**Note:** Placeholder `scope` is mandatory. It represents a relative path in the data model where expression should be defined.

For an example we can have a collection of data:

```json
{
    "records": {
        "0": { "first_name": "John", "last_name": "Doe" },
        "1": { "first_name": "Jack", "last_name": "Oed" }
    }
}
```

When application iterates over the collection in can set a placeholder for each record:

```json
{
    "record": "records.0"
}
```

Then we can reference these properties in the META Script as follows:

```metascript
@record.first_name
/* or */
@record.last_name
```

## META Script Reference

Script has a simple structure:

```plain
<operand> [operator <operand>]
````

### Comments

Comments must be written between `/*` and `*/`.

```metascript
1 + /*comment*/ 2
```

### Constants

- Numeric: `1` or `3.141`
- String: `"hello world"` or `'hello world'`
- Boolean: `true`, `TRUE`, `false`, `FALSE`, `null` or `NULL`

### Properties & Attributes

META Script always references META Model properties and optionally its attributes.

Property is written using following notation:

```plain
[#@]<name>[.<sub_name>[$<attribute>.<sub_attribute>]][value_property]
```

- Variable or attribute name can contain only English letters, numbers and underscores
- Variable or attribute name must NOT start with a number
- `#` sign references property path from a model root
- `@` sign references a property placeholder
- `.` references sub property or sub-attribute in a model tree
- `$` sign references a property attribute

Each property or an attribute returns a value. If the value is an object we can access its properties using square bracket notation:

```metascript
my.prop['personal']['first_name']
```

or with an attribute:

```metascript
my.prop$options[0]
```

Some other examples:

```metascript
/* Local property */
firstName

/* Root property */
#customer.firstName

/* Placeholder property */
@record.firstName

/* Access to an attribute */
firstName$valid
firstName$required

/* Access to a value property */
#user.role$items[0]['label']
```

### Operators

- Arithmetic: `+`, `-`, `*`, `/`, `%` (modulo)
- Comparison: `==`, `!=`, `>`, `>=`, `<`, `<=`
- Logic: `&&`, `||`, `!`, `and`, `AND`, `or`, `OR`, `not`, `NOT`
- String: `~` (string concat)

### Functions

Functions are a type of the operand which always return a value and accept arguments.

Function is written as:

```plain
<function_name>(<arguments>)
```

- Function name can contain only English letters, numbers and underscores
- Function name must NOT start with a number
- Function name must be always followed with round brackets
- Function arguments are separated using `,` char

Examples:

```metascript
min(x, 10)
empty(my.prop)
MAX(0, y)
```

**Built-in functions:**

- `min(number, ...)` (min value)
- `max(number, ...)` (max value)
- `abs(number)` (absolute value)
- `sqrt(number)` (square root)
- `pow(number, exp)` (power number by exponent)
- `nan(value)` (returns boolean, if value is NaN)
- `finite(number)` (returns boolean, if value is finite number)
- `substr(string, from, length)` (returns substring)
- `strpos(string, string)` (returns index of first occurance of second string in first string)
- `rstrpos(string, string)` (returns index of last occurance of second string in first string)
- `empty(value)` (returns boolean, if value is empty)
- `defined(property)` (returns boolean, if property or it’s value property is defined)

Other functions must be registered into the compiler individually.

### Conditions

Conditional expressions are written as an IF functions with three arguments:

1. Condition expression
2. If true expression
3. If false expression

Examples:

```metascript
IF(x > 1, 'Yes', 'No')
iF(x > 1, a + 1, a - 1)
If(x > 1 AND x < 10, true, FALSE)
if(x <= 0, -1, x)
```

### More Examples

Following examples represent various META Model use-cases. META Script expressions are written after `=` char. The assignment is only for example usage purpose.

```metascript
/* Condition - field is required only if sameAsInvoice is not true */
@record.delivery.address$required = !@record.delivery.sameAsInvoice
@record.delivery.address$required = NOT @record.delivery.sameAsInvoice
@record.delivery.address$required = if(@record.delivery.sameAsInvoice, false, true)

/* Strings - fullName consists of firstName and lastName properties delimeted by a space string */
fullName = firstName ~ ' ' ~ lastName

/* Or with interpolation parser */
fullName = `#{firstName} #{lastName}`

/* Arithmetics */
totalPrice = (pricePerHour * 24) * days
y = x * 1.5 + a
c = sqrt( pow(a, 2) + pow(b, 2) )

/* Enable if another field is not empty */
prop$readonly = empty(name)

/* Enable if another field is valid */
prop$readonly = not anotherProp$valid

/* Enable if root property 'locked' is not true */
prop$readonly = NOT #$locked

/* Required if age is grater or equal than 21 */
prop$required = #customer.age >= 21
```

## Learn More About the META Web

Visit our [META Web homepage](http://metahub.cloud/)