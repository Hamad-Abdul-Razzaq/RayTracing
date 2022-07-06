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
### 3D Coordinate System
### Meshes, Polygons, and Vertices
### Materials, Textures, and Lights
### Transforms and Matrices
### Cameras, Perspective, Viewports, and Projections
### Shaders
### The WebGL API
### The Anatomy of a WebGL Application
### The Canvas and Drawing Context
### The Viewport
### Buffers, ArrayBuffers, and Typed Arrays
### Matrices
- ModelView Matrix - Position with respect to the camera
- Projection Matrix - Used by Shader to transform 3D coordinates into 2D coordinates, i.e., projecting 3D onto 2D
### The Shader
- Composed of two parts: Vertex Shader & Fragment Shader
- Vertex Shader: Transformation/Projection of objects onto 2D
- Fragment Shader: Generation of final color o\for each pixel
- Inputs to Fragment Shaders: color, texture, lighting and material values
### Drawing Primitives
- Drawing a Square

