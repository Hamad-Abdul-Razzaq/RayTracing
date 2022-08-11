precision mediump float; 
        varying vec4 vPos;
        uniform float n_0;
        struct complex {
            float real;
            float imag;
        };

        float real(complex c1){
            return c1.real;
        }

        float imag(complex c1){
            return c1.imag;
        }

        float mag(complex c1){
            return pow((pow(c1.real, 2.0)) + (pow(c1.imag, 2.0)),(0.5));
        }

        complex add(complex c1, complex c2){
            return complex(c1.real + c2.real, c1.imag + c2.imag);
        }

        complex square(complex c1){
            return complex(pow(c1.real, 2.0) - pow(c1.imag,2.0), 2.0*c1.real*c1.imag);
        }


        void main() {
            float mx = vPos.x*2.0;
            float my = vPos.y*2.0;
            complex c;
            c.real = mx;
            c.imag = my;
            complex n0;
            n0.real = 0.0;
            n0.imag = 0.0;
            float count = 1.0;
            const float max_iter = 100.0;
            for (float i = 1.0; i <= max_iter; i++){
                if (i > n_0){
                    break;
                }
                complex tmp = add(square(n0), c);
                n0 = tmp;
                float abs_ = mag(n0);
                if (abs_ > 2.0){
                    break;
                }
                else{
                    count = count + 1.0;
                }
            }
            if (count < 5.0){
                gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
            }
            else if (count >= n_0){
                gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
            }
            else if (count >= n_0 - (n_0 * 0.8)){
                gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
            }
            else{
                gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
            }


        } 