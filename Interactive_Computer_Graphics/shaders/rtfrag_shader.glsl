precision mediump float;
uniform vec3 origin;
varying vec4 vPosition;
uniform vec3 center1;
uniform vec3 center2;
uniform vec3 center3;
uniform float r1;
uniform float r2;
uniform float r3;
uniform vec2 rnd;
const float infinity = 1.0 / 0.0;
vec2 co = rnd;

float rand(inout vec2 co) {
    float a = fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
    co = vec2(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453, cos(dot(co, vec2(78.9898, 12.233))) * 45538.4375);
    return a;
}

float rand_range(float min_, float max_) {
    return min_ + (max_ - min_) * rand(co);
}

float clamp_(float x, float min_, float max_) {
    if(x > max_) {
        return max_;
    } else if(x < min_) {
        return min_;
    }
}

        /*---------------------
        VECTOR HELPER FUNCTIONS
        -----------------------*/
float length_squared(vec3 v) {
    return v.x * v.x + v.y + v.y + v.z * v.z;
}
vec3 unit_vector(vec3 vect) {
    float mag = pow(pow(vect.x, 2.0) + pow(vect.y, 2.0) + pow(vect.z, 2.0), 0.5);
    float i = vect.x / mag;
    float j = vect.y / mag;
    float k = vect.z / mag;
    vec3 r = vec3(i, j, k);
    return r;
}

float dot_(vec3 a, vec3 b) {
    float d = a.x * b.x + a.y * b.y + a.z * b.z;
    return d;
}

vec3 scalar_mult(float k, vec3 v) {
    vec3 r = vec3(k * v.x, k * v.y, k * v.z);
    return r;
}

vec3 sub(vec3 v1, vec3 v2) {
    return vec3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
}

vec3 add(vec3 v1, vec3 v2) {
    return vec3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
}

        /*-------------------
        STRUCTURE DEFINITIONS
        ---------------------*/

struct ray {
    vec3 origin;
    vec3 direction;
};

struct hit_record {
    vec3 p;
    vec3 normal;
    float t;
    bool front_face;

};

struct sphere {
    vec3 center;
    float radius;
};

struct hittable_list {
    sphere spheres[50];
};

        /*------------------
        HIT_RECORD HELPER FUNCTIONS
        --------------------*/
void set_face_normal(inout hit_record h, ray r, vec3 outward_normal) {
    h.front_face = dot_(r.direction, outward_normal) < 0.0;
    if(h.front_face) {
        h.normal = outward_normal;
    } else {
        h.normal = -1.0 * outward_normal;
    }
}

        /*------------------
        RAY HELPER FUNCTIONS
        --------------------*/
vec3 at(ray r, float t) {
    return r.origin + t * r.direction;
}

        /*----------------------
        SPHERE STRUCTURE METHODS
        ------------------------*/

bool hit_sphere_(vec3 cn, float rd, ray r, float t_min, float t_max, inout hit_record rec) {
    vec3 oc = r.origin - cn;
            //float a = length_squared(r.direction);
    float a = dot_(r.direction, r.direction);
            //float half_b = dot_(oc, r.direction);
    float b = 2.0 * dot_(oc, r.direction);
    float c = dot_(oc, oc) - (rd * rd);
            //float c = length_squared(oc) - rd * rd;
            //float disc = half_b * half_b - a * c;
    float disc = (b * b) - (4.0 * a * c);
    if(disc < 0.0) {
        return false;
    } else {
        float sqrt_disc = sqrt(disc);
        float root = (-b - sqrt_disc) / (2.0 * a);
        if(root < t_min || t_max < root) {
            root = (-b + sqrt_disc) / (2.0 * a);
            if(root < t_min || t_max < root) {
                return false;
            }
        }
        rec.t = root;
        rec.p = at(r, rec.t);
        vec3 outward_normal = (rec.p - cn) / rd;
        set_face_normal(rec, r, outward_normal);
        return true;

    }

}

float hit_sphere(vec3 center, float radius, ray r) {
    vec3 oc = sub(r.origin, center);
    float a = dot_(r.direction, r.direction);
    float b = 2.0 * dot_(oc, r.direction);
    float c = dot_(oc, oc) - (radius * radius);
    float disc = (b * b) - (4.0 * a * c);
    if(disc < 0.0) {
        return -1.0;
    } else {
        return (-b - sqrt(disc)) / (2.0 * a);
    }
}

vec4 add_color(vec4 a, vec4 b) {
    return vec4(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w);
}

bool hit(ray r, float t_min, float t_max, inout hit_record rec) {
    hit_record temp_rec;
    bool hit_anything = false;
    float closest_so_far = t_max;
    if(hit_sphere_(center2, r2, r, t_min, t_max, temp_rec)) {
        hit_anything = true;
        closest_so_far = temp_rec.t;
        rec = temp_rec;
    }
    if(hit_sphere_(center1, r1, r, t_min, t_max, temp_rec)) {
        hit_anything = true;
        closest_so_far = temp_rec.t;
        rec = temp_rec;
    }
    if(hit_sphere_(center3, r3, r, t_min, t_max, temp_rec)) {
        hit_anything = true;
        closest_so_far = temp_rec.t;
        rec = temp_rec;
    }
    return hit_anything;
}

vec4 ray_color(ray r) {
    vec3 center = center1;
    float rd = r1;
    vec3 p = r.direction;
    float t = hit_sphere(center, rd, r);
    if(t > 0.0) {
        vec3 N = unit_vector(at(r, t) - center);
                //return vec4(0.0, 1.0, 0.0, 1.0);
        return vec4(0.5 * (N.x + 1.0), 0.5 * (N.y + 1.0), 0.5 * (N.z + 1.0), 1.0);
    } else {
        vec3 unit_dirc = unit_vector(r.direction);
        t = 0.5 * (unit_dirc.y + 1.0);
        float c = 1.0 - t;
        vec4 color_1 = vec4(1.0 * c, 1.0 * c, 1.0 * c, 1.0);
                // //vec4 color_2 = vec4(1.0 * t, 53.0/255.0 * t, 184.0/255.0 * t, 1.0);
        vec4 color_2 = vec4(0.5 * t, 0.7 * t, 1.0 * t, 1.0);
        return add_color(color_1, color_2);
    }

            //return vec4(0.0, 0.0, 1.0, 1.0);

}

vec4 ray_color2(ray r) {
    hit_record rec;
    if(hit(r, 0.0, infinity, rec)) {
        return (vec4((rec.normal.x + 1.0) * 0.5, (rec.normal.y + 1.0) * 0.5, (rec.normal.z + 1.0) * 0.5, 1.0));
                //return vec4(1.0, 0.0, 0.0, 1.0);
    }
            //return vec4(0.0, 0.0, 1.0, 1.0);
    vec3 unit_dirc = unit_vector(r.direction);
    float t = 0.5 * (unit_dirc.y + 1.0);
    float c = 1.0 - t;
    vec4 color_1 = vec4(1.0 * c, 1.0 * c, 1.0 * c, 1.0);
            //vec4 color_2 = vec4(1.0 * t, 53.0/255.0 * t, 184.0/255.0 * t, 1.0);
    vec4 color_2 = vec4(0.5 * t, 0.7 * t, 1.0 * t, 1.0);
    return add_color(color_1, color_2);

}

void main() {
    ray r;
    r.origin = origin;
    vec4 avg_clr = vec4(0.0, 0.0, 0.0, 1.0);
    for(float i = 0.0; i < 100.0; i++) {
        float x_ = vPosition.x + (rand(co) / 600.0);
        float y_ = vPosition.y + (rand(co) / 600.0);
        r.direction = vec3(x_, y_, vPosition.z);
        avg_clr += ray_color2(r);
    }
            //r.direction = vec3(vPosition.x, vPosition.y, vPosition.z);
    gl_FragColor = vec4(avg_clr.x / 100.0, avg_clr.y / 100.0, avg_clr.z / 100.0, 1.0);
            //gl_FragColor = ray_color2(r);
}