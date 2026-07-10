import json, struct, sys
path = sys.argv[1]
with open(path, 'rb') as f:
    magic, version, length = struct.unpack('<III', f.read(12))
    chunk_len, chunk_type = struct.unpack('<II', f.read(8))
    gltf = json.loads(f.read(chunk_len))
nodes = gltf.get('nodes', []); meshes = gltf.get('meshes', []); accessors = gltf.get('accessors', [])
mats = gltf.get('materials', []); imgs = gltf.get('images', [])
total = 0
for m in meshes:
    for p in m.get('primitives', []):
        idx = p.get('indices')
        if idx is not None: total += accessors[idx]['count'] // 3
print(f"nodes={len(nodes)} meshes={len(meshes)} materials={len(mats)} images={len(imgs)} totalTris={total}")
print("material names:", [m.get('name') for m in mats])
# largest meshes
sizes = []
for m in meshes:
    t = sum(accessors[p['indices']]['count']//3 for p in m.get('primitives',[]) if 'indices' in p)
    sizes.append((t, m.get('name','')))
sizes.sort(reverse=True)
print("top 15 meshes by tris:", sizes[:15])
# scene bbox
mn = [1e9]*3; mx = [-1e9]*3
for m in meshes:
    for p in m.get('primitives', []):
        pos = p.get('attributes', {}).get('POSITION')
        if pos is not None and 'min' in accessors[pos]:
            for i in range(3):
                mn[i] = min(mn[i], accessors[pos]['min'][i]); mx[i] = max(mx[i], accessors[pos]['max'][i])
print("approx bbox min", [round(v,2) for v in mn], "max", [round(v,2) for v in mx])
