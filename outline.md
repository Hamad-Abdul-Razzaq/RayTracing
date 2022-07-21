# Ray Tracing in One Weekend
## Chapter 1
- Introduction to the Book.
- Requirements and Setup to run the codes 
## Chapter 2
- Introduction to the PPM image format
- Generate a sample image
## Chapter 3
- vec3 Class for the vectors and points
## Chapter 4
- Basic Terminologies: Coordinate System, Camera, Aspect Ratio, Viewport
- Ray Class for the ray that will be used to raytrace an image
## Chapter 5
- Adding an Object (Sphere)
- Creating first Ray Traced Image
## Chapter 6
- Surface Normals used for shading.
- Creatting abstract class "hittable" for objects.
## Chapter 7
- Antialiasing to avoid sharp edges
## Chapter 8
- Diffused Materials in the scene
- Improving Color Intensity by Gamma correction
- Fixing Shadow Acne
## Chapter 9
- Metal Objects in to the scene
- Making abstract class for materials
- Light interaction with Metal (Reflection)
- Controlliong Fuzziness of Reflections
## Chapter 10
- Dielectric Objects into the scene
- Coding Refraction (via snell's law) and Reflection (due to Total Internal Reflection)
- Making a Sphere Hollow by Negative Radius
## Chapter 11
- Positioning and Orientation of Camera
## Chapter 12
- Defocus Blur using Thin lens approximation
## Chapter 13
- Making a final image with lots of spheres

# WebGL Up and Running
## Chapter 1
### WebGL - A Technical Definition
- A new standard for 3D Graphics on the web
- An API based on Open GL ES 2.0
- Crossplatform; built for dynamic web applications
### 3D Coordinate System
- Right-Handed Coordinate System
### Meshes, Polygons, and Vertices
- 3D Graphics are drawn using mesh
- Mesh: An object with polygonal shape(s) constructed using a set of vertices.
- Most common polygons used: Triangle and Quads
- 3D Meshes are also called Models
### Materials, Textures, and Lights
- Surface Attributes Information can be as complex as possible (color, light reflection, etc.)
- Surface Information also represented using texture maps
- Collectively, Surface properties of a mesh is referred to as materials.
- Materials rely on the presence of light objects.
### Transforms and Matrices
- Transforms - Operations to move the mesh without looping through every vertex.
- This helps in scaling, rotating, translating a mesh without changing the values of its vertices.
- Transforms are represented by a matrix.
### Cameras, Perspective, Viewports, and Projections
- Camera - Position and Orientation of the User
- Perspective - The field of view of the camera
- Viewport - A 2D area where the 3D scene is projected.
- Cameras are represented using 2 Matrices.
- First Matrix defines the position and orientation of the camera.
- Second Matrix deals with the Projection of 3D coordinates onto 2D viewport.
- Near Clipping Plane - Same as Viewport
- Far clipping Plane - The outer boundary uptill which we want objects to be in our scene.
- View Volume - The space b/w near and far clipping planes.
### Shaders
- Shaders - Used to define how the transforms, materials, lights and the camera interact to render the image.
- In other words, the code for shaders gets the pixels for our mesh onto the screen.
- Compiled by GPU
- WebGL requires Shaders
### The WebGL API
- Made graphics straightforward to be implemented on browser.
- Developers have to define their information regarding the scene themselves.
### The Anatomy of a WebGL Application
- WebGL - A Drawing Library
- It is the drawing context of the canvas
- Rendering WebGL into a page:
    - Create canvas element
    - Get its drawing context
    - Initalize Viewport
    - Buffers for the info about the vertices
    - Matrices defining from buffer to page
    - Shaders for implementing drawing algorithm.
    - Initialize Shaders with parameters
    - Draw
### The Canvas and Drawing Context
- WebGL rendering takes place in a context object which provides complete WebGL API.
- canvas.getContext("experimental-webgl")
### The Viewport
- canvas.getcontext("experimental-webgl").viewport(x,y,w,h)
### Buffers, ArrayBuffers, and Typed Arrays
- Buffers contain information regarding vertices.
- The result returned is a JavaScript Object containing vertex buffer data, size of vertex structure, no. of vertices to be drawn, type of primitive (such as square, triabgle, etc.)
### Matrices
- ModelView Matrix - Position with respect to the camera
- Projection Matrix - Used by Shader to transform 3D coordinates into 2D coordinates, i.e., projecting 3D onto 2D
### The Shader
- Composed of two parts: Vertex Shader & Fragment Shader
- Vertex Shader: Transformation/Projection of objects onto 2D (uses ModelView and Projection Matrices)
- Fragment Shader: Generation of final color for each pixel
- Inputs to Fragment Shaders: color, texture, lighting and material values
### Drawing Primitives
- Driver code for drawing a square using the pre-defined functions

