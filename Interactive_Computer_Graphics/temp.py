file = open("Interactive_Computer_Graphics/icosahedron.off", "r")
file2 =  open("Interactive_Computer_Graphics/a.txt", "w")
c = 0
verts = []
faces = [] 
for i in file:
    if c > 1:
        print(i)
        a = i.strip().split()
        if (len(a)) == 3:
            a = [float(z) for z in a]
            verts.append(a)
        elif len(a) == 4:
            # print("len", len(verts))
            a = [int(z) for z in a]
            # print(a[1], a[2], a[3])
            b = [verts[a[1]], verts[a[2]], verts[a[3]]]
            faces.append(b)
    c+= 1

for i in faces:
    for j in i:
        file2.write(f"{j[0]}, {j[1]}, {j[2]}, \n")
file2.close()
    