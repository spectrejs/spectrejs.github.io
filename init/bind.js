//data binding via proxy
app.bind = new Proxy({}, {
set(target, key, val) {
if (typeof val == "object") {
target[key] = subproxy(key, val)
//proxify preset array|object values
if (target[key] instanceof Array) target[key].forEach((v, i) => target[key][i] = v)
else Object.keys(target[key]).forEach(e => target[key][e] = target[key][e])
return true
} else {
target[key] = val
_app.match(key, val)
return true
}
}
})
//sub proxy for indented object|arrays
const subproxy = (key, val) => {
let x = new Proxy(val, {
set(nt, nk, nv) {
if (typeof nv == "object") {
nt[nk] = subproxy(key, nv)
return true
} else {
nt[nk] = nv
_app.match(key, app.bind[key])
return true
}
}
})

return x
}