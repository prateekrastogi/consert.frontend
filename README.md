------ Docker ------

docker build -t frontend .

docker run -p 3000:3000 frontend

------ Naming & Code Conventions ------

components: PascalCase 

pages: lowercase

lib: kebab-case

generated/package default/framework files: Follow the generator/package default/framework naming conventions, overriding above conventions if necessary

Using index.js files for components nested inside folder for maintaining clarity. For comprehensive reasoning visit:  https://alligator.io/react/index-js-public-interfaces/
