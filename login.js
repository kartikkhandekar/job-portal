const bcryptjs=require('bcryptjs')
const hashPassword='$2a$10$G/lxdnZtKTDWiAo2U35Da.2S2sqQcGGHGxX5VVwn4xdd0nH1xxqG6'
const password='secret123'
const salt=bcryptjs.getSalt(hashPassword)
console.log(salt)
bcryptjs.hash(password,salt)
.then((ha)=>{
    console.log(ha==hashPassword)
})
