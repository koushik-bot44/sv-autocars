import json, struct, sys
from collections import defaultdict
path = sys.argv[1]
with open(path, 'rb') as f:
    f.read(12); chunk_len, _ = struct.unpack('<II', f.read(8))
    gltf = json.loads(f.read(chunk_len))
mats = gltf.get('materials', []); meshes = gltf.get('meshes', []); nodes = gltf.get('nodes', [])
bymat = defaultdict(list)
for n in nodes:
    if 'mesh' in n:
        m = meshes[n['mesh']]
        for p in m.get('primitives', []):
            mi = p.get('material')
            name = mats[mi].get('name','?') if mi is not None else 'NONE'
            bymat[name].append(n.get('name',''))
for mat, nlist in sorted(bymat.items()):
    print(f"{mat} ({len(nlist)} nodes): {nlist[:12]}{'...' if len(nlist)>12 else ''}")
