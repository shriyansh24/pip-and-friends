import json,sys
d=json.load(open('/home/claude/comic-site/data/cpp-ch10.json'))
names=sys.argv[1:] or list(d['programs'])
for n in names:
    p=d['programs'][n]
    if p.get('sourceOnly'): continue
    print('#####',n,'exit',p['exit'])
    for s in p.get('steps',[]):
        print('$',s['cmd'], '   [dir',s.get('dir'),'exit',s['exit'],']')
        if 'merged' in s: print(s['merged'],end='')
        else:
            print(s['out'],end=''); 
            if s['err']: print('ERR>'+s['err'],end='')
