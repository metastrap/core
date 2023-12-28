# Dev Notes

All typescript declarations are Pascal-cased with Type, Interface and Enum beginning with `T`, `I` and `E` respectively.

All the modifiers follow the `src/modifiers/<framework>/<feature>` structure. As an example if we are adding `withTailwindcss` to `INextOptions`, it would require `src/modifiers/next/withTailwindcss` to be created on top of a base project structure.

During deployment, the expectation is to serve the `.zip` of the base templates of all the frameworks individually. It can be unzipped in client side and modified as required. Finally, the modified changes are zipped again before prompting for save.
