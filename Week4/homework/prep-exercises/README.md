# Prep exercise week 4

- What made you decide when to embed information? What assumptions did you make?
  - Embed if subdocument is relatively small
  - Embed if subdocument will grow insignificantly
  - Embed if data not shared across documents
  - Embed if you prefer faster reads to faster writes
  - Embed if data is not discrete
- If you were given MySQL and MongoDB as choices to build the recipe's database at the beginning, which one would you choose and why?
    > MongDB. Since recipe steps are better to embed. Because you can't predefine recipe steps and every user is going to write them differently (data is not discrete). And they are not going to be shared across documents and are relatively small.
