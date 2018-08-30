------ Docker ------

docker build -t frontend .

docker run -p 3000:3000 frontend

------ Naming & Code Conventions ------

components/code-components: PascalCase 

pages: lowercase

lib: kebab-case

generated/package default/framework files: Follow the generator/package default/framework naming conventions, overriding above conventions if necessary

code: camelCase

Use index.js files for folder organized & composition stitched components/libraries to maintain clarity. For comprehensive reasoning visit:  https://alligator.io/react/index-js-public-interfaces/
