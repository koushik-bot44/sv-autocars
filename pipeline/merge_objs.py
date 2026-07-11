import glob, os
files = sorted(glob.glob('v6/model_*.obj'), key=lambda p: int(p.split('_')[1].split('.')[0]))
vo = vto = vno = 0
with open('v6_merged.obj', 'w') as out:
    for i, path in enumerate(files):
        out.write(f'o part_{i:03d}\n')
        dv = dvt = dvn = 0
        with open(path) as f:
            for line in f:
                if line.startswith('v '): dv += 1; out.write(line)
                elif line.startswith('vt '): dvt += 1; out.write(line)
                elif line.startswith('vn '): dvn += 1; out.write(line)
                elif line.startswith('f '):
                    parts = line.split()[1:]
                    fixed = []
                    for p in parts:
                        seg = p.split('/')
                        a = str(int(seg[0]) + vo)
                        b = str(int(seg[1]) + vto) if len(seg) > 1 and seg[1] else ''
                        c = str(int(seg[2]) + vno) if len(seg) > 2 and seg[2] else ''
                        if len(seg) == 3: fixed.append(f'{a}/{b}/{c}')
                        elif len(seg) == 2: fixed.append(f'{a}/{b}')
                        else: fixed.append(a)
                    out.write('f ' + ' '.join(fixed) + '\n')
        vo += dv; vto += dvt; vno += dvn
print('merged', len(files), 'parts,', vo, 'vertices')
