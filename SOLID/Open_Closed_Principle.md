#### Objects or entities should be open for extension, but closed for modification.

Move common logic to a superclass and let subclasses override it so that you don't end up modifying the logic in a single class that would contain tons of conditional statements and would need to be altered as more "types" are added.
